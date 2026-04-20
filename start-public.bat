@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║     🤖 分拣机器人智能评价系统 - 启动服务（外网）       ║
echo ║                                                       ║
echo ╠═══════════════════════════════════════════════════════╣
echo ║  将创建公开链接，微信/QQ 可直接访问                    ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/2] 正在启动本地服务器...
start cmd /k "npx http-server -p 3000 -a 0.0.0.0 -c-1"

timeout /t 3 /nobreak >nul

echo [2/2] 正在创建外网隧道...
echo.
echo 请稍候，正在获取公开链接...
echo.

start cmd /k "ngrok http 3000 --log stdout"

echo.
echo ═══════════════════════════════════════════════════════
echo   服务已启动！
echo   本地访问：http://127.0.0.1:3000
echo   外网链接：查看另一个窗口的 ngrok 界面
echo.
echo   复制 ngrok 显示的 Forwarding 地址 (https://xxx.ngrok.io)
echo   发送到微信/QQ 即可访问
echo ═══════════════════════════════════════════════════════
echo.
echo 按任意键关闭此窗口（不会停止服务）
pause >nul
