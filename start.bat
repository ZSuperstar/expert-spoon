@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║     🤖 分拣机器人智能评价系统 - 启动服务               ║
echo ║                                                       ║
echo ╠═══════════════════════════════════════════════════════╣
echo ║  服务将在所有网络接口上运行，其他设备可访问            ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM 获取本机 IP
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set "IP=%%a"
    goto :found
)
:found

echo 正在启动服务器...
echo.
echo 访问地址:
echo   本机：http://127.0.0.1:3000
echo   局域网：http://%IP%:3000
echo.
echo 按 Ctrl+C 停止服务
echo.

start http://127.0.0.1:3000
npx http-server -p 3000 -a 0.0.0.0 -c-1

pause
