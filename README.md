<div align="center">

# 🎵 Douyin Downloader

**Bulk download videos from any Douyin (Chinese TikTok) account — runs directly in your browser, no installation needed**

[![Version](https://img.shields.io/badge/version-latest-blue?style=for-the-badge)](https://github.com/thanhdz888/douyin-downloader)
[![Platform](https://img.shields.io/badge/platform-Douyin.com-ff0050?style=for-the-badge&logo=tiktok)](https://www.douyin.com)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow?style=for-the-badge&logo=javascript)](./douyin.js)
[![Login Required](https://img.shields.io/badge/login-not%20required-brightgreen?style=for-the-badge&logo=checkmarx)](./douyin.js)
[![License](https://img.shields.io/badge/license-Free-success?style=for-the-badge)](./douyin.js)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📥 **Bulk Download** | Scan and download all videos from any Douyin account |
| ⚡ **Concurrent Downloads** | Download multiple videos simultaneously (up to 10 threads) |
| 🔍 **Smart Filters** | Filter by likes, upload date, video duration, and orientation |
| 💾 **Low RAM Mode** | Automatic memory cleanup — works on low-spec machines |
| 🔄 **Auto Retry** | Automatically retries failed downloads (up to 5 times) |
| 📂 **Export Links (IDM)** | Export video URLs to a `.txt` file for use with IDM |
| 🎬 **Video Preview** | Preview videos directly inside the panel |
| 📝 **Flexible Naming** | Save files by title, counter (1, 2, 3...), or upload date |
| 🕓 **Download History** | Remembers downloaded videos and skips them automatically |
| 🛑 **Pause / Resume** | Pause and continue the download process at any time |

---

## 🚀 How to Use

> ✅ **No login required. No installation needed. Runs entirely in your browser.**

### Step 1 — Open a Douyin Profile Page
Go to the profile of any account you want to download from on [douyin.com](https://www.douyin.com):
```
https://www.douyin.com/user/MS4wLjABAAAAxxxxxx
```

### Step 2 — Open Browser DevTools
Press `F12` → Select the **Console** tab

### Step 3 — Paste and Run the Script
Copy the entire contents of [`douyin.js`](./douyin.js), paste it into the Console, and press **Enter**.

### Step 4 — Use the Panel
1. Click **🔍 Check Videos** to scan the account's videos
2. Select the videos you want (or select all)
3. Click **🚀 Download Selected**

---

## ⚙️ Filter Options

```
📌 Video Max      — Limit the number of videos to scan (0 = all)
❤️  Likes Min/Max  — Filter by like count range
📅 Date Range    — Filter videos by upload date
⏱️  Duration      — Filter by video length (seconds)
↔️  Orientation   — Landscape / Portrait / Square
```

---

## 📁 Project Structure

```
douyin-downloader/
├── douyin.js     # Main script — paste into browser console to run
└── README.md     # This documentation
```

---

## ⚠️ Disclaimer

> - This script runs **entirely in your browser**. No server, no app, no login required.
> - Intended for **personal, educational, and research use only**.
> - The author is not responsible for any misuse.

---

## 👨‍💻 Author

<div align="center">

**Nguyen Xuan Thanh**

[![YouTube](https://img.shields.io/badge/YouTube-@thanhxnt4-red?style=flat-square&logo=youtube)](https://www.youtube.com/@thanhxnt4)
[![Facebook](https://img.shields.io/badge/Facebook-nguyen.thanh.749031-1877F2?style=flat-square&logo=facebook)](https://www.facebook.com/nguyen.thanh.749031)

</div>

---

<div align="center">
<sub>Made with ❤️ by Nguyen Xuan Thanh</sub>
</div>