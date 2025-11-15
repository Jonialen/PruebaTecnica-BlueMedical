// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Paleta principal
        brand: {
          50: '#FFF8F3',
          100: '#FFF0E6',
          200: '#F2CEA2',
          300: '#F2A81D',
          400: '#F2921D',
          500: '#F28322',
          600: '#D96E1A',
          700: '#BF5E15',
          800: '#A04E11',
          900: '#7A3B0D',
        },
        
        // Backgrounds
        background: {
          light: '#F2F2F2',
          dark: '#1A1A1A',
        },
        
        surface: {
          light: '#FFFFFF',
          dark: '#262626',
        },
        
        // Estados de tareas
        status: {
          pending: {
            light: '#F2A81D',
            dark: '#F2921D',
          },
          progress: {
            light: '#3B82F6',
            dark: '#60A5FA',
          },
          completed: {
            light: '#10B981',
            dark: '#34D399',
          },
        },
        
        // Textos
        text: {
          primary: {
            light: '#1F2937',
            dark: '#F9FAFB',
          },
          secondary: {
            light: '#6B7280',
            dark: '#D1D5DB',
          },
          tertiary: {
            light: '#9CA3AF',
            dark: '#9CA3AF',
          },
        },
        
        // Bordes
        border: {
          light: '#E5E7EB',
          dark: '#374151',
        },
      },
      
      spacing: {
        '11': '2.75rem',
      },
      
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'hard': '0 8px 24px rgba(0, 0, 0, 0.16)',
      },
    },
  },

  plugins: [],
  
} satisfies Config;