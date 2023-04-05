// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
	...config,
	styles: {
		global: {
			body: {
				position: 'relative',
				bg: 'black',
				color: 'white',
				scrollBehavior: 'smooth',
				overflowX: 'hidden',
			},
		},
	},
	colors: {
		neon: {
			blue: '#4d4dff',
			shadeBlue: '#7669ff',
			magenta: '#ea00ff',
			shadeMagenta: '#c700de',
		},
		accent: {
			lemon: '#ffff4d',
			green: '#4dffa6',
			grey: '#3e4756',
			shadeGrey: '#5f6878',
		},
	},
});

export default theme;
