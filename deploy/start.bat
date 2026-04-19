@echo off
chcp 65001 >nul
echo ========================================
echo   分拣机器人智能评价系统 - 启动脚本
echo ========================================
echo.

cd /d "%~dp0"

echo 检查 Python 环境...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python 环境，请先安装 Python
    pause
    exit /b 1
)

echo [成功] Python 环境正常
echo.
echo 正在启动 Web 服务器...
echo 访问地址：http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

python -m http.server 8080

pause
