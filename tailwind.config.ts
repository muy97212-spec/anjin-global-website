import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-surface)',
        foreground: 'var(--color-neutral-900)',
        primary: {
          DEFAULT: 'var(--color-brand-primary)',
          foreground: 'var(--color-surface)',
        },
        secondary: {
          DEFAULT: 'var(--color-brand-secondary)',
          foreground: 'var(--color-surface)',
        },
        accent: {
          DEFAULT: 'var(--color-brand-accent)',
          foreground: 'var(--color-neutral-900)',
        },
        muted: {
          DEFAULT: 'var(--color-surface-alt)',
          foreground: 'var(--color-neutral-700)',
        },
        border: 'var(--color-neutral-400)',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        lg: '8px',
      },
      spacing: {
        4.5: '18px',
      },
    },
  },
  plugins: [],
}

export default config
