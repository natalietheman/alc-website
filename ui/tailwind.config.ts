import type { Config } from 'tailwindcss';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

const themeLight = (colors: DefaultColors) => ({
  50: '#fcfcf9',
  100: '#F0F7F6',
  200: '#27A28B',
});

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      borderColor: ({ colors }) => {
        return {
          light: themeLight(colors),
          // dark: themeDark(colors),
        };
      },
      colors: ({ colors }) => {
        // const colorsDark = themeDark(colors);
        const colorsLight = themeLight(colors);

        return {
          light: {
            primary: colorsLight[50],
            secondary: colorsLight[100],
            tertiary: colorsLight[200],
            ...colorsLight,
          },
        };
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
};

export default config;
