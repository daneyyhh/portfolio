@echo off
cd /d "%~dp0"
echo Adding changes to git...
git add .
echo Committing changes...
git commit -m "Update DualSense Pro link and add project"
echo Pushing to GitHub...
git push origin main
echo Done! Sometime deployment takes a few minutes on Vercel.
pause
