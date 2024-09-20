import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        "bg-dark": "rgb(var(--dark-bg) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        "dashboard-bg": "rgb(var(--dashboard-bg) / <alpha-value>)",
        "task-stage-bg": "rgb(var(--task-stage-bg) / <alpha-value>)",
        "task-item-bg": "rgb(var(--task-item-bg) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        "adlam-display": ["var(--font-adlam-display)"],
      },
    },
  },
  plugins: [],
};
export default config;
