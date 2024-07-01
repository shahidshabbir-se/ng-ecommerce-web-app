import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontSize: {
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '24px'
    },
    fontFamily: {
      regular: ['NG-Grotesque-Regular', 'sans-serif'],
      bold: ['NG-Grotesque-Bold', 'sans-serif'],
      extraBold: ['NG-Grotesque-ExtraBold', 'sans-serif'],
      chronicle: ['Chronicle', 'serif']
    },
    extend: {
      colors: {
        'gray-100': '#f8f9fc',
        'gray-200': '#f1f3f9',
        'gray-300': '#dee3ed',
        'gray-400': '#c2c9d6',
        'gray-500': '#8f96a3',
        'gray-600': '#5e636e',
        'gray-700': '#2f3237',
        'gray-800': '#1d1e20',
        'gray-900': '#111213',
        'bar-100': '#f5f5f5',
        black: '#000000',
        'red-400':'#EF4444',
        'red-500': '#e00034',
        'pink-500': '#e12369',
        'slate-500': '#737373'
      },
      boxShadow: {
        shadow:
          '0 2px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'shadow-md':
          '0 0 8px -2px rgba(0, 0, 0, 0.1), 0 6px 20px -3px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: []
}
export default config
