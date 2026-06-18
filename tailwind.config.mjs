/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-elev': 'rgb(var(--bg-elev) / <alpha-value>)',
        'bg-subtle': 'rgb(var(--bg-subtle) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--fg-muted) / <alpha-value>)',
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          deep: 'rgb(var(--gold-deep) / <alpha-value>)',
          soft: 'rgb(var(--gold-soft) / <alpha-value>)',
        },
        line: 'rgb(var(--gold) / 0.15)',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.25rem', md: '2rem' },
        screens: { '2xl': '1400px' },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-quart': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 40s linear infinite reverse',
        aurora: 'aurora 20s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-4%, 4%) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgb(var(--gold) / 0.45)',
        'glow-sm': '0 0 20px -6px rgb(var(--gold) / 0.35)',
        'glow-lg': '0 0 60px -10px rgb(var(--gold) / 0.55)',
        'glow-border': '0 0 0 1px rgb(var(--gold) / 0.25), 0 0 20px -6px rgb(var(--gold) / 0.25)',
        'card': '0 4px 24px -4px rgb(0 0 0 / 0.6)',
        'card-hover': '0 8px 32px -4px rgb(0 0 0 / 0.7), 0 0 20px -8px rgb(var(--gold) / 0.25)',
      },
    },
  },
  plugins: [],
};
