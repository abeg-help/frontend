import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./lib/hooks/useDragScroll.ts",
	],

	theme: {
		extend: {
			borderWidth: {
				CampaignCardBorderWidth: "0.3px",
			},
			screens: {
				"3xl": "2000px",
			},
			backgroundImage: {
				contours: "url('/assets/images/shared/bg-contours.png')",
				authBg: "url('/assets/images/auth/auth-bg-jar.svg')",
				heroBg: "url('/assets/images/shared/hero-background.svg')",
				dashboardBg: "url('/assets/images/dashboard/dashboardBg.png')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			boxShadow: {
				"auth-layout-shadow": " 0px 2px 32px 0px rgba(0, 0, 0, 0.08)",
				otpInput: "2px 4px 4px 0 rgba(139, 210, 189, 0.1)",
			},

			colors: {
				overlay: "rgba(72, 72, 72, 0.5)",
				placeholder: "#8D8B8B",
				lightGreen: "#D3E5E5",
				unfocused: "#A8CCCC",
				semiWhite: "#E6EAEE",
				inputBorder: "rgba(124, 148, 107, 0.25)",
				headerDivider: "#D4D4D4",
				otpBorder: "rgba(0, 128, 128, 0.5)",

				abeg: {
					primary: "#008080",
					text: "#484848",
					neutral: {
						10: "#101E14",
						20: "#344639",
						30: "#4E5F53",
						40: "#748178",
						50: "#A1AAA4",
						60: "#CDD6D0",
						70: "#E3E8E5",
						80: "#F4F5F5",
					},
					error: {
						10: "#6A0101",
						20: "#FC3131",
						30: "#FEDCDC",
						40: "#FFEBEB",
					},
				},

				// Shadcn colors
				background: "hsl(0 0% 100%)",
				foreground: "hsl(222.2 47.4% 11.2%)",
				popover: "theme(colors.background)",
				primary: "hsl(222.2 47.4% 11.2%)",
				"primary-foreground": "hsl(210 40% 98%)",
				"popover-foreground": "hsl(222.2 47.4% 11.2%)",
				accent: "hsl(210 40% 96.1%)",
				"accent-foreground": "hsl(222.2 47.4% 11.2%)",
				input: "hsl(214.3 31.8% 91.4%)",
				border: "hsl(214.3 31.8% 91.4%)",
				ring: "hsl(215 20.2% 65.1%)",
				muted: "hsl(210 40% 96.1%)",
				"muted-foreground": "hsl(215.4 16.3% 46.9%)",

				// Sonner toast colors
				"success-bg": "hsl(150 100% 6%)",
				"success-text": "hsl(150 100% 90%)",
				"success-border": "hsl(147 100% 12%)",
				"error-bg": "hsl(358 76% 10%)",
				"error-text": "hsl(358 100% 81%)",
				"error-border": "hsl(357 89% 16%)",
			},

			height: {
				"23": "6rem",
				DInputField: "3.25rem",
				MInputField: "3.13rem",
			},
			width: {
				w90: "90%",
			},
			maxWidth: {
				wSignUpForm: "52.9rem",
				wAuthFlow: "32rem",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},

				shake: {
					"0%, 100%": { transform: "translateX(0rem)" },
					"25%": { transform: "translateX(0.6rem)" },
					"75%": { transform: "translateX(-0.6rem)" },
				},
			},

			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shake: "shake 0.2s ease-in-out 0s 3",
			},
		},
	},

	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		plugin(function ({ addUtilities, addVariant, addComponents, theme }) {
			const newUtilities = {
				".hide-scrollbar::-webkit-scrollbar": {
					display: "none",
				},
			};
			addUtilities(newUtilities);

			addVariant("progress-unfilled", ["&::-webkit-progress-bar", "&"]);
			addVariant("progress-filled", [
				"&::-webkit-progress-value",
				"&::-moz-progress-bar",
				"&",
			]);

			addComponents({
				".custom-scrollbar": {
					"&::-webkit-scrollbar": {
						width: "10px",
					},

					"&::-webkit-scrollbar-track": {
						backgroundColor: "hsl(0, 0%, 76%)",
						borderRadius: "10px 10px 0 0",
					},

					"&::-webkit-scrollbar-thumb": {
						backgroundColor: theme("colors.abeg.primary"),
						border: "1px solid hsl(0, 0%, 76%)",
						borderRadius: "10px",
					},
				},
			});
		}),
	],
} satisfies Config;

export default config;
