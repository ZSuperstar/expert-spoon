@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║   🤖 分拣机器人系统 - 部署到 Gitee Pages              ║
echo ║                                                       ║
echo ╠═══════════════════════════════════════════════════════╣
echo ║  请先到 https://gitee.com 注册/登录账号              ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM 检查是否有 git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装 Git
    echo 下载地址：https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] 添加 Gitee 远程仓库...
echo.

REM 提示用户输入 Gitee 用户名
set /p GITEE_USER="请输入你的 Gitee 用户名（用户名可在 gitee.com 个人中心查看）: "

if "%GITEE_USER%"=="" (
    echo [错误] 用户名不能为空
    pause
    exit /b 1
)

set REPO_NAME=%GITEE_USER%.git.io

echo.
echo [2/5] 配置 Git 用户信息...
git config --global user.name "%GITEE_USER%"

echo [3/5] 初始化 Git 仓库（如果已初始化则跳过）...
git init >nul 2>&1

echo [4/5] 添加 Gitee 远程仓库...
git remote remove gitee >nul 2>&1
git remote add gitee git@gitee.com:%GITEE_USER%/%GITEE_USER%.git.io.git

echo [5/5] 推送代码到 Gitee...
echo.
echo 注意：首次推送需要 Gitee SSH 密钥
echo 如没有密钥，请访问：https://gitee.com/profile/ssh_keys
echo.
git add -A
git commit -m "Deploy to Gitee Pages" || goto :commit_exists
git push -f gitee main

:success
echo.
echo ═══════════════════════════════════════════════════════
echo   部署完成！
echo ═══════════════════════════════════════════════════════
echo.
echo   下一步操作：
echo   1. 访问 https://gitee.com/%GITEE_USER%/%GITEE_USER%.git.io
echo   2. 进入 服务 -> Gitee Pages
echo   3. 选择分支：main
echo   4. 点击 启动
echo   5. 获得外网链接：https://%GITEE_USER%.gitee.io/%GITEE_USER%.git.io
echo.
echo ═══════════════════════════════════════════════════════
echo.
pause
exit /b 0

:commit_exists
echo [提示] 没有新更改需要提交
echo.
goto :success
