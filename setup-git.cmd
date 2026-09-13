@echo off
setlocal
cd /d "%~dp0"
title MO ARCADE - First-time GIT setup

REM ==== CHECK THIS LINE! It must be YOUR GitHub website repo address ====
set REPO=https://github.com/mozrice/mozrice.github.io.git

(
  echo FOLDER: %CD%
  echo REPO:   %REPO%
  echo --- git version ---
  git --version
  echo --- start a repo here ---
  git init -b main
  echo --- who is saving ---
  git config user.name "Coach Mo"
  git config user.email "solpowa@gmail.com"
  echo --- connect to your GitHub website ---
  git remote remove origin 2>nul
  git remote add origin %REPO%
  echo --- save your local games first ---
  git add -A
  git commit -m "MO games from my computer"
  echo --- bring down what is already on the website ---
  git fetch origin
  echo --- combine them - keep website games, newest wins ---
  git merge origin/main --allow-unrelated-histories --no-edit -X ours
  echo --- publish everything ---
  git push -u origin main
  echo --- finished ---
) > publish-log.txt 2>&1

type publish-log.txt

echo.
echo   ==================================================
echo     A log was saved as  publish-log.txt
echo     If anything says error or rejected,
echo     show Claude the log and it will fix it.
echo   ==================================================
echo.
echo   Press any key to close.
pause >nul
