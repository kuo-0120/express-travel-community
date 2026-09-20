# Express Travel Community

Node.js／Express／Pug 的多功能社群網站練習，包含登入註冊、個人資料、聯絡簿、佈告欄與旅遊內容 CRUD。

## 功能與技術

- Express routes + Pug views
- MySQL
- express-session
- 登入、登出、註冊、profile
- bulletin、contact、trip CRUD

## 啟動

```bash
npm ci
mysql -u root -p < database/schema.sql
```

複製 `.env.example` 的欄位到系統環境變數後執行：

```powershell
$env:DB_HOST = "127.0.0.1"
$env:DB_USER = "root"
$env:DB_PASSWORD = "your-password"
$env:DB_NAME = "travel_community"
$env:SESSION_SECRET = "use-a-long-random-secret"
npm start
```

資料庫帳密與 session secret 不在程式碼中；`SESSION_SECRET` 未設定時程式會拒絕啟動。

## 安全性說明

這是課程型專案，保留舊版 mysql callback 架構。目前部分 CRUD query 仍以字串插值組合 SQL，正式部署前必須全面改為 parameterized queries，並將明文密碼改為 bcrypt/Argon2 hash、加入 CSRF 防護與 session store。不要直接把本版本暴露到公開網路。
