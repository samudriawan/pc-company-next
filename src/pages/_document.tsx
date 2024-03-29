import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../lib/theme';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<ColorModeScript initialColorMode={theme.styles.global} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
