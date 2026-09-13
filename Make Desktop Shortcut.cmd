@echo off
REM ===================================================
REM  Double-click this ONCE to put a "Hoop Shot" icon
REM  on your desktop. After that you can delete this
REM  file if you like - the desktop icon stays.
REM ===================================================
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0make-shortcut.ps1"
echo.
echo Look for "Hoop Shot" on your desktop.
echo Press any key to close this window.
pause >nul
