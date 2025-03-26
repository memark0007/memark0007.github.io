/**
 * animations.js
 * จัดการ animations และ visual effects ต่างๆ สำหรับพอร์ตโฟลิโอ
 */

// รอให้ DOM โหลดเรียบร้อย
document.addEventListener('DOMContentLoaded', () => {
    // เริ่มต้น animations ทั้งหมด
    initBackgroundAnimation();
    initTypingEffect();
    initParticleBackground();
    initSkillTagAnimation();
    initFloatingElements();
    initScrollProgressBar();
    initCustomCursor();
});

/**
 * สร้าง animation กราเดียนท์สำหรับพื้นหลัง
 */
function initBackgroundAnimation() {
    // ตรวจสอบว่ามี element สำหรับทำ animation หรือไม่
    const bgDecorations = document.querySelectorAll('.bg-decoration');
    if (bgDecorations.length === 0) return;
    
    // เพิ่ม animation สำหรับแต่ละ element
    bgDecorations.forEach(element => {
        // สร้าง background shapes เพิ่มเติม
        for (let i = 0; i < 3; i++) {
            const shape = document.createElement('div');
            
            // สุ่มขนาดและตำแหน่ง
            const size = Math.random() * 200 + 100;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            
            // กำหนด style
            shape.style.position = 'absolute';
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.borderRadius = '50%';
            shape.style.left = `${posX}%`;
            shape.style.top = `${posY}%`;
            shape.style.opacity = '0.1';
            shape.style.filter = 'blur(60px)';
            shape.style.transform = 'translate(-50%, -50%)';
            shape.style.background = getRandomGradient();
            shape.style.animation = `float ${15 + i * 5}s ease-in-out infinite alternate-reverse`;
            shape.style.animationDelay = `${delay}s`;
            
            // เพิ่ม shape เข้าไปใน element
            element.appendChild(shape);
        }
    });
}

/**
 * สร้าง typing effect สำหรับ hero section
 */
function initTypingEffect() {
    const typeTarget = document.querySelector('.hero-typing-text');
    if (!typeTarget) return;
    
    // ข้อความที่จะแสดงเป็น typing effect
    const texts = [
        "Building Enterprise Systems",
        "Developing Web Applications",
        "Creating Innovative Solutions",
        "Optimizing Performance",
        "Implementing AI Technologies"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // ความเร็วในการพิมพ์ (ms)
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // ลบตัวอักษรทีละตัว
            typeTarget.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // ลบเร็วกว่าพิมพ์
        } else {
            // พิมพ์ตัวอักษรทีละตัว
            typeTarget.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // พิมพ์ช้ากว่าลบ
        }
        
        // เมื่อพิมพ์เสร็จแล้ว
        if (!isDeleting && charIndex === currentText.length) {
            // หยุดรอก่อนจะเริ่มลบ
            isDeleting = true;
            typingSpeed = 1500; // รอ 1.5 วินาทีก่อนลบ
        } 
        // เมื่อลบเสร็จแล้ว
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // เปลี่ยนไปข้อความถัดไป
            textIndex = (textIndex + 1) % texts.length;
            // รอก่อนเริ่มพิมพ์
            typingSpeed = 500;
        }
        
        // ทำงานซ้ำ
        setTimeout(typeText, typingSpeed);
    }
    
    // เริ่มต้น typing effect
    setTimeout(typeText, 1000);
}

/**
 * สร้าง particle background animation
 */
function initParticleBackground() {
    // ตรวจสอบว่ามี canvas element หรือไม่
    let canvas = document.getElementById('particles-background');
    
    // ถ้าไม่มี ให้สร้างใหม่
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'particles-background';
        canvas.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]';
        document.body.appendChild(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50; // จำนวน particles
    
    // ปรับ canvas size ให้เต็มหน้าจอ
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // เรียกใช้งานตอนเริ่มต้น
    resizeCanvas();
    
    // ปรับขนาดเมื่อ resize หน้าจอ
    window.addEventListener('resize', resizeCanvas);
    
    // สร้าง particles
    function createParticles() {
        particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: getRandomParticleColor(),
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    // วาด particles
    function drawParticles() {
        // เคลียร์ canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // วาดแต่ละ particle
        particles.forEach((particle, i) => {
            // เคลื่อนที่
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // สะท้อนเมื่อชนขอบ
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            // วาด particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`);
            ctx.fill();
            
            // วาดเส้นเชื่อมระหว่าง particles ที่อยู่ใกล้กัน
            particles.forEach((otherParticle, j) => {
                if (i !== j) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 130, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                }
            });
        });
        
        // ทำงานซ้ำ
        requestAnimationFrame(drawParticles);
    }
    
    // เริ่มต้น animation
    createParticles();
    drawParticles();
}

/**
 * สร้าง animation สำหรับ skill tags
 */
function initSkillTagAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        // เพิ่ม event listener สำหรับเมื่อ hover
        tag.addEventListener('mouseenter', () => {
            // เพิ่ม animation เมื่อ hover
            tag.style.transform = 'translateY(-5px) scale(1.05)';
            tag.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            
            // เพิ่ม animation สีพื้นหลัง
            if (document.documentElement.classList.contains('dark')) {
                tag.style.background = 'rgba(30, 41, 59, 0.4)';
            } else {
                tag.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        });
        
        // Event listener สำหรับเมื่อ hover ออก
        tag.addEventListener('mouseleave', () => {
            // คืนค่าเดิม
            tag.style.transform = '';
            tag.style.boxShadow = '';
            
            if (document.documentElement.classList.contains('dark')) {
                tag.style.background = 'rgba(15, 23, 42, 0.2)';
            } else {
                tag.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
}

/**
 * สร้าง animation สำหรับ floating elements
 */
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-animation');
    
    floatingElements.forEach((element, index) => {
        // กำหนดเวลา delay แตกต่างกันเพื่อให้เคลื่อนไหวไม่พร้อมกัน
        const delay = index * 0.2;
        
        // เพิ่ม animation
        element.style.animation = `float 6s ease-in-out ${delay}s infinite alternate`;
    });
}

/**
 * สร้าง progress bar แสดงความคืบหน้าในการ scroll
 */
function initScrollProgressBar() {
    // สร้าง progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-blue-600 to-purple-600';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    // ปรับ width ตามการ scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        
        // คำนวณเปอร์เซ็นต์การ scroll
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        // ปรับความกว้างของ progress bar
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

/**
 * สร้าง custom cursor สวยงาม
 */
function initCustomCursor() {
    // สร้าง cursor element
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    // กำหนด style สำหรับ cursor
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '2px solid rgba(99, 102, 241, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'width 0.2s, height 0.2s, opacity 0.2s';
    
    // กำหนด style สำหรับ dot ตรงกลาง
    cursorDot.className = 'cursor-dot';
    cursorDot.style.position = 'absolute';
    cursorDot.style.width = '5px';
    cursorDot.style.height = '5px';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.backgroundColor = 'rgba(99, 102, 241, 0.8)';
    cursorDot.style.top = '50%';
    cursorDot.style.left = '50%';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    
    // เพิ่ม dot เข้าไปใน cursor
    cursor.appendChild(cursorDot);
    
    // เพิ่ม cursor เข้าไปใน body
    document.body.appendChild(cursor);
    
    // อัปเดตตำแหน่ง cursor ตามตำแหน่งเมาส์
    document.addEventListener('mousemove', (e) => {
        // ใช้ requestAnimationFrame เพื่อให้การเคลื่อนไหวลื่นขึ้น
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });
    
    // ทำให้ cursor ใหญ่ขึ้นเมื่อ hover ที่ elements ที่มีการโต้ตอบ
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-tag, .social-icon, .glassmorphism-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.border = '2px solid rgba(99, 102, 241, 0.8)';
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.border = '2px solid rgba(99, 102, 241, 0.5)';
            cursorDot.style.width = '5px';
            cursorDot.style.height = '5px';
        });
    });
    
    // ซ่อน cursor เมื่อเมาส์ออกนอกหน้าจอ
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
    });
    
    // ทำให้ cursor เล็กลงเมื่อคลิก
    document.addEventListener('mousedown', () => {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursorDot.style.width = '3px';
        cursorDot.style.height = '3px';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursorDot.style.width = '5px';
        cursorDot.style.height = '5px';
    });
    
    // ซ่อน cursor ดั้งเดิมของเบราว์เซอร์
    document.body.style.cursor = 'none';
    
    // อย่าลืมคืนค่า cursor ดั้งเดิมใน interactive elements
    interactiveElements.forEach(element => {
        element.style.cursor = 'none';
    });
}

/**
 * ฟังก์ชันสร้างสีแบบสุ่มสำหรับ particle
 * @returns {string} - สีในรูปแบบ rgb หรือ rgba
 */
function getRandomParticleColor() {
    const colors = [
        'rgba(67, 97, 238,', // blue
        'rgba(114, 9, 183,', // purple
        'rgba(76, 201, 240,', // light blue
        'rgba(58, 12, 163,', // dark blue
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * ฟังก์ชันสร้าง gradient สุ่มสำหรับพื้นหลัง
 * @returns {string} - CSS linear-gradient
 */
function getRandomGradient() {
    const gradients = [
        'linear-gradient(to right, #4361ee, #3a0ca3)',
        'linear-gradient(to right, #7209b7, #3a0ca3)',
        'linear-gradient(to right, #4cc9f0, #4361ee)',
        'linear-gradient(to right, #7209b7, #4cc9f0)',
    ];
    
    return gradients[Math.floor(Math.random() * gradients.length)];
}