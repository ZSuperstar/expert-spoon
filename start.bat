@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║   🤖 分拣机器人智能评价系统                                ║
echo ║                                                           ║
echo ╠═══════════════════════════════════════════════════════════╣
echo ║                                                           ║
echo ║   正在启动服务...                                         ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM 检查 Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js 环境
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js 环境正常
echo.
echo 正在安装依赖...
call npm install --silent

echo.
echo ═══════════════════════════════════════════════════════════
echo   服务启动成功！
echo   访问地址：http://localhost:3000
echo   按 Ctrl+C 停止服务
echo ═══════════════════════════════════════════════════════════
echo.

node server.js

pause
