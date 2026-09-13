@echo off
REM ===================================================
REM  Double-click this file to play / work on Hoop Shot.
REM  It starts a little web server and opens the game.
REM  A black window will appear - that is the server.
REM  Close that window when you are finished.
REM ===================================================

cd /d "%~dp0"

start "Hoop Shot server" powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"

REM Give the server a second to wake up before opening the browser.
timeout /t 2 /nobreak >nul

start "" "http://localhost:8123/"
