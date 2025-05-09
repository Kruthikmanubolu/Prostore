import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Ensure this is set according to your folder structure
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // If you're using Next.js or a similar framework, include this
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
