// import '@/styles/globals.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CartContextProvider from '@/context/cartContext';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { SkipNavLink } from '@chakra-ui/skip-nav';
import type { AppProps } from 'next/app';
import theme from './theme';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<CSSReset />
			<SkipNavLink zIndex="99999">Skip to content</SkipNavLink>
			<SessionProvider session={pageProps.session}>
				<CartContextProvider>
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</CartContextProvider>
			</SessionProvider>
		</ChakraProvider>
	);
}
