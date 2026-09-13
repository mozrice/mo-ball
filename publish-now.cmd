@echo off
setlocal
cd /d "%~dp0"
title MO - Publish to GitHub mo-ball

(
  echo FOLDER: %CD%
  echo --- point to the correct repo ---
  git remote set-url origin https://github.com/mozrice/mo-ball.git
  git remote -v
  echo --- drop the embedded mini-repo so it does not block the push ---
  git rm --cached kid-code/first-project
  echo --- save any changes ---
  git add -A
  git commit -m "Update MO games"
  echo --- get the online history ---
  git fetch origin
  echo --- combine them, keep my newest ---
  git merge origin/main --allow-unrelated-histories --no-edit -X ours
  echo --- publish everything ---
  git push -u origin main
  echo --- finished ---
) > publish-log.txt 2>&1

type publish-log.txt

echo.
echo   Log saved as publish-log.txt - show Claude if anything says error or rejected.
echo.
echo   Press any key to close.
pause >nul
