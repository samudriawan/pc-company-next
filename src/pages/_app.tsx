// import '@/styles/globals.css'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<CSSReset />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
