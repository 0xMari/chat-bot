import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        shizuruSerif : 'var(--font-shizuru-serif)',
        kirang: 'var(--font-kirang)',
      },
      boxShadow:{
        solidMath: '6px 6px 0 0 rgb(56,189,248)',
        solidCreative: '6px 6px 0 0 rgb(244,114,182)',
        solidGeneral: '6px 6px 0 0 rgb(74,222,128)',
      },
    },
  },
  plugins: [],
} satisfies Config;
