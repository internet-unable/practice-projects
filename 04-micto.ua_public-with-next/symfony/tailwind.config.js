/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{js,jsx,ts,tsx}", // Maybe checks other js files, remove .js or add /react folder to path
  ],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      screens: {
        desktop: "991px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        intermedium: ["Inter Medium", "sans-serif"],
        ubuntumedium: ["Ubuntu Medium", "sans-serif"],
        interbold: ["Inter Bold", "sans-serif"],
        ubuntubold: ["Ubuntu Bold", "sans-serif"],
      },
      boxShadow: {
        cabinet: "0 4px 4px rgba(0, 0, 0, 0.04)",
        "cabinet-desktop": "0 4px 4.9px 0 rgba(0, 0, 0, 0.01)",
        "cabinet-hover": "0 4px 4px 0 rgba(0, 0, 0, 0.17)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "`var(--radius)`",
        md: "`calc(var(--radius) - 2px)`",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-in-out",
        "slide-out": "slide-out 0.3s ease-in-out",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".fontRegular": {
          "@apply font-inter text-sm font-normal leading-5": {},
        },

        ".fontRegular2": {
          "@apply font-inter text-base font-normal leading-6": {},
        },

        ".fontRegular2Bold": {
          "@apply font-bold text-base leading-6": {},
        },

        ".fontMediumRegular": {
          "@apply font-inter text-lg font-normal leading-7": {},
        },

        ".fontMedium": {
          "@apply font-intermedium font-medium text-[16px] leading-7": {},
        },

        ".fontMediumBold": {
          "@apply font-bold text-lg leading-7": {},
        },

        ".fontHeaderBold": {
          "@apply font-bold text-3xl leading-tight": {},
        },

        ".fontHeaderBold2": {
          "@apply font-bold text-3xl leading-tight": {},
        },

        ".fontHeaderRegular": {
          "@apply font-inter text-3xl font-normal leading-tight": {},
        },

        ".fontHeadingBold": {
          "@apply font-bold text-5xl leading-tight": {},
        },

        ".fontH4Bold": {
          "@apply font-bold text-2xl leading-tight": {},
        },

        ".fontHeaderBoldInter": {
          "@apply font-bold text-4xl leading-tight": {},
        },

        ".fontTitle": {
          "@apply font-ubuntu text-xl font-normal leading-8": {},
        },

        ".fontTitleBold": {
          "@apply font-ubuntubold font-bold text-xl leading-8": {},
        },

        ".fontUbuntu20Bold": {
          "@apply font-ubuntubold font-bold text-lg leading-6": {},
        },

        ".fontUbuntu25Bold": {
          "@apply font-ubuntubold font-bold text-[25px] leading-8": {},
        },

        ".fontUbuntu30Bold": {
          "@apply font-ubuntubold font-bold text-3xl leading-10": {},
        },

        ".fontUbuntu20": {
          "@apply font-ubuntu text-lg leading-6": {},
        },

        ".fontUbuntuMedium": {
          "@apply font-ubuntumedium font-medium text-xl leading-[26px]": {},
        },

        ".fontInterTitle": {
          "@apply font-inter text-xl font-normal leading-8": {},
        },

        ".fontInter56Bold": {
          "@apply font-bold text-5xl leading-tight": {},
        },

        ".fontInter45Bold": {
          "@apply font-interbold font-bold text-[45px] leading-[54px]": {},
        },

        ".fontUbuntu45Bold": {
          "@apply font-ubuntubold font-bold text-[45px] leading-[54px]": {},
        },
      });
    },
  ],
};
