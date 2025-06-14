const config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/stories/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				current: 'currentColor',
				transparent: 'transparent',
				white: '#FFFFFF',
				black: '#1C2434',
				red: '#FB5454',
				'black-2': '#010101',
				body: '#64748B',
				bodydark: '#AEB7C0',
				bodydark1: '#DEE4EE',
				bodydark2: '#8A99AF',
				primary: {
					DEFAULT: '#4CAF50',       // Green (health)
					dark: '#388E3C',
					light: '#C8E6C9',
				},
				secondary: {
					DEFAULT: '#2196F3',       // Blue (trust)
					dark: '#1565C0',
					light: '#BBDEFB',
				},
				accent: {
					orange: '#FFA726',        // Orange (energy)
					red: '#F44336',           // Red (alerts, limits)
				},
				neutral: {
					white: '#FFFFFF',
					light: '#F5F5F5',
					gray: '#9E9E9E',
					dark: '#212121',
				},
				success: '#66BB6A',         // Optional success state
				warning: '#FFB300',         // Optional warning state
				error: '#E53935',           // Optional error state
				info: '#29B6F6',            // Optional info state
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontSize: {
				'title-xxl': [
					'72px',
					'90px'
				],
				'title-xl': [
					'60px',
					'72px'
				],
				'title-xl2': [
					'33px',
					'45px'
				],
				'title-lg': [
					'48px',
					'60px'
				],
				'title-md': [
					'36px',
					'44px'
				],
				'title-sm': [
					'30px',
					'38px'
				],
				'title-xs': [
					'30px',
					'38px'
				],
				'title-xsm': [
					'24px',
					'32px'
				],
				'text-xxl': [
					'24px',
					'32px'
				],
				'text-xl': [
					'20px',
					'30px'
				],
				'text-lg': [
					'18px',
					'28px'
				],
				'text-md': [
					'16px',
					'24px'
				],
				'text-sm': [
					'14px',
					'20px'
				],
				'text-xs': [
					'12px',
					'18px'
				]
			},
			fontFamily: {
				Montserrat: [
					'Montserrat',
					'sans-serif'
				]
			},
			spacing: {
				'11': '2.75rem',
				'13': '3.25rem',
				'14': '3.5rem',
				'15': '3.75rem',
				'16': '4rem',
				'17': '4.25rem',
				'18': '4.5rem',
				'19': '4.75rem',
				'21': '5.25rem',
				'22': '5.5rem',
				'25': '6.25rem',
				'26': '6.5rem',
				'27': '6.75rem',
				'29': '7.25rem',
				'30': '7.5rem',
				'31': '7.75rem',
				'33': '8.25rem',
				'34': '8.5rem',
				'35': '8.75rem',
				'39': '9.75rem',
				'40': '10rem',
				'44': '11rem',
				'45': '11.25rem',
				'46': '11.5rem',
				'49': '12.25rem',
				'50': '12.5rem',
				'52': '13rem',
				'54': '13.5rem',
				'55': '13.75rem',
				'59': '14.75rem',
				'60': '15rem',
				'65': '16.25rem',
				'67': '16.75rem',
				'70': '17.5rem',
				'73': '18.25rem',
				'75': '18.75rem',
				'90': '22.5rem',
				'94': '23.5rem',
				'95': '23.75rem',
				'100': '25rem',
				'115': '28.75rem',
				'125': '31.25rem',
				'150': '37.5rem',
				'180': '45rem',
				'203': '50.75rem',
				'230': '57.5rem',
				'4.5': '1.125rem',
				'5.5': '1.375rem',
				'6.5': '1.625rem',
				'7.5': '1.875rem',
				'8.5': '2.125rem',
				'9.5': '2.375rem',
				'10.5': '2.625rem',
				'11.5': '2.875rem',
				'12.5': '3.125rem',
				'13.5': '3.375rem',
				'14.5': '3.625rem',
				'15.5': '3.875rem',
				'16.5': '4.125rem',
				'17.5': '4.375rem',
				'18.5': '4.625rem',
				'19.5': '4.875rem',
				'21.5': '5.375rem',
				'22.5': '5.625rem',
				'24.5': '6.125rem',
				'25.5': '6.375rem',
				'27.5': '6.875rem',
				'29.5': '7.375rem',
				'32.5': '8.125rem',
				'34.5': '8.625rem',
				'36.5': '9.125rem',
				'37.5': '9.375rem',
				'39.5': '9.875rem',
				'42.5': '10.625rem',
				'47.5': '11.875rem',
				'52.5': '13.125rem',
				'54.5': '13.625rem',
				'55.5': '13.875rem',
				'62.5': '15.625rem',
				'67.5': '16.875rem',
				'72.5': '18.125rem',
				'132.5': '33.125rem',
				'171.5': '42.875rem',
				'187.5': '46.875rem',
				'242.5': '60.625rem'
			},
			maxWidth: {
				'3': '0.75rem',
				'4': '1rem',
				'7': '1.75rem',
				'9': '2.25rem',
				'10': '2.5rem',
				'11': '2.75rem',
				'13': '3.25rem',
				'14': '3.5rem',
				'15': '3.75rem',
				'16': '4rem',
				'25': '6.25rem',
				'30': '7.5rem',
				'34': '8.5rem',
				'35': '8.75rem',
				'40': '10rem',
				'44': '11rem',
				'45': '11.25rem',
				'60': '15rem',
				'70': '17.5rem',
				'90': '22.5rem',
				'94': '23.5rem',
				'125': '31.25rem',
				'150': '37.5rem',
				'180': '45rem',
				'203': '50.75rem',
				'230': '57.5rem',
				'270': '67.5rem',
				'280': '70rem',
				'2.5': '0.625rem',
				'10.5': '2.625rem',
				'22.5': '5.625rem',
				'42.5': '10.625rem',
				'132.5': '33.125rem',
				'142.5': '35.625rem',
				'242.5': '60.625rem',
				'292.5': '73.125rem'
			},
			maxHeight: {
				'35': '8.75rem',
				'70': '17.5rem',
				'90': '22.5rem',
				'300': '18.75rem',
				'550': '34.375rem'
			},
			minWidth: {
				'75': '18.75rem',
				'22.5': '5.625rem',
				'42.5': '10.625rem',
				'47.5': '11.875rem'
			},
			zIndex: {
				'1': '1',
				'9': '9',
				'99': '99',
				'999': '999',
				'9999': '9999',
				'99999': '99999',
				'999999': '999999'
			},
			opacity: {
				'65': '.65'
			},
			aspectRatio: {
				'4/3': '4 / 3',
				'21/9': '21 / 9'
			},
			backgroundImage: {
				'login-pattern': ''
			},
			backgroundSize: {
				auto: 'auto',
				cover: 'cover',
				contain: 'contain',
				'50%': '50%',
				'100%': '100%'
			},
			transitionProperty: {
				width: 'width',
				stroke: 'stroke'
			},
			borderWidth: {
				'6': '6px',
				'10': '10px',
				'12': '12px'
			},
			boxShadow: {
				'1': '0px 1px 3px rgba(0, 0, 0, 0.08)',
				'2': '0px 1px 4px rgba(0, 0, 0, 0.12)',
				'3': '0px 1px 5px rgba(0, 0, 0, 0.14)',
				'4': '0px 4px 10px rgba(0, 0, 0, 0.12)',
				'5': '0px 1px 1px rgba(0, 0, 0, 0.15)',
				'6': '0px 3px 15px rgba(0, 0, 0, 0.1)',
				'7': '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
				'8': '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
				'9': '0px 2px 3px rgba(183, 183, 183, 0.5)',
				'10': '0px 1px 2px 0px rgba(0, 0, 0, 0.10)',
				'11': '0px 1px 3px 0px rgba(166, 175, 195, 0.40)',
				'12': '0px 0.5px 3px 0px rgba(0, 0, 0, 0.18)',
				'13': '0px 1px 3px 0px rgba(0, 0, 0, 0.08)',
				'14': '0px 2px 3px 0px rgba(0, 0, 0, 0.10)',
				default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
				card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
				'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
				switcher: '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
				'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)'
			},
			dropShadow: {
				'1': '0px 1px 0px #E2E8F0',
				'2': '0px 1px 4px rgba(0, 0, 0, 0.12)',
				'3': '0px 0px 4px rgba(0, 0, 0, 0.15)',
				'4': '0px 0px 2px rgba(0, 0, 0, 0.2)',
				'5': '0px 1px 5px rgba(0, 0, 0, 0.2)'
			},
			keyframes: {
				linspin: {
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				easespin: {
					'12.5%': {
						transform: 'rotate(135deg)'
					},
					'25%': {
						transform: 'rotate(270deg)'
					},
					'37.5%': {
						transform: 'rotate(405deg)'
					},
					'50%': {
						transform: 'rotate(540deg)'
					},
					'62.5%': {
						transform: 'rotate(675deg)'
					},
					'75%': {
						transform: 'rotate(810deg)'
					},
					'87.5%': {
						transform: 'rotate(945deg)'
					},
					'100%': {
						transform: 'rotate(1080deg)'
					}
				},
				'left-spin': {
					'0%': {
						transform: 'rotate(130deg)'
					},
					'50%': {
						transform: 'rotate(-5deg)'
					},
					'100%': {
						transform: 'rotate(130deg)'
					}
				},
				'right-spin': {
					'0%': {
						transform: 'rotate(-130deg)'
					},
					'50%': {
						transform: 'rotate(5deg)'
					},
					'100%': {
						transform: 'rotate(-130deg)'
					}
				},
				rotating: {
					'0%, 100%': {
						transform: 'rotate(360deg)'
					},
					'50%': {
						transform: 'rotate(0deg)'
					}
				},
				topbottom: {
					'0%, 100%': {
						transform: 'tranprimary3d(0, -100%, 0)'
					},
					'50%': {
						transform: 'tranprimary3d(0, 0, 0)'
					}
				},
				bottomtop: {
					'0%, 100%': {
						transform: 'tranprimary3d(0, 0, 0)'
					},
					'50%': {
						transform: 'tranprimary3d(0, -100%, 0)'
					}
				},
				line: {
					'0%, 100%': {
						transform: 'tranprimaryY(0)'
					},
					'50%': {
						transform: 'tranprimaryY(100%)'
					}
				},
				'line-revert': {
					'0%, 100%': {
						transform: 'tranprimaryY(100%)'
					},
					'50%': {
						transform: 'tranprimaryY(0)'
					}
				}
			},
			animation: {
				linspin: 'linspin 1568.2353ms linear infinite',
				easespin: 'easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
				'left-spin': 'left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
				'right-spin': 'right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
				'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
				rotating: 'rotating 30s linear infinite',
				topbottom: 'topbottom 60s infinite alternate linear',
				bottomtop: 'bottomtop 60s infinite alternate linear',
				'spin-1.5': 'spin 1.5s linear infinite',
				'spin-2': 'spin 2s linear infinite',
				'spin-3': 'spin 3s linear infinite',
				line1: 'line 10s infinite linear',
				line2: 'line-revert 8s infinite linear',
				line3: 'line 7s infinite linear'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
