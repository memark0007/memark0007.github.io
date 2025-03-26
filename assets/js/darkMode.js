/**
 * darkMode.js
 * จัดการการสลับระหว่าง Dark Mode และ Light Mode
 */

// รอให้ DOM โหลดเรียบร้อย
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});

/**
 * ตั้งค่าและจัดการ Dark Mode
 */
function initDarkMode() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    // ตรวจสอบการตั้งค่าธีมที่บันทึกใน localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // ตรวจสอบว่าระบบต้องการใช้ Dark Mode หรือไม่
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // กำหนดธีมเริ่มต้น
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
    
    // จัดการการคลิกปุ่มสลับธีม
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // จัดการการกดปุ่มลัด (Shift + D)
    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key === 'D') {
            toggleTheme();
        }
    });
}

/**
 * สลับระหว่าง Dark Mode และ Light Mode
 */
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
    
    // เพิ่ม animation ของปุ่มสลับธีม
    animateThemeToggle();
}

/**
 * เปิดใช้งาน Dark Mode
 */
function enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateDarkModeIcon(true);
    updateMetaThemeColor('#0f172a'); // Slate 900
}

/**
 * เปิดใช้งาน Light Mode
 */
function enableLightMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateDarkModeIcon(false);
    updateMetaThemeColor('#f8fafc'); // Slate 50
}

/**
 * อัปเดตไอคอนปุ่มสลับธีม
 * @param {boolean} isDarkMode - สถานะว่าเป็น Dark Mode หรือไม่
 */
function updateDarkModeIcon(isDarkMode) {
    const sunIcon = document.querySelector('#theme-toggle .fa-sun');
    const moonIcon = document.querySelector('#theme-toggle .fa-moon');
    
    if (sunIcon && moonIcon) {
        if (isDarkMode) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }
}

/**
 * อัปเดตสี theme-color meta tag (สำหรับ mobile browsers)
 * @param {string} color - สีในรูปแบบ hex code
 */
function updateMetaThemeColor(color) {
    // ตรวจสอบว่า meta tag theme-color มีอยู่หรือไม่
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    // ถ้าไม่มี ให้สร้างใหม่
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    // อัปเดตค่าสี
    metaThemeColor.content = color;
}

/**
 * เพิ่ม animation ให้กับปุ่มสลับธีม
 */
function animateThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    // เพิ่มคลาส animation
    themeToggleBtn.classList.add('animate-spin');
    
    // ลบคลาส animation หลังจากเล่นจบ
    setTimeout(() => {
        themeToggleBtn.classList.remove('animate-spin');
    }, 500);
    
    // เพิ่ม ripple effect
    createRippleEffect(themeToggleBtn);
}

/**
 * สร้าง ripple effect เมื่อคลิกปุ่ม
 * @param {HTMLElement} button - Element ของปุ่ม
 */
function createRippleEffect(button) {
    // ลบ ripple เก่าออกก่อน
    const oldRipple = button.querySelector('.ripple');
    if (oldRipple) {
        button.removeChild(oldRipple);
    }
    
    // สร้าง ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-effect 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    // กำหนดขนาดและตำแหน่ง
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    
    // เพิ่ม ripple เข้าไปในปุ่ม
    button.appendChild(ripple);
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
    // ลบ ripple หลังจากที่ animation เล่นจบ
    setTimeout(() => {
        if (ripple && ripple.parentNode === button) {
            button.removeChild(ripple);
        }
    }, 600);
}

// เพิ่ม keyframes animation สำหรับ ripple effect
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.textContent = `
@keyframes ripple-effect {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
}

.animate-spin {
    animation: spin 0.5s ease-in-out;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`;
document.head.appendChild(styleSheet);