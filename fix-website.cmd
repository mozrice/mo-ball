@echo off
setlocal
cd /d "%~dp0"
title MO ARCADE - Fix the website build

(
  echo FOLDER: %CD%
  echo --- make a .nojekyll file so GitHub just shows the files ---
  copy /y nul .nojekyll >nul
  echo made .nojekyll
  echo --- stop tracking the backup copy that breaks the build ---
  echo this keeps the folder on your computer - it just wont be published
  git rm -r --cached --ignore-unmatch kid-code
  echo --- add everything else ---
  git add -A
  echo --- what changed ---
  git status --short
  echo --- save ---
  git commit -m "Fix website: add .nojekyll, stop publishing kid-code backup"
  echo --- send to main ---
  git push origin main
  echo --- also update master just in case ---
  git push origin main:master
  echo --- finished ---
) > publish-log.txt 2>&1

type publish-log.txt

echo.
echo   ==================================================
echo     Done! A log was saved as  publish-log.txt
echo     Wait about 1 minute, then refresh your website.
echo     If it still looks wrong, show Claude the log.
echo   ==================================================
echo.
echo   Press any key to close.
pause >nul
