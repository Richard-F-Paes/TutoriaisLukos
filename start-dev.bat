@echo off
echo Iniciando Backend e Frontend...
start "Backend" cmd /k "cd backend && npm run dev"
start "Frontend" cmd /k "cd frontend && npm run dev"
echo Ambos os servidores foram iniciados em janelas separadas.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
pause
