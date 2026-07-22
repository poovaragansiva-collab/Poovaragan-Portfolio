import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#08090B",
          elevated: "#101215",
          card: "#0D0E11",
        },
        fg: {
          primary: "#F5F5F2",
          muted: "#9A9CA3",
          faint: "#6B6D74",
        },
        accent: {
          DEFAULT: "#2E6FFF",
          soft: "#2E6FFF1A",
          glow: "#5B8CFF",
        },
        border: {
          DEFAULT: "#FFFFFF14",
          strong: "#FFFFFF26",
        },
        success: "#3ECF8E",
      },
      fontFamily: {
        display: ["var(--font-geist)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(46, 111, 255, 0.35)",
        "glow-sm": "0 0 30px -10px rgba(46, 111, 255, 0.3)",
        card: "0 1px 0 0 rgba(255,255,255,0.06) inset",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
