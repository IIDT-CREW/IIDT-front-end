/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '370px',
      sm: '576px',
      md: '852px',
      lg: '968px',
      xl: '1080px',
      '2xl': '1200px',
    },
    extend: {
      colors: {
        // Theme-aware colors (use CSS custom properties)
        theme: {
          bg: 'var(--color-bg)',
          'bg-alt': 'var(--color-bg-alt)',
          text: 'var(--color-text)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-subtle': 'var(--color-text-subtle)',
          'card-border': 'var(--color-card-border)',
          dropdown: 'var(--color-dropdown)',
          input: 'var(--color-input)',
        },
        // Base colors
        primary: {
          DEFAULT: '#ff8f0e',
          bright: '#FFFFFF',
          dark: '#000000',
        },
        secondary: '#7645D9',
        success: '#31D0AA',
        warning: '#FFB237',
        error: '#F3213B',
        failure: '#ED4B9E',
        // Grayscale
        grayscale: {
          0: '#FFFFFF',
          1: '#ECEEF0',
          2: '#E8E9EB',
          4: '#D4D4D4',
          5: '#A4A2A3',
          6: '#2E3237',
          7: '#000000',
        },
        // Light mode colors
        light: {
          bg: '#FFFFFF',
          'bg-disabled': '#E9EAEB',
          'bg-alt': '#FFFFFF',
          'bg-alt2': 'rgba(255, 255, 255, 0.7)',
          'card-border': '#E7E3EB',
          contrast: '#191326',
          dropdown: '#F6F6F6',
          'dropdown-deep': '#EEEEEE',
          input: '#ffffff',
          'input-secondary': '#d7caec',
          tertiary: '#EFF4F5',
          text: '#000000',
          'text-secondary': '#2E3237',
          'text-disabled': '#BDC2C4',
          'text-subtle': '#7c7c7c',
        },
        // Dark mode colors
        dark: {
          bg: '#000000',
          'bg-disabled': '#3c3742',
          'bg-alt': '#000000',
          'bg-alt2': 'rgba(39, 38, 44, 0.7)',
          'card-border': '#383241',
          contrast: '#FFFFFF',
          dropdown: '#1E1D20',
          'dropdown-deep': '#100C18',
          input: '#ffff',
          'input-secondary': '#262130',
          tertiary: '#353547',
          text: '#FFFFFF',
          'text-secondary': '#abb2bf',
          'text-disabled': '#666171',
          'text-subtle': '#595959',
        },
      },
      spacing: {
        // Match styled-system spacing array [0, 4, 8, 16, 24, 32, 48, 64]
        // Tailwind already has similar values, but adding explicit ones
        18: '4.5rem', // 72px
        22: '5.5rem', // 88px
      },
      borderRadius: {
        small: '4px',
        DEFAULT: '16px',
        card: '12px',
      },
      boxShadow: {
        level1: '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
        active: '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
        success: '0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)',
        warning: '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
        focus: '0px 0px 0px 1px #7645D9, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)',
        inset: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)',
        tooltip: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)',
      },
      zIndex: {
        ribbon: '9',
        dropdown: '10',
        modal: '100',
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}
