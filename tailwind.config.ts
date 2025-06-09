// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // html 또는 body 요소에 .dark 클래스가 있으면 다크 모드를 적용
  content: ['./app/**/*.{js,ts,jsx,tsx,css}', './index.html'],
  theme: {
    extend: {
      // 커스터마이징 가능
    },
  },
  plugins: [],
};
