@echo off
echo ======================================
echo FIXING RESUME BUILDER DEPLOYMENT
echo ======================================

cd /d "C:\Users\lenov\Desktop\resume-builder"

echo 1. Creating clean package.json...
(
echo {
echo   "name": "resume-builder",
echo   "version": "0.1.0",
echo   "private": true,
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "react-scripts": "5.0.1",
echo     "lucide-react": "^0.263.1",
echo     "react-icons": "^4.10.1",
echo     "html2canvas": "^1.4.1",
echo     "jspdf": "^2.5.1"
echo   },
echo   "scripts": {
echo     "start": "react-scripts start",
echo     "build": "react-scripts build",
echo     "test": "react-scripts test",
echo     "eject": "react-scripts eject",
echo     "predeploy": "npm run build",
echo     "deploy": "gh-pages -d build"
echo   },
echo   "devDependencies": {},
echo   "browserslist": {
echo     "production": [">0.2%", "not dead", "not op_mini all"],
echo     "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
echo   }
echo }
) > package.json

echo 2. Installing gh-pages...
call npm install gh-pages --save-dev

echo 3. Building project...
call npm run build

echo.
echo ======================================
echo SUCCESS! Your project is ready.
echo ======================================
echo.
echo To deploy to GitHub Pages:
echo   npm run deploy
echo.
echo OR deploy to Netlify (easier):
echo   1. Go to https://app.netlify.com/drop
echo   2. Drag and drop the "build" folder
echo.
pause