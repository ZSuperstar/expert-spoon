@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║   🤖 分拣机器人智能评价系统 - 外网隧道（国内版）      ║
echo ║                                                       ║
echo ╠═══════════════════════════════════════════════════════╣
echo ║  使用神卓互联隧道，无需登录，即开即用                ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [提示] 正在获取本机 IP 地址...
for /f "tokens=2 delims=:" %%a in ('powershell -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -notlike '169.*' }).IPAddress" 2^>nul') do (
    set "LOCAL_IP=%%a"
    goto :found
)
:found

echo.
echo ═══════════════════════════════════════════════════════
echo   本地服务器信息
echo   内网访问：http://127.0.0.1:3000
echo   局域网访问：http://%LOCAL_IP%:3000
echo ═══════════════════════════════════════════════════════
echo.

echo 正在启动本地服务器...
start cmd /c "title 本地服务器 & npx --yes http-server -p 3000 -a 0.0.0.0 -c-1"

timeout /t 3 /nobreak >nul

echo.
echo ═══════════════════════════════════════════════════════
echo   外网隧道方案（选择其中一个）
echo ═══════════════════════════════════════════════════════
echo.
echo   方案 1：神卓互联（推荐）
echo   访问：https://www.shen-zhuo.com/
echo   下载客户端 -> 登录 -> 创建隧道 -> 本地端口 3000
echo.
echo   方案 2：Vercel 部署（最稳定）
echo   在命令行输入：vercel login
echo   然后输入：vercel --prod
echo.
echo   方案 3：Ngrok（需注册）
echo   访问：https://ngrok.com 注册获取 token
echo   然后输入：ngrok config add-authtoken YOUR_TOKEN
echo   最后输入：ngrok http 3000
echo.
echo ═══════════════════════════════════════════════════════
echo.
echo 按任意键打开浏览器查看本地页面
start http://127.0.0.1:3000
pause >nul
