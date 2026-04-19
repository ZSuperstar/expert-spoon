@echo off
chcp 65001 >nul
echo ====================================
echo   分拣机器人智能评价系统 - 启动服务
echo ====================================
echo.
echo 正在启动 Web 服务器...
echo 访问地址：http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务
echo ====================================
echo.
cd /d "%~dp0"
npx http-server -p 8080 -c-1 --open
pause
