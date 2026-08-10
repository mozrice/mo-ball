@echo off
setlocal
cd /d "%~dp0"
title Hoop Shot - play on the iPad

echo(
echo   ==================================================
echo     HOOP SHOT  -  put it on the iPad
echo   ==================================================
echo(
echo   Starting the Wi-Fi server...
echo(
echo   * The iPad must be on the SAME Wi-Fi as this computer.
echo   * If Windows shows a firewall box, click "Allow access".
echo   * In a moment, one or more web addresses will appear below.
echo     Type ONE of them into Safari on the iPad, then tap
echo     Share -^> "Add to Home Screen".
echo(

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve-lan.ps1"

echo(
echo   The server has stopped. You can close this window.
pause >nul
