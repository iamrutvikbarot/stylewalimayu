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
        background: "#FAFAF8",
        foreground: "#1F2937",
        terracotta: {
          50: "#FDF6F3",
          100: "#FBE9E4",
          200: "#F7D3C9",
          300: "#EFB1A1",
          400: "#E68972",
          500: "#E07A5F",
          600: "#C85A3F",
          700: "#A8442D",
          800: "#8B3724",
          900: "#743021",
        },
        warm: {
          cream: "#FAFAF8",
          card: "#FFFFFF",
          border: "#EAE8E3",
          borderLight: "#F3F4F6",
          accent: "#D97706",
          charcoal: "#1F2937",
          muted: "#6B7280",
          subtle: "#9CA3AF",
        },
        store: {
          myntra: "#FF3F6C",
          ajio: "#2C4152",
          amazon: "#FF9900",
          meesho: "#F43397",
          flipkart: "#2874F0",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-plus-jakarta)",
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)",
        card: "0 2px 8px -2px rgba(31, 41, 55, 0.06), 0 1px 4px -1px rgba(31, 41, 55, 0.03)",
        cardHover: "0 12px 24px -6px rgba(224, 122, 95, 0.12), 0 4px 12px -2px rgba(31, 41, 55, 0.06)",
        glow: "0 0 20px -3px rgba(224, 122, 95, 0.35)",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
