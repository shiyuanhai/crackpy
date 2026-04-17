import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        bg: "#FAFAFA",
        surface: "#FFFFFF",
        "surface-soft": "#F4F4F5",
        border: "#E4E4E7",
        "border-strong": "#D4D4D8",
        text: "#18181B",
        "text-muted": "#52525B",
        "text-subtle": "#71717A",
        primary: "#6366F1",
        "primary-hover": "#4F46E5",
        "primary-soft": "#EEF2FF",
        success: "#10B981",
        "success-soft": "#D1FAE5",
        warning: "#F59E0B",
        "warning-soft": "#FEF3C7",
        danger: "#EF4444",
        "danger-soft": "#FEE2E2",
        code: "#0F172A",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "slide-down": "slideDown 320ms cubic-bezier(0.4, 0, 0.2, 1)",
        spin: "spin 800ms linear infinite",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
