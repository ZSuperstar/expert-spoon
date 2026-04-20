@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║     🤖 分拣机器人智能评价系统 - 关闭服务               ║
echo ║                                                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 正在停止服务器...
echo.

REM 查找并终止占用 3000 端口的进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo 终止进程 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ✓ 服务已停止
echo.

pause
