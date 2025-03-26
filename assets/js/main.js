/**
 * main.js
 * ไฟล์ JavaScript หลักสำหรับพอร์ตโฟลิโอ
 * จัดการฟังก์ชันทั่วไป การนำทาง และการโต้ตอบกับผู้ใช้
 */

// รอให้ DOM โหลดเรียบร้อย
document.addEventListener("DOMContentLoaded", () => {
  // ---- เริ่มต้นฟังก์ชันทั้งหมด ----
  initMobileMenu();
  initSmoothScroll();
  initScrollSpy();
  initHeaderScroll();
  initContactForm();
  setupParallaxEffect();
  initTooltips();
  initProjectsInteraction();

  // เริ่มการสังเกต elements ที่จะทำ animation เมื่อเลื่อนมาถึง
  initIntersectionObserver();
});

/**
 * จัดการเมนูมือถือ (Hamburger menu)
 */
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuButton || !mobileMenu) return;

  // เปิด/ปิดเมนูเมื่อกดปุ่ม
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    // Animation เปิด/ปิดเมนู
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateY(-10px)";

      // Delay เล็กน้อยเพื่อให้ CSS transition ทำงานได้
      setTimeout(() => {
        mobileMenu.style.opacity = "1";
        mobileMenu.style.transform = "translateY(0)";
      }, 50);
    }
  });

  // ปิดเมนูเมื่อคลิกที่ลิงก์
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // ปิดเมนูเมื่อคลิกที่พื้นที่อื่นนอกเมนู
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.classList.contains("hidden") &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuButton.contains(e.target)
    ) {
      mobileMenu.classList.add("hidden");
    }
  });
}

/**
 * ทำให้การเลื่อนหน้าเว็บเป็นแบบ smooth เมื่อคลิกที่ลิงก์ภายใน
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return; // ถ้าเป็นแค่ # ให้ไม่ต้องทำอะไร

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // คำนวณตำแหน่งที่จะเลื่อนไป โดยหักความสูงของ navbar
        const navbarHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        // ทำการเลื่อน
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * ไฮไลท์เมนูที่ตรงกับส่วนที่กำลังดูอยู่
 */
function initScrollSpy() {
  // รายการเมนูทั้งหมด
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  // ตรวจสอบว่ากำลังดูส่วนไหนอยู่
  window.addEventListener("scroll", () => {
    // ระยะขอบบน navbar
    const navbarHeight = document.querySelector("header").offsetHeight;
    // scroll position ปัจจุบัน + ครึ่งหนึ่งของความสูงหน้าจอ
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    // ตรวจสอบทุกเซ็กชัน
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      // เช็คว่า scroll position อยู่ในเซ็กชันนี้หรือไม่
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // ลบ active ออกจากทุกเมนู
        navItems.forEach((item) => {
          item.classList.remove("text-blue-600", "dark:text-blue-400");

          const afterElement = window.getComputedStyle(item, "::after");
          if (afterElement) {
            item.style.setProperty("--nav-item-width", "0%");
          }
        });

        // เพิ่ม active ให้กับเมนูที่ตรงกับเซ็กชันปัจจุบัน
        const activeNavItem = document.querySelector(
          `.nav-item[href="#${sectionId}"]`
        );
        if (activeNavItem) {
          activeNavItem.classList.add("text-blue-600", "dark:text-blue-400");
          activeNavItem.style.setProperty("--nav-item-width", "100%");
        }
      }
    });
  });
}

/**
 * เปลี่ยนสไตล์ navbar เมื่อเลื่อนลง
 */
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const nav = header.querySelector("nav");

    if (scrollPosition > 50) {
      nav.classList.add("scrolled");
      header.classList.add("py-2");
      header.classList.remove("py-4");
    } else {
      nav.classList.remove("scrolled");
      header.classList.remove("py-2");
      header.classList.add("py-4");
    }
  });
}

