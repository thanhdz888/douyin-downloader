<div align="center">

# 🎵 Douyin Downloader Panel v7

**Công cụ tải video Douyin (TikTok Trung Quốc) hàng loạt — trực tiếp trên trình duyệt**

[![Version](https://img.shields.io/badge/version-7.0-blue?style=for-the-badge)](https://github.com/thanhdz888/douyin-downloader)
[![Platform](https://img.shields.io/badge/platform-Douyin.com-ff0050?style=for-the-badge&logo=tiktok)](https://www.douyin.com)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow?style=for-the-badge&logo=javascript)](https://github.com/thanhdz888/douyin-downloader/blob/main/douyin.js)
[![License](https://img.shields.io/badge/license-Personal%20Use-green?style=for-the-badge)](./LICENSE)

</div>

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|-----------|-------|
| 📥 **Tải hàng loạt** | Quét và tải toàn bộ video của một tài khoản Douyin |
| ⚡ **Tải đồng thời** | Hỗ trợ tải nhiều video cùng lúc (tối đa 10 luồng) |
| 🔍 **Bộ lọc thông minh** | Lọc theo lượt thích, ngày đăng, thời lượng, chiều video |
| 💾 **Chế độ RAM thấp** | Tự động dọn bộ nhớ, phù hợp máy cấu hình yếu |
| 🔄 **Tự động thử lại** | Tự thử lại khi gặp lỗi mạng, tối đa 5 lần |
| 📂 **Xuất link IDM** | Xuất danh sách link ra `.txt` để dùng với IDM |
| 🎬 **Xem trước video** | Xem trước video trực tiếp trong giao diện |
| 📝 **Đặt tên linh hoạt** | Đặt tên file theo tiêu đề, số thứ tự, hoặc ngày đăng |
| 🕓 **Lịch sử tải** | Ghi nhớ video đã tải, tự động bỏ qua khi chạy lại |
| 🛑 **Dừng / Tiếp tục** | Tạm dừng và tiếp tục bất cứ lúc nào |

---

## 🚀 Cách sử dụng

### Bước 1 — Mở trang người dùng Douyin
Truy cập trang hồ sơ của tài khoản bạn muốn tải trên [douyin.com](https://www.douyin.com), ví dụ:
```
https://www.douyin.com/user/MS4wLjABAAAAxxxxxx
```

### Bước 2 — Mở Console trình duyệt
Nhấn `F12` → chọn tab **Console**

### Bước 3 — Dán và chạy script
Sao chép toàn bộ nội dung file [`douyin.js`](./douyin.js), dán vào Console và nhấn **Enter**.

### Bước 4 — Sử dụng giao diện
1. Nhấn **🔍 Kiểm tra Video** để quét danh sách video
2. Chọn video muốn tải (hoặc chọn tất cả)
3. Nhấn **🚀 Tải Mục Đã Chọn**

---

## ⚙️ Tùy chọn bộ lọc

```
📌 Video Max     — Giới hạn số video quét (0 = tất cả)
❤️  Likes Min/Max — Lọc theo khoảng lượt thích
📅 Ngày Đăng    — Lọc video trong khoảng thời gian
⏱️  Thời lượng   — Lọc theo độ dài video (giây)
↔️  Hướng video  — Ngang / Dọc / Vuông
```

---

## 📁 Cấu trúc project

```
douyin-downloader/
├── douyin.js        # Script chính — chạy trực tiếp trên trình duyệt
└── README.md        # Hướng dẫn sử dụng
```

---

## ⚠️ Lưu ý quan trọng

> - Script chạy **100% trên trình duyệt**, không cần cài đặt phần mềm.
> - Chỉ hoạt động khi bạn đang **đăng nhập Douyin** trên trình duyệt.
> - Sử dụng cho mục đích **cá nhân, học tập, nghiên cứu**.
> - Tác giả không chịu trách nhiệm về việc sử dụng sai mục đích.

---

## 👨‍💻 Tác giả

<div align="center">

**Nguyễn Xuân Thành**

[![YouTube](https://img.shields.io/badge/YouTube-@thanhxn-red?style=flat-square&logo=youtube)](https://www.youtube.com/@thanhxn)
[![Facebook](https://img.shields.io/badge/Facebook-thanh.nguyen.31225-1877F2?style=flat-square&logo=facebook)](https://www.facebook.com/thanh.nguyen.31225)

</div>

---

<div align="center">
<sub>Made with ❤️ by Nguyễn Xuân Thành • © 2025</sub>
</div>