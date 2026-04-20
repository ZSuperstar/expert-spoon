@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║   🤖 分拣机器人系统 - 部署到 GitHub Pages             ║
echo ║                                                       ║
echo ╠═══════════════════════════════════════════════════════╣
echo ║  自动推送到 GitHub，启用 Pages 即可访问                ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/4] 初始化 Git 仓库...
git init >nul 2>&1

echo [2/4] 添加所有文件...
git add -A

echo [3/4] 提交更改...
git commit -m "Deploy to GitHub Pages" || goto :no_changes

echo [4/4] 推送到 GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [提示] 推送失败，可能需要验证
    echo 请运行：git push origin main
    echo.
)

:no_changes
echo.
echo ═══════════════════════════════════════════════════════
echo   完成！
echo ═══════════════════════════════════════════════════════
echo.
echo   下一步操作：
echo   1. 访问 https://github.com/ZSuperstar/expert-spoon/settings/pages
echo   2. Source 选择 Deploy from a branch
echo   3. Branch 选择 main / root
echo   4. 点击 Save
echo.
echo   约 1-2 分钟后获得外网链接：
echo   https://zsuperstar.github.io/expert-spoon/
echo.
echo ═══════════════════════════════════════════════════════
echo.
pause
