@echo off
setlocal
cd /d "%~dp0"
title MO ARCADE - Publish games to the web

(
  echo FOLDER: %CD%
  echo --- git version ---
  git --version
  echo --- add all ---
  git add -A
  echo --- what changed ---
  git status --short
  echo --- save ^(commit^) ---
  git commit -m "Update MO Arcade games"
  echo --- send ^(push^) ---
  git push origin main
  echo --- finished ---
) > publish-log.txt 2>&1

type publish-log.txt

echo(
echo   ==================================================
echo     A log was saved as  publish-log.txt
echo     Show Claude - it will read it and fix things.
echo   ==================================================
echo(
echo   Press any key to close.
pause >nul
