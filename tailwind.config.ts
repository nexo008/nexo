import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      logo: ['Space Grotesk', 'sans-serif'],
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        "nexo-darker": "#050505",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'glow': '0 0 25px rgba(30, 174, 219, 0.2), 0 0 50px rgba(30, 174, 219, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        'glow-primary': '0 0 20px rgba(30, 174, 219, 0.35), 0 0 40px rgba(30, 174, 219, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        'glow-secondary': '0 0 20px rgba(116, 74, 231, 0.35), 0 0 40px rgba(116, 74, 231, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        'glow-accent': '0 0 20px rgba(57, 211, 83, 0.35), 0 0 40px rgba(57, 211, 83, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        'lg': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'hero-text': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.2)'
          }
        },
        'bounce-smooth': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(15px)'
          }
        },
        'logo-reveal': {
          '0%': {
            transform: 'translateY(-20px)',
            opacity: '0',
            letterSpacing: '0.4em'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
            letterSpacing: '0.2em'
          }
        },
        'logo-glow': {
          '0%, 100%': {
            'text-shadow': '0 0 4px rgba(30, 174, 219, 0)',
          },
          '50%': {
            'text-shadow': '0 0 20px rgba(30, 174, 219, 0.5)',
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            transform: 'translateY(-20px) scale(1.05)',
          }
        },
        'float-delayed': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            transform: 'translateY(-15px) scale(1.03)',
          }
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'hero-text': 'hero-text 1s ease-out forwards',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'bounce-smooth': 'bounce-smooth 3s ease-in-out infinite',
        'logo-reveal': 'logo-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'logo-glow': 'logo-glow 3s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float-delayed 9s ease-in-out infinite 1s',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
