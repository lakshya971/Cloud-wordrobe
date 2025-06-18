import type { Config } from 'tailwindcss';

const config: Config = {
  // Add safelist to ensure dynamic classes are not purged  safelist: [
    // Common color variants
    'bg-white',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'text-gray-900',
    'border-gray-200',
    'border-gray-300',
    'bg-gray-100',
    'bg-gray-50',
    'rounded-lg',
    'rounded-md',
    'shadow-sm',
    'shadow-md',
    'shadow-lg',
    'transition-all',
    'duration-200',
    'duration-300',
    'hover:shadow-md',
    'hover:shadow-lg',
    'hover:bg-gray-50',
    'hover:bg-gray-100',
    'hover:border-gray-300',
    
    // Background gradients
    'bg-gradient-to-br',
    'bg-gradient-to-r',
    'from-white',
    'to-gray-50',
    'from-gray-50',
    'to-white',
    
    // Dashboard specific classes
    'dashboard-container',
    'dashboard-header',
    'dashboard-metric',
    'metric-icon',
    'metric-text-primary',
    'metric-text-secondary',
    'metric-text-small',
    'dashboard-card',
    'dashboard-card-highlight',
    'dashboard-card-gradient',
    'dashboard-card-colored',
    'card-header',
    'card-content',
    'card-title',
    'card-icon',
    'activity-item',
    'activity-item-highlight',
    'status-indicator',
    'dashboard-button',
    'dashboard-button-icon',
    'dashboard-tabs',
    'dashboard-tab',
    'dashboard-badge',
    'badge-primary',
    'badge-success',
    'badge-warning',
    'badge-danger',
    'progress-bar',
    'progress-bar-fill',
    
    // State variants
    'data-[state=active]:bg-white',
    'data-[state=active]:shadow-sm',
    'data-[state=active]:text-gray-900',
  ],
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        'wasted-vindey': ['Wasted Vindey', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Custom Cloud Wardrobe colors
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;