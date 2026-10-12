import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fcfaf7',
          100: '#f7f2e9',
          200: '#ede0cd',
          300: '#e0c9aa',
          400: '#cfaa7f',
          500: '#c5a059', // Primary Gold Accent
          600: '#b08745',
          700: '#8e6837',
          800: '#745431',
          900: '#5e452a',
        },
        navy: {
          800: '#111827',
          900: '#0b1120', // Dark luxury navy
          950: '#070b14',
        }
      },
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
