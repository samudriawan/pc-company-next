// import '@/styles/globals.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CartContextProvider from '@/context/cartContext';
import { ChakraProvider, CSSReset, Progress } from '@chakra-ui/react';
import { SkipNavLink } from '@chakra-ui/skip-nav';
import type { AppProps } from 'next/app';
import theme from './theme';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/swrFetch';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [loadingBar, setLoadingBar] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const showProgress = () => setLoadingBar(true);
		const hideProgress = () => setLoadingBar(false);

		router.events.on('routeChangeStart', showProgress);
		router.events.on('routeChangeComplete', hideProgress);

		return () => {
			router.events.off('routeChangeStart', showProgress);
			router.events.off('routeChangeComplete', hideProgress);
		};
	}, []);

	return (
		<ChakraProvider theme={theme}>
			<CSSReset />
			<SkipNavLink zIndex="99999">Skip to content</SkipNavLink>
			<SessionProvider session={pageProps.session}>
				<CartContextProvider>
					<SWRConfig
						value={{
							fetcher: fetcher,
						}}
					>
						{loadingBar && (
							<Progress
								size="xs"
								isIndeterminate
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									zIndex: 9999,
								}}
							/>
						)}
						<Navbar />
						<Component {...pageProps} />
						<Footer />
					</SWRConfig>
				</CartContextProvider>
			</SessionProvider>
		</ChakraProvider>
	);
}
