@echo off
setlocal
cd /d "%~dp0"
title MO ARCADE - Publish ALL games to GitHub

(
  echo FOLDER: %CD%
  echo --- add every game and file ---
  git add -A
  echo --- what is new or changed ---
  git status --short
  echo --- save it ---
  git commit -m "Publish MO 500, previews and latest game updates"
  echo --- send everything to GitHub ---
  git push origin main
  echo --- finished ---
) > publish-log.txt 2>&1

type publish-log.txt

echo.
echo   ==================================================
echo     Done! Everything new was sent to GitHub.
echo     Wait about 1 minute, then check your website.
echo     If anything says error, show Claude publish-log.txt
echo   ==================================================
echo.
echo   Press any key to close.
pause >nul
