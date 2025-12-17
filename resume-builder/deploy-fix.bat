@echo off
echo Fixing deployment issues...

cd /d "C:\Users\lenov\Desktop\resume-builder"

echo Creating netlify.toml...
(
echo [build]
echo   publish = "build"
echo   command = "npm run build"
echo.
echo [[redirects]]
echo   from = "/*"
echo   to = "/index.html"
echo   status = 200
) > netlify.toml

echo Creating _redirects file...
echo /* /index.html 200 > public/_redirects

echo Updating package.json...
(
echo {
echo   "name": "resume-builder",
echo   "version": "1.0.0",
echo   "private": true,
echo   "engines": {
echo     "node": ">=16.0.0"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "react-scripts": "5.0.1",
echo     "web-vitals": "^2.1.4",
echo     "lucide-react": "^0.263.1",
echo     "react-icons": "^4.10.1",
echo     "html2canvas": "^1.4.1",
echo     "jspdf": "^2.5.1"
echo   },
echo   "scripts": {
echo     "start": "react-scripts start",
echo     "build": "react-scripts build",
echo     "test": "react-scripts test",
echo     "eject": "react-scripts eject"
echo   },
echo   "devDependencies": {
echo     "tailwindcss": "^3.3.0",
echo     "autoprefixer": "^10.4.14",
echo     "postcss": "^8.4.21"
echo   }
echo }
) > package.json

echo Building project...
npm run build

echo.
echo ============================================
echo BUILD COMPLETE!
echo.
echo Your build folder is ready at: build/
echo.
echo TO DEPLOY:
echo 1. Go to https://app.netlify.com/drop
echo 2. Drag and drop the ENTIRE "build" folder
echo 3. OR zip the build folder and upload the zip
echo ============================================
pause