@echo off
cd /d "%~dp0"
echo ==================================================
echo    Pushing Hoop Shot to the web (GitHub Pages)...
echo ==================================================
echo.
git add -A
git commit -m "Update Hoop Shot game"
git push
echo.
echo ==================================================
echo    Done!
echo    The web version updates in about a minute at:
echo    https://mozrice.github.io/mo-ball/
echo ==================================================
echo.
pause
