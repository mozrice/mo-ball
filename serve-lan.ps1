# Hoop Shot - Wi-Fi server for playing on the iPad (or any phone/tablet).
# Serves this folder to your whole home network so another device can open it.
# Uses a raw TcpListener so it needs NO admin rights and NO Python.
#
# You do not run this by hand - double-click start-on-ipad.cmd instead.

param([int]$Port = 8123)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootFull = [System.IO.Path]::GetFullPath($Root)

$types = @{
  ".html"        = "text/html; charset=utf-8"
  ".js"          = "text/javascript; charset=utf-8"
  ".css"         = "text/css; charset=utf-8"
  ".svg"         = "image/svg+xml"
  ".png"         = "image/png"
  ".jpg"         = "image/jpeg"
  ".jpeg"        = "image/jpeg"
  ".gif"         = "image/gif"
  ".webmanifest" = "application/manifest+json"
  ".json"        = "application/json"
  ".ico"         = "image/x-icon"
}

# Find this computer's addresses on the Wi-Fi, to show the user.
$ips = @()
try {
  $ips = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction Stop |
         Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } |
         Select-Object -ExpandProperty IPAddress
} catch {
  $ips = (ipconfig | Select-String "IPv4") -replace '.*:\s*', ''
}

try {
  $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
  $listener.Start()
} catch {
  Write-Host ""
  Write-Host "  Could not start the server on port $Port." -ForegroundColor Yellow
  Write-Host "  It may already be running in another window - if so, just use that one."
  Write-Host ""
  Write-Host "  Press Enter to close."
  [void][System.Console]::ReadLine()
  exit 1
}

Write-Host ""
Write-Host "  ============================================" -ForegroundColor Cyan
Write-Host "   HOOP SHOT is now playable on your iPad!" -ForegroundColor Cyan
Write-Host "  ============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  On the iPad (same Wi-Fi), open Safari and type ONE of these:" -ForegroundColor Green
foreach ($ip in $ips) { Write-Host ("        http://{0}:{1}/" -f $ip, $Port) -ForegroundColor White }
Write-Host ""
Write-Host "  Then tap Share -> 'Add to Home Screen' to make it an app icon."
Write-Host "  Keep this window open while playing. Close it when you are done." -ForegroundColor Yellow
Write-Host ""

while ($true) {
  try {
    $client = $listener.AcceptTcpClient()
    $client.ReceiveTimeout = 4000
    $client.SendTimeout = 15000
    $stream = $client.GetStream()

    # Read the request (we only need the first line: "GET /path HTTP/1.1")
    $buf = New-Object byte[] 8192
    $read = $stream.Read($buf, 0, $buf.Length)
    if ($read -le 0) { $client.Close(); continue }
    $req = [System.Text.Encoding]::ASCII.GetString($buf, 0, $read)
    $line1 = ($req -split "`r`n")[0]
    $parts = $line1 -split ' '

    if ($parts.Length -lt 2 -or $parts[0] -ne "GET") {
      $body = [System.Text.Encoding]::UTF8.GetBytes("Only GET is supported")
      $head = "HTTP/1.1 405 Method Not Allowed`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      $hb = [System.Text.Encoding]::ASCII.GetBytes($head)
      $stream.Write($hb, 0, $hb.Length); $stream.Write($body, 0, $body.Length)
      $client.Close(); continue
    }

    $rel = $parts[1]
    $rel = ($rel -split '\?')[0]                 # drop any ?query
    $rel = [System.Uri]::UnescapeDataString($rel).TrimStart('/')
    if ($rel -eq "") { $rel = "index.html" }

    $path = [System.IO.Path]::GetFullPath((Join-Path $Root $rel))

    if (-not $path.StartsWith($RootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
      $head = "HTTP/1.1 403 Forbidden`r`nContent-Length: 0`r`nConnection: close`r`n`r`n"
      $hb = [System.Text.Encoding]::ASCII.GetBytes($head)
      $stream.Write($hb, 0, $hb.Length); $client.Close(); continue
    }

    if (Test-Path -LiteralPath $path -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ct = $types[$ext]; if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $head = "HTTP/1.1 200 OK`r`nContent-Type: $ct`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
      $hb = [System.Text.Encoding]::ASCII.GetBytes($head)
      $stream.Write($hb, 0, $hb.Length)
      $stream.Write($bytes, 0, $bytes.Length)
      Write-Host ("  served {0}" -f $rel) -ForegroundColor DarkGray
    } else {
      $body = [System.Text.Encoding]::UTF8.GetBytes("404 not found: $rel")
      $head = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      $hb = [System.Text.Encoding]::ASCII.GetBytes($head)
      $stream.Write($hb, 0, $hb.Length); $stream.Write($body, 0, $body.Length)
      Write-Host ("  404     {0}" -f $rel) -ForegroundColor DarkGray
    }

    $stream.Flush()
    $client.Close()
  } catch {
    try { $client.Close() } catch {}
  }
}
