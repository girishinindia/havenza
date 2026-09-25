import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FCF8F3',
        pearl: '#F8EDE2', // high-contrast text on dark cocoa
        cream: '#F5EAE0',
        blush: { 50: '#FBF2EE', 100: '#F6E3DC', 200: '#EED0C6', 300: '#E3B7A9' },
        rose: { 200: '#EDD2BE', 300: '#E2BE9F', 400: '#D3A482', 500: '#C08A66', 600: '#A87350', 700: '#8A5A3B' },
        cocoa: { 300: '#A58877', 400: '#8C6A58', 500: '#6E4E3D', 600: '#553726', 700: '#432A1D', 800: '#2F1D14', 900: '#22150E' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1320px' },
    },
  },
  plugins: [],
};

export default config;