/**
 * จัดการฟอร์มติดต่อ
 */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // สร้าง notification element
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 right-4 glassmorphism-card p-4 rounded-lg z-50 transform transition-all duration-500 translate-y-20 opacity-0";
    notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                <p class="dark:text-white">Message sent successfully!</p>
            </div>
        `;

    // เพิ่ม notification เข้าไปใน body
    document.body.appendChild(notification);

    // แสดง notification
    setTimeout(() => {
      notification.classList.remove("translate-y-20", "opacity-0");
    }, 100);

    // ซ่อน notification หลังจาก 3 วินาที
    setTimeout(() => {
      notification.classList.add("translate-y-20", "opacity-0");

      // ลบ notification หลังจากที่ animation เสร็จสิ้น
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);

    // รีเซ็ตฟอร์ม
    contactForm.reset();

    // หมายเหตุ: ในสถานการณ์จริง จะส่งข้อมูลไปยัง API หรือใช้บริการเช่น Formspree
    // console.log('Form submitted');
  });
}

/**
 * สร้าง parallax effect เมื่อเลื่อนหน้า
 */
function setupParallaxEffect() {
  const parallaxElements = document.querySelectorAll(".parallax");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.1;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Parallax effect เมื่อเลื่อนเมาส์
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // คำนวณตำแหน่งเมาส์เทียบกับกึ่งกลางหน้าจอ (-1 ถึง 1)
    const xPos = (mouseX / windowWidth - 0.5) * 2;
    const yPos = (mouseY / windowHeight - 0.5) * 2;

    // เลื่อนองค์ประกอบพื้นหลังตาม
    const bgElements = document.querySelectorAll(".bg-decoration");
    bgElements.forEach((element) => {
      const moveX = xPos * 10;
      const moveY = yPos * 10;
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // เลื่อนรูปโปรไฟล์เล็กน้อย
    const profileImg = document.querySelector(".profile-card");
    if (profileImg) {
      const moveX = xPos * 5;
      const moveY = yPos * 5;
      profileImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });
}

/**
 * เพิ่ม tooltips เมื่อ hover ข้อความหรือไอคอน
 */
function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltipText = this.getAttribute("data-tooltip");

      // สร้าง tooltip element
      const tooltip = document.createElement("div");
      tooltip.className =
        "absolute z-50 glassmorphism-card px-3 py-2 text-sm rounded-md transition-all duration-300 opacity-0 transform -translate-y-2";
      tooltip.textContent = tooltipText;
      tooltip.style.bottom = "calc(100% + 10px)";
      tooltip.style.left = "50%";
      tooltip.style.transform = "translateX(-50%) translateY(10px)";

      // จัดตำแหน่ง tooltip
      this.style.position = "relative";
      this.appendChild(tooltip);

      // แสดง tooltip ด้วย animation
      setTimeout(() => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateX(-50%) translateY(0)";
      }, 50);
    });

    element.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector("div");
      if (tooltip) {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateX(-50%) translateY(10px)";

        // ลบ tooltip หลังจาก animation เสร็จสิ้น
        setTimeout(() => {
          this.removeChild(tooltip);
        }, 300);
      }
    });
  });
}
/**
 * จัดการ Projects Modal และ Effects
 */
function initProjectsInteraction() {
  const projectCards = document.querySelectorAll(".project-card");
  const body = document.body;

  // เพิ่ม hover effects สำหรับ project cards
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
      const image = this.querySelector("img");
      if (image) {
        image.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      const image = this.querySelector("img");
      if (image) {
        image.style.transform = "";
      }
    });

    // เมื่อคลิกที่ View Details
    const detailsLink = card.querySelector('a[href="#"]');
    if (detailsLink) {
      detailsLink.addEventListener("click", function (e) {
        e.preventDefault();

        // ข้อมูลโปรเจค
        const projectTitle = card.querySelector("h3").textContent;
        const projectDescription = card.querySelector("p").textContent;
        const projectImage = card.querySelector(
          ".project-image-container img"
        ).src;
        const projectTags = Array.from(
          card.querySelectorAll(".skill-tag-small")
        ).map((tag) => tag.textContent);

        // ตรวจสอบว่ามี modal อยู่แล้วหรือไม่
        let modal = document.querySelector(".project-modal");

        // ถ้าไม่มี modal ให้สร้างใหม่
        if (!modal) {
          modal = document.createElement("div");
          modal.className = "project-modal";
          body.appendChild(modal);
        }

        // สร้าง content สำหรับ modal
        const modalContent = `
                    <div class="project-modal-content dark:text-white">
                        <button class="project-modal-close">&times;</button>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <img src="${projectImage}" alt="${projectTitle}" class="w-full h-auto rounded-lg mb-4">
                                <div class="project-gallery">
                                    <div class="project-gallery-item">
                                        <img src="${projectImage}" alt="Screenshot 1">
                                    </div>
                                    <div class="project-gallery-item">
                                        <img src="${projectImage}" alt="Screenshot 2">
                                    </div>
                                    <div class="project-gallery-item">
                                        <img src="${projectImage}" alt="Screenshot 3">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold mb-4">${projectTitle}</h2>
                                <p class="mb-6">${projectDescription}</p>
                                
                                <h3 class="text-xl font-semibold mb-2">Features</h3>
                                <ul class="list-disc pl-5 mb-6 space-y-1">
                                    <li>Responsive design for all devices</li>
                                    <li>High performance with optimized code</li>
                                    <li>Secure authentication system</li>
                                    <li>Intuitive user interface</li>
                                    <li>Real-time data updates</li>
                                </ul>
                                
                                <h3 class="text-xl font-semibold mb-2">Technologies Used</h3>
                                <div class="flex flex-wrap gap-2 mb-6">
                                    ${projectTags
                                      .map(
                                        (tag) =>
                                          `<span class="skill-tag-small">${tag}</span>`
                                      )
                                      .join("")}
                                </div>
                                
                                <div class="flex space-x-4">
                                    <a href="#" class="glassmorphism-btn-primary px-4 py-2 rounded-lg flex items-center">
                                        <i class="fas fa-external-link-alt mr-2"></i> Live Demo
                                    </a>
                                    <a href="#" class="glassmorphism-btn px-4 py-2 rounded-lg flex items-center">
                                        <i class="fab fa-github mr-2"></i> Source Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        // เพิ่ม content เข้าไปใน modal
        modal.innerHTML = modalContent;

        // แสดง modal
        setTimeout(() => {
          modal.classList.add("active");
        }, 50);

        // เพิ่ม event listener สำหรับปุ่มปิด
        const closeButton = modal.querySelector(".project-modal-close");
        closeButton.addEventListener("click", () => {
          modal.classList.remove("active");

          // ลบ modal หลังจาก animation เสร็จ
          setTimeout(() => {
            body.removeChild(modal);
          }, 300);
        });

        // ปิด modal เมื่อคลิกที่พื้นหลัง
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.remove("active");

            // ลบ modal หลังจาก animation เสร็จ
            setTimeout(() => {
              body.removeChild(modal);
            }, 300);
          }
        });
      });
    }
  });
}

/**
 * ใช้ Intersection Observer เพื่อทำ animation เมื่อเลื่อนมาถึง element
 */
function initIntersectionObserver() {
  // ถ้า browser ไม่รองรับ Intersection Observer ให้จบการทำงาน
  if (!("IntersectionObserver" in window)) {
    // ทำให้ทุก elements แสดงผลทันที
    document.querySelectorAll(".slideInUp").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return;
  }

  // สร้าง intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // ถ้า element เข้ามาในหน้าจอ
        if (entry.isIntersecting) {
          // เพิ่มคลาสเพื่อทำ animation
          entry.target.classList.add("animate-slideIn");
          // เลิกติดตาม element นี้
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // viewport
      threshold: 0.1, // แสดงเมื่อมองเห็น 10% ของ element
      rootMargin: "0px 0px -50px 0px", // ให้ทำงานก่อนที่จะเห็น element ทั้งหมด
    }
  );

  // เริ่มสังเกต elements ที่มีคลาส slideInUp
  document.querySelectorAll(".slideInUp").forEach((el) => {
    observer.observe(el);
  });

  // เริ่มสังเกต elements ที่มีคลาส fadeIn
  document.querySelectorAll(".fadeIn").forEach((el) => {
    observer.observe(el);
  });
}
