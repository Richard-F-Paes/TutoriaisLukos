@echo off
echo Iniciando Backend e Frontend em modo de produção...
start "Backend" cmd /k "cd backend && npm run start"
start "Frontend" cmd /k "cd frontend && npm run start"
echo Ambos os servidores foram iniciados em janelas separadas.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
pause
