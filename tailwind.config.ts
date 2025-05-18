import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Ensure this is set according to your folder structure
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // If you're using Next.js or a similar framework, include this
  ],
  theme: {
    extend: {},
    screens: {
                x3s: { max: '375px' },
                xxs: { max: '616px' },
                xs: { max: '774px' },
                sm: { max: '874.99px' },
                md: { min: '875px', max: '1439.98px' },
                lg: { min: '1439.99px' },
            },
  },
  plugins: [],
};

export default config;
