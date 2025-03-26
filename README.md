# Software Engineer Portfolio - Glassmorphism Design

พอร์ตโฟลิโอ Software Engineer ในสไตล์ Glassmorphism สำหรับ GitHub Pages

## คุณสมบัติ

- การออกแบบ Glassmorphism ที่ทันสมัย
- Dark Mode / Light Mode
- Responsive design สำหรับทุกอุปกรณ์
- แสดงทักษะในรูปแบบแท็ก (ไม่ใช่เปอร์เซ็นต์)
- ส่วนติดต่อและโซเชียลมีเดีย
- ใช้ Tailwind CSS
- รองรับการใช้งานบน GitHub Pages

## การติดตั้ง

1. โคลนหรือดาวน์โหลดโปรเจคนี้

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. ติดตั้ง dependencies

```bash
npm install
```

3. สร้างไฟล์ CSS จาก Tailwind

```bash
npm run build:css
```

4. เพื่อพัฒนาในโหมด watch (อัปเดต CSS อัตโนมัติเมื่อมีการเปลี่ยนแปลง)

```bash
npm run dev
```

## การปรับแต่ง

1. แก้ไขข้อมูลส่วนตัวและประสบการณ์ในไฟล์ `index.html`
2. เพิ่มรูปภาพของคุณใน `assets/images/`
3. ปรับแต่งสีและสไตล์ใน `assets/css/style.css` และ `tailwind.config.js`
4. เพิ่มหรือแก้ไขอนิเมชันใน `assets/js/animations.js`

## การ Deploy ไปยัง GitHub Pages

1. สร้าง repository ชื่อ `yourusername.github.io` บน GitHub
2. Push โค้ดทั้งหมดไปยัง repository นั้น

```bash
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git branch -M main
git push -u origin main
```

3. เปิดใช้งาน GitHub Pages ใน repository settings

## โครงสร้างโปรเจค

```
portfolio/
├── index.html              # หน้าหลักของพอร์ตโฟลิโอ
├── assets/                 # ทรัพยากรต่างๆ
│   ├── css/                # ไฟล์ CSS
│   │   ├── style.css       # Custom CSS
│   │   └── tailwind.output.css  # Compiled Tailwind CSS
│   ├── js/                 # ไฟล์ JavaScript
│   │   ├── main.js         # JavaScript หลัก
│   │   ├── darkMode.js     # ฟังก์ชัน Dark/Light mode
│   │   └── animations.js   # อนิเมชันและเอฟเฟกต์
│   ├── images/             # รูปภาพ
│   │   ├── profile-photo.jpg  # รูปโปรไฟล์
│   │   ├── logo.png        # โลโก้
│   │   └── projects/       # รูปภาพโปรเจค
│   └── fonts/              # ฟอนต์ (ถ้ามี)
├── tailwind.config.js      # กำหนดค่า Tailwind CSS
├── postcss.config.js       # กำหนดค่า PostCSS
├── package.json            # กำหนดค่า npm package
├── .gitignore              # ไฟล์ที่ git ควรละเว้น
└── README.md               # เอกสารโปรเจค
```

## License

[MIT License](LICENSE)

## ผู้สร้าง

KITTISAK LAMNOI
