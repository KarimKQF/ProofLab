@echo off
rem Lance ProofLab en local et ouvre le navigateur.
rem Utilise le Node portable de .tools\node s'il existe, sinon le Node du système.
setlocal
cd /d "%~dp0"
if exist "%~dp0.tools\node\node.exe" set "PATH=%~dp0.tools\node;%PATH%"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js est introuvable. Installez Node 20 ou plus recent, ou placez une copie portable dans .tools\node.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installation des dependances, une seule fois...
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

echo ProofLab demarre sur http://127.0.0.1:5173 . Fermez cette fenetre pour l'arreter.
call npm run dev -- --host 127.0.0.1 --port 5173 --open
