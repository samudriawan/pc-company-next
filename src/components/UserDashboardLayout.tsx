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
import { FiUser, FiSearch } from 'react-icons/fi';

type DashboardLayoutProps = {
	children: React.ReactNode;
};

type SidebarNavLinkProps = {
	href: string;
	icon?: IconType;
	text: string;
	path: string;
};

const NavLink = ({ href = '#', icon, text, path }: SidebarNavLinkProps) => {
	return (
		<Link
			as={NextLink}
			href={href}
			display={'flex'}
			px="3"
			py="2"
			alignItems={'center'}
			gap="4"
			aria-current={path === href ? 'page' : 'false'}
			borderLeftWidth={4}
			borderLeftColor={'transparent'}
			_hover={{
				bg: 'hsl(240, 30%, 15%)',
				svg: { color: 'neon.shadeBlue' },
			}}
			_activeLink={{ borderColor: 'neon.blue', bgColor: 'hsl(240, 30%, 15%)' }}
		>
			{icon && <Icon as={icon} boxSize={6} />}
			<Text isTruncated={true}>{text}</Text>
		</Link>
	);
};

export default function UserDashboardLayout({
	children,
}: DashboardLayoutProps) {
	const router = useRouter();

	function SidebarNavLink() {
		if (router.asPath.startsWith('/admin')) {
			return (
				<>
					<NavLink
						href="/admin/product"
						text={'Product'}
						path={router.asPath}
					/>
					<NavLink href="/admin/orders" text={'Order'} path={router.asPath} />
				</>
			);
		} else {
			return (
				<>
					<NavLink
						href="/user/settings"
						icon={FiUser}
						text={'Profile'}
						path={router.asPath}
					/>
					<NavLink
						href="/user/order-history"
						icon={FiSearch}
						text={'Order History'}
						path={router.asPath}
					/>
				</>
			);
		}
	}

	return (
		<>
			<Head>
				<title>User | DZ PC Next App</title>
			</Head>

			<main>
				<Container
					as="section"
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '6xl' }}
					pt="3rem"
					paddingBottom="3rem"
				>
					<Heading as="h1" mb="6">
						{router.asPath.startsWith('/admin') ? 'Admin' : 'Account'}
					</Heading>
					<Box shadow={'lg'} overflow="auto">
						<Grid
							w="100%"
							templateColumns={{
								base: '1fr',
								md: 'repeat(12,minmax(0,1fr))',
							}}
							// borderLeftWidth={1}
							// borderRightWidth={1}
						>
							<GridItem
								as="aside"
								gridColumn={{ md: '1/-1', lg: 'span 3' }}
								py="6"
								borderRightWidth={1}
								borderBottomWidth={{ base: 1, lg: 0 }}
							>
								<Box as="nav" aria-label="Sidebar Navigation, Account">
									<SidebarNavLink />
								</Box>
							</GridItem>
							<GridItem
								gridColumn={{ md: '1/-1', lg: '4/-1' }}
								px={{ base: '0', md: '6' }}
								py="8"
								overflowX={'auto'}
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
