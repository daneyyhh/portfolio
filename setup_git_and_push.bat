@echo off
echo Setting up Git credentials...
git config --global user.name "Reuben"
git config --global user.email "ftreuben1520@gmail.com"

echo Initializing repository...
git init
git add .
git commit -m "Initial portfolio commit"

echo Configuring remote...
git branch -M main
git remote remove origin
git remote add origin https://github.com/daneyyhh/portfolio.git

echo Pushing to GitHub...
echo You may be asked to sign in to GitHub in a browser window.
git push -u origin main

echo Done!
pause
