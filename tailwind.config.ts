import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════
      // COLOR SYSTEM — Warm wood-inspired palette
      // ═══════════════════════════════════════════════════════════════════
      colors: {
        // Background layers (light → dark progression)
        bg: {
          DEFAULT: "hsl(var(--bg))",
          alt: "hsl(var(--bg-alt))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          hover: "hsl(var(--card-hover))",
        },

        // Text hierarchy
        text: {
          DEFAULT: "hsl(var(--text))",
          muted: "hsl(var(--text-muted))",
          subtle: "hsl(var(--text-subtle))",
          inverse: "hsl(var(--text-inverse))",
        },

        // Borders
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
          subtle: "hsl(var(--border-subtle))",
        },

        // Brand colors — warm amber/caoba tones
        brand: {
          DEFAULT: "hsl(var(--brand))",
          hover: "hsl(var(--brand-hover))",
          active: "hsl(var(--brand-active))",
          muted: "hsl(var(--brand-muted))",
          subtle: "hsl(var(--brand-subtle))",
        },

        // Secondary brand — deep wood brown
        "brand-2": {
          DEFAULT: "hsl(var(--brand-2))",
          hover: "hsl(var(--brand-2-hover))",
          muted: "hsl(var(--brand-2-muted))",
        },

        // Semantic colors
        success: {
          DEFAULT: "hsl(var(--success))",
          muted: "hsl(var(--success-muted))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          muted: "hsl(var(--warning-muted))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          muted: "hsl(var(--danger-muted))",
        },

        // WhatsApp
        whatsapp: {
          DEFAULT: "hsl(var(--whatsapp))",
          hover: "hsl(var(--whatsapp-hover))",
        },

        // Focus ring
        focus: "hsl(var(--focus-ring))",
      },

      // ═══════════════════════════════════════════════════════════════════
      // TYPOGRAPHY — Elegant serif + clean sans
      // ═══════════════════════════════════════════════════════════════════
      fontFamily: {
        serif: ["var(--font-heading)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-body)", "Source Sans 3", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Display — Hero headlines
        display: [
          "clamp(2.5rem, 5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        // Heading scale
        h1: [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        h2: [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.25rem, 2vw, 1.5rem)",
          { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" },
        ],
        h4: [
          "clamp(1.125rem, 1.5vw, 1.25rem)",
          { lineHeight: "1.4", fontWeight: "600" },
        ],
        // Body text
        body: ["1rem", { lineHeight: "1.6" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        // Small text
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        // Overline (labels, badges)
        overline: [
          "0.6875rem",
          { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "600" },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════
      // SPACING — Vertical rhythm system
      // ═══════════════════════════════════════════════════════════════════
      spacing: {
        // Section spacing
        "section-y": "clamp(4rem, 10vw, 8rem)",
        "section-y-sm": "clamp(2.5rem, 6vw, 4rem)",
        // Container padding
        "container-x": "clamp(1rem, 5vw, 2rem)",
        // Component gaps
        "gap-xs": "0.5rem",
        "gap-sm": "0.75rem",
        "gap-md": "1rem",
        "gap-lg": "1.5rem",
        "gap-xl": "2rem",
        "gap-2xl": "3rem",
        // Touch targets
        touch: "3rem", // 48px minimum
      },

      // ═══════════════════════════════════════════════════════════════════
      // LAYOUT
      // ═══════════════════════════════════════════════════════════════════
      maxWidth: {
        container: "80rem", // 1280px
        content: "65ch",
        narrow: "42rem",
      },

      // ═══════════════════════════════════════════════════════════════════
      // BORDERS & RADIUS
      // ═══════════════════════════════════════════════════════════════════
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },

      // ═══════════════════════════════════════════════════════════════════
      // SHADOWS — Subtle, warm-tinted
      // ═══════════════════════════════════════════════════════════════════
      boxShadow: {
        // Elevation system
        "elevation-1": "0 1px 2px 0 hsl(var(--shadow-color) / 0.05)",
        "elevation-2":
          "0 1px 3px 0 hsl(var(--shadow-color) / 0.1), 0 1px 2px -1px hsl(var(--shadow-color) / 0.1)",
        "elevation-3":
          "0 4px 6px -1px hsl(var(--shadow-color) / 0.1), 0 2px 4px -2px hsl(var(--shadow-color) / 0.1)",
        "elevation-4":
          "0 10px 15px -3px hsl(var(--shadow-color) / 0.1), 0 4px 6px -4px hsl(var(--shadow-color) / 0.1)",
        "elevation-5":
          "0 20px 25px -5px hsl(var(--shadow-color) / 0.1), 0 8px 10px -6px hsl(var(--shadow-color) / 0.1)",
        // Interactive states
        "card-hover":
          "0 8px 30px -4px hsl(var(--shadow-color) / 0.12), 0 4px 10px -2px hsl(var(--shadow-color) / 0.08)",
        // Inner shadow for inputs
        "inner-sm": "inset 0 1px 2px 0 hsl(var(--shadow-color) / 0.05)",
      },

      // ═══════════════════════════════════════════════════════════════════
      // TRANSITIONS — Apple-like micro-interactions
      // ═══════════════════════════════════════════════════════════════════
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
        slower: "400ms",
      },

      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },

      // ═══════════════════════════════════════════════════════════════════
      // ANIMATIONS — Entrance utilities
      // ═══════════════════════════════════════════════════════════════════
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
        "fade-up": "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-down": "fade-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right":
          "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left":
          "slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
