@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║   🤖 分拣机器人智能评价系统 - 外网服务（自动获取链接）║
echo ║                                                       ║
echo ╠═══════════════════════════════════════════════════════╣
echo ║  使用 Cloudflare Tunnel，自动显示外网链接             ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM 先停止可能正在运行的 3000 端口进程
taskkill /F /FI "WINDOWTITLE eq 本地服务器*" >nul 2>nul
taskkill /F /FI "WINDOWTITLE eq Cloudflare*" >nul 2>nul
timeout /t 1 /nobreak >nul

echo [1/3] 正在启动本地服务器...
start cmd /c "title 本地服务器& npx --yes http-server -p 3000 -a 0.0.0.0 -c-1"

timeout /t 2 /nobreak >nul

echo [2/3] 正在创建 Cloudflare 外网隧道...
echo.

REM 创建临时文件来捕获 tunnel 输出
set TEMP_FILE=%TEMP%\cloudflare_tunnel_%RANDOM%.txt

REM 启动 tunnel 并将输出重定向到文件
start cmd /c "title Cloudflare Tunnel& npx --yes cloudflared tunnel --no-autoupdate --url http://localhost:3000 > %TEMP_FILE% 2>&1"

echo [3/3] 正在获取外网链接，请稍候...
echo.

REM 等待 tunnel 启动
timeout /t 5 /nobreak >nul

REM 读取输出文件查找 URL
for /f "tokens=*" %%a in ('findstr /c:"trycloudflare.com" "%TEMP_FILE%" 2^>nul') do (
    set "TUNNEL_URL=%%a"
    goto :found
)

:found
echo.
echo ═══════════════════════════════════════════════════════
echo   服务已启动！
echo.
if defined TUNNEL_URL (
    echo   外网链接：%TUNNEL_URL%
    echo.
    echo   已复制到剪贴板！
    echo %TUNNEL_URL% | clip
    echo   直接粘贴到浏览器/微信/QQ 即可访问
) else (
    echo   本地访问：http://127.0.0.1:3000
    echo   外网链接：请在 Cloudflare Tunnel 窗口中查找
    echo   格式：https://xxx.trycloudflare.com
)
echo.
echo   有效期：2 小时，支持多人同时访问
echo ═══════════════════════════════════════════════════════
echo.
echo 按任意键退出（不会影响服务）
pause >nul
