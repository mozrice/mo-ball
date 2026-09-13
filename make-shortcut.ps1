# Creates a "Hoop Shot" shortcut on the Desktop that launches the game.
# You only need to run this once. After that, use the desktop icon to play.

$here    = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktop = [Environment]::GetFolderPath('Desktop')
$target  = Join-Path $here 'start-game.cmd'
$icon    = Join-Path $here 'icon.ico'

$ws  = New-Object -ComObject WScript.Shell
$lnk = $ws.CreateShortcut((Join-Path $desktop 'Hoop Shot.lnk'))
$lnk.TargetPath       = $target
$lnk.WorkingDirectory = $here
if (Test-Path $icon) { $lnk.IconLocation = $icon }
$lnk.Description      = 'Play Hoop Shot'
$lnk.WindowStyle      = 7   # start the black server window minimized
$lnk.Save()

Write-Host ''
Write-Host '  Done! A "Hoop Shot" icon is now on your desktop.' -ForegroundColor Green
Write-Host '  Double-click it any time to play.' -ForegroundColor Green
Write-Host ''
