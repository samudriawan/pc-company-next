import {
	Box,
	Container,
	Grid,
	GridItem,
	Heading,
	Icon,
	Link,
	Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IconType } from 'react-icons';
import { FiUser, FiInfo, FiSearch } from 'react-icons/fi';

type UserDashboardLayoutProps = {
	children: React.ReactNode;
};

type SidebarNavLinkProps = {
	href: string;
	icon: IconType;
	text: string;
};

export default function UserDashboardLayout({
	children,
}: UserDashboardLayoutProps) {
	const router = useRouter();
	console.log(router);

	function SidebarNavLink({ href = '#', icon, text }: SidebarNavLinkProps) {
		return (
			<Link
				as={NextLink}
				href={href}
				display={'flex'}
				mt="1"
				px="3"
				py="2"
				alignItems={'center'}
				gap="4"
				aria-current={router.asPath === href && 'page'}
				borderLeftWidth={4}
				borderLeftColor={'transparent'}
				_hover={{
					bg: 'hsl(240, 30%, 15%)',
					svg: { color: 'neon.shadeBlue' },
				}}
				_activeLink={{ borderColor: 'neon.blue' }}
			>
				<Icon as={icon} boxSize={6} />
				<Text as="span" isTruncated={true}>
					{text}
				</Text>
			</Link>
		);
	}

	return (
		<>
			<Head>
				<title>User | DZ PC Next App</title>
			</Head>
			<main>
				<Container
					as="section"
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					pt="3rem"
					paddingBottom="3rem"
				>
					<Heading as="h1" mb="6">
						Account
					</Heading>
					<Box shadow={'lg'} overflow="hidden">
						<Grid
							w="100%"
							templateColumns={{ base: '1fr', md: 'repeat(12,minmax(0,1fr))' }}
							borderLeftWidth={1}
							borderRightWidth={1}
						>
							<GridItem
								as="aside"
								gridColumn={{ md: '1/-1', lg: 'span 3' }}
								py="6"
								borderRightWidth={1}
							>
								<Box as="nav" aria-label="Sidebar Navigation, Account">
									<SidebarNavLink
										href="/user/settings"
										icon={FiUser}
										text={'Profile'}
									/>
									<SidebarNavLink
										href="/user/order-history"
										icon={FiSearch}
										text={'Order History'}
									/>
									<SidebarNavLink
										href="/user/support"
										icon={FiInfo}
										text={'Support'}
									/>
								</Box>
							</GridItem>
							<GridItem
								gridColumn={{ md: '1/-1', lg: '4/-1' }}
								px={{ base: '4', md: '6' }}
								py="8"
							>
								{children}
							</GridItem>
						</Grid>
					</Box>
				</Container>
			</main>
		</>
	);
}
