import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-bg': '#f8fafc',
        'lavender-light': '#f3e8ff',
        'ice-blue': '#e0f2fe',
        'mint-light': '#e6fffa',
        'cool-gray': '#f1f5f9',
        'slate-dark': '#0f172a',
        // Dark theme specific soft futuristic palette
        'dark-bg': '#0a0d14',
        'dark-card': '#111625',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
