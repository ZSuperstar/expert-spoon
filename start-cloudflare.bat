@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║   🤖 分拣机器人智能评价系统 - 外网服务（稳定版）      ║
echo ║                                                       ║
echo ╠═══════════════════════════════════════════════════════╣
echo ║  使用 Cloudflare Tunnel，支持多人稳定访问            ║
echo ║  链接在 2 小时内有效，适合微信/QQ 分享                 ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/2] 正在启动本地服务器...
start cmd /k "title 本地服务器 & npx http-server -p 3000 -a 0.0.0.0 -c-1"

timeout /t 2 /nobreak >nul

echo [2/2] 正在创建 Cloudflare 外网隧道...
echo.
echo 请稍候，正在获取外网链接...
echo.

REM 使用快速隧道模式，自动显示链接
start cmd /k "title Cloudflare Tunnel & npx --yes cloudflared tunnel --no-autoupdate --url http://localhost:3000"

timeout /t 8 /nobreak >nul

echo.
echo ═══════════════════════════════════════════════════════
echo   服务已启动！
echo.
echo   本地访问：http://127.0.0.1:3000
echo.
echo   外网链接：在 Cloudflare Tunnel 窗口中查找
echo   格式：https://xxx-xxx-xxx-xxx.trycloudflare.com
echo.
echo   💡 提示：如果看不到链接，在 Tunnel 窗口按 ↑ 键
echo   将外网链接发送到微信/QQ 即可访问
echo   有效期：2 小时，支持多人同时访问
echo ═══════════════════════════════════════════════════════
echo.
pause
