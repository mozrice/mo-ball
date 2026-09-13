# Tiny web server for Hoop Shot.
# You do not need to run this by hand - double-click start-game.cmd instead.
# It serves the files in this folder at http://localhost:8123/ so that the
# service worker (the offline / install-on-your-phone part) works. The game
# itself also runs fine by just opening index.html, but not the offline part.

param(
  [int]$Port = 8123
)

# Serve whatever folder this script is sitting in.
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
  $listener.Start()
} catch {
  Write-Host ""
  Write-Host "Could not start on port $Port." -ForegroundColor Yellow
  Write-Host "The server is probably already running in another window - that is fine," -ForegroundColor Yellow
  Write-Host "just use the browser tab that is already open." -ForegroundColor Yellow
  Write-Host ""
  Write-Host "Press Enter to close."
  [void][System.Console]::ReadLine()
  exit 1
}

Write-Host ""
Write-Host "  Hoop Shot is being served from:" -ForegroundColor Cyan
Write-Host "  $Root"
Write-Host ""
Write-Host "  Open http://localhost:$Port/ in your browser." -ForegroundColor Green
Write-Host ""
Write-Host "  Edit index.html, save, then refresh the browser to see your changes."
Write-Host "  CLOSE THIS WINDOW when you are done playing." -ForegroundColor Yellow
Write-Host ""

$types = @{
  ".html"        = "text/html; charset=utf-8"
  ".js"          = "text/javascript; charset=utf-8"
  ".css"         = "text/css; charset=utf-8"
  ".svg"         = "image/svg+xml"
  ".png"         = "image/png"
  ".jpg"         = "image/jpeg"
  ".jpeg"        = "image/jpeg"
  ".gif"         = "image/gif"
  ".mp3"         = "audio/mpeg"
  ".wav"         = "audio/wav"
  ".ogg"         = "audio/ogg"
  ".webmanifest" = "application/manifest+json"
  ".json"        = "application/json"
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq "") { $rel = "index.html" }

    $path = Join-Path $Root $rel

    # Do not let a request escape this folder.
    $full = [System.IO.Path]::GetFullPath($path)
    $rootFull = [System.IO.Path]::GetFullPath($Root)
    if (-not $full.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
      $ctx.Response.StatusCode = 403
      $ctx.Response.OutputStream.Close()
      continue
    }

    if (Test-Path -LiteralPath $full -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($full).ToLower()
      $ct = $types[$ext]
      if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($full)
      $ctx.Response.ContentType = $ct
      # no-store so your edits always show up on refresh
      $ctx.Response.Headers.Add("Cache-Control", "no-store")
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Host "  served $rel"
    } else {
      $ctx.Response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 not found: $rel")
      $ctx.Response.ContentLength64 = $msg.Length
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
      Write-Host "  404     $rel" -ForegroundColor DarkGray
    }
    $ctx.Response.OutputStream.Close()
  } catch {
    Write-Host "  error: $_" -ForegroundColor Red
  }
}
