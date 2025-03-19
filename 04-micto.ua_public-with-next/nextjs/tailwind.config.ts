import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				desktop: '991px',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				ubuntu: ['Ubuntu', 'sans-serif'],
				intermedium: ['Inter Medium', 'sans-serif'],
				ubuntumedium: ['Ubuntu Medium', 'sans-serif'],
				interbold: ['Inter Bold', 'sans-serif'],
				ubuntubold: ['Ubuntu Bold', 'sans-serif'],
			},
			boxShadow: {
				cabinet: '0 4px 4px rgba(0, 0, 0, 0.04)',
				'cabinet-desktop': '0 4px 4.9px 0 rgba(0, 0, 0, 0.01)',
				'cabinet-hover': '0 4px 4px 0 rgba(0, 0, 0, 0.17)',
				auth: '0 3px 12.8px rgba(0, 0, 0, 0.02)',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				black: 'var(--black)',
				background: 'var(--background)',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)',
				},
				main: {
					DEFAULT: 'var(--main)',
					foreground: 'var(--main)',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
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
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-in-out',
				'slide-out': 'slide-out 0.3s ease-in-out',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
			fontSize: {
				xs: [
					'0.75rem',
					{
						lineHeight: '18px',
						letterSpacing: '-0.01em',
					},
				],
				base: [
					'1rem',
					{
						lineHeight: '24px',
						letterSpacing: '-0.01em',
					},
				],
				lg: [
					'1.125rem',
					{
						lineHeight: '27px',
						letterSpacing: '-0.01em',
					},
				],
				xl: [
					'1.25rem',
					{
						lineHeight: '26px',
						letterSpacing: '-0.01em',
					},
				],
				'2xl': [
					'25px',
					{
						lineHeight: '32.5px',
						letterSpacing: '-0.01em',
					},
				],
				'3xl': [
					'1.875rem',
					{
						lineHeight: '39px',
						letterSpacing: '-0.02em',
					},
				],
				'5xl': [
					'2.8125rem',
					{
						lineHeight: '54px',
					},
				],
				'6xl': [
					'3.5rem',
					{
						lineHeight: '67.2px',
					},
				],
			},
		},
	},
	darkMode: ['class', 'class'],
	plugins: [
		function ({ addComponents }: PluginAPI) {
			addComponents({
				'.fontInterRegular12': {
					'@apply font-inter text-xs font-normal': {},
				},

				'.fontInterRegular14': {
					'@apply font-inter text-sm font-normal': {},
				},

				'.fontInterRegular16': {
					'@apply font-inter text-base font-normal': {},
				},

				'.fontInterRegular18': {
					'@apply font-inter text-lg font-normal': {},
				},

				'.fontInterRegular20': {
					'@apply font-inter text-xl leading-[30px] font-normal': {},
				},

				'.fontInterMedium16': {
					'@apply font-intermedium font-medium text-base': {},
				},

				'.fontInterMedium18': {
					'@apply font-intermedium font-medium text-lg': {},
				},

				'.fontInterMedium20': {
					'@apply font-intermedium font-medium text-xl': {},
				},

				'.fontInterBold12': {
					'@apply font-interbold font-bold text-xs': {},
				},

				'.fontInterBold16': {
					'@apply font-interbold font-bold text-base': {},
				},

				'.fontInterBold18': {
					'@apply font-interbold font-bold text-lg': {},
				},

				'.fontInterBold20': {
					'@apply font-interbold font-bold text-xl': {},
				},

				'.fontInterBold25': {
					'@apply font-interbold font-bold text-2xl': {},
				},

				'.fontInterBold30': {
					'@apply font-interbold font-bold text-3xl': {},
				},

				'.fontInterBold45': {
					'@apply font-interbold font-bold text-5xl': {},
				},

				'.fontInterBold56': {
					'@apply font-interbold font-bold text-6xl': {},
				},

				'.fontUbuntuRegular20': {
					'@apply font-ubuntu font-normal text-xl': {},
				},

				'.fontUbuntuRegular25': {
					'@apply font-ubuntu font-normal text-2xl': {},
				},

				'.fontUbuntuMedium20': {
					'@apply font-ubuntumedium font-medium text-xl': {},
				},

				'.fontUbuntuBold20': {
					'@apply font-ubuntubold font-bold text-xl': {},
				},

				'.fontUbuntuBold25': {
					'@apply font-ubuntubold font-bold text-2xl': {},
				},

				'.fontUbuntuBold30': {
					'@apply font-ubuntubold font-bold text-3xl': {},
				},
			});
		},
		require('tailwindcss-animate'),
	],
} satisfies Config;
