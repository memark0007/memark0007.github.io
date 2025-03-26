/** @type {import('tailwindcss').Config} */
module.exports = {
  // กำหนดไฟล์ที่ Tailwind ควรสแกนหาคลาส
  content: [
    "./**/*.{html,js}", 
    "./assets/**/*.js"
  ],
  // เปิดใช้งาน Dark Mode แบบ class-based
  darkMode: 'class',
  theme: {
    extend: {
      // กำหนด Font Family หลัก
      fontFamily: {
        sans: [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif'
        ],
      },
      // กำหนดสีหลักสำหรับแบรนด์และธีม
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        // โทนสีสำหรับ Glassmorphism
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(15, 23, 42, 0.2)',
          border: {
            light: 'rgba(255, 255, 255, 0.2)',
            dark: 'rgba(255, 255, 255, 0.05)',
          }
        }
      },
      // กำหนด animations และ keyframes
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out forwards',
        'slideInUp': 'slideInUp 0.8s ease-out forwards',
        'slideInRight': 'slideInRight 0.8s ease-out forwards',
        'slideInLeft': 'slideInLeft 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradientBg': 'gradientBg 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientBg: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      // เพิ่ม backdrop blur options
      backdropBlur: {
        'xs': '2px',
        '2xl': '30px',
        '3xl': '40px',
      },
      // ขยาย gradient stops
      gradientColorStops: {
        'glass-light': 'rgba(255, 255, 255, 0.05)',
        'glass-dark': 'rgba(15, 23, 42, 0.1)',
      },
      // เพิ่ม box shadow
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-sm': '0 2px 8px 0 rgba(31, 38, 135, 0.1)',
        'glass-lg': '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
        'neon': '0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
        'neon-purple': '0 0 10px rgba(192, 38, 211, 0.5), 0 0 20px rgba(192, 38, 211, 0.3)',
      },
      // เพิ่ม scale transforms
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
    },
  },
  // Plugins (ไม่มีในตัวอย่างนี้ แต่สามารถเพิ่มได้ตามต้องการ)
  plugins: [],
}