import {
	Avatar,
	Box,
	Button,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Heading,
	Icon,
	Link,
	LinkBox,
	LinkOverlay,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import { default as NextLink } from 'next/link';
import { useRef } from 'react';
import CartButton from './CartButton';
import { signOut, useSession } from 'next-auth/react';

type UserAvatarProps = {
	name: string;
	role: string;
};

function UserAvatar({ name, role }: UserAvatarProps) {
	return (
		<Flex alignItems={'center'}>
			<Menu isLazy>
				<MenuButton
					as={Button}
					rounded={'full'}
					variant={'link'}
					cursor={'pointer'}
					minW={0}
					title={name}
				>
					<Avatar size={'sm'} src={'https://bit.ly/broken-link'} />
				</MenuButton>
				<MenuList bg={'blackAlpha.700'}>
					{role === 'admin' && (
						<MenuItem
							as={'a'}
							href={'/admin/product'}
							bg={'blackAlpha.700'}
							_hover={{ bg: 'whiteAlpha.400' }}
							title="Admin Panel"
						>
							Admin Panel
						</MenuItem>
					)}
					<MenuItem
						as={'a'}
						href={'/user/settings'}
						bg={'blackAlpha.700'}
						_hover={{ bg: 'whiteAlpha.400' }}
						title="Settings"
					>
						Profile
					</MenuItem>
					<MenuItem
						bg={'blackAlpha.700'}
						_hover={{ bg: 'whiteAlpha.400' }}
						title="Sign Out"
						onClick={() => signOut()}
					>
						Sign Out
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}

function Navbar() {
	const { data: session } = useSession();
	const btnRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const directionResp = useBreakpointValue(
		{
			base: 'column',
			md: 'row',
		},
		{
			fallback: 'md',
		}
	);

	return (
		<Box
			position="sticky"
			top="0"
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			w="100%"
			p={4}
			bg="black"
			opacity="0.9"
			borderBottom="1px solid grey"
			zIndex="1000"
		>
			<Container
				maxWidth="100%"
				display="flex"
				justifyContent={directionResp === 'row' ? 'space-between' : 'start'}
				ps={directionResp === 'row' ? '5' : '0'}
				alignItems="center"
				gap="5"
				opacity="1"
			>
				<Box display={directionResp === 'row' ? 'none' : 'block'}>
					<Box ref={btnRef.current} onClick={onOpen} role="button">
						<HamburgerIcon boxSize={5} />
					</Box>
					<Drawer
						isOpen={directionResp === 'row' ? false : isOpen}
						placement="left"
						onClose={onClose}
						finalFocusRef={btnRef.current}
					>
						<DrawerOverlay />
						<DrawerContent bgColor={'accent.grey'}>
							<DrawerCloseButton top="5" left="4" />

							<DrawerBody
								mt="4rem"
								display="flex"
								flexDirection="column"
								gap="5"
							>
								<Link
									as={NextLink}
									href="/"
									mr={3}
									onClick={onClose}
									title="Home"
								>
									Home
								</Link>
								<Link
									as={NextLink}
									href="/product"
									mr={3}
									onClick={onClose}
									title="Prebuilt Gaming PCs"
								>
									Prebuilt Gaming PCs
								</Link>
								<Link
									as={NextLink}
									href="/about"
									mr={3}
									onClick={onClose}
									title="About"
								>
									About
								</Link>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</Box>

				<LinkBox h="100%">
					<LinkOverlay as={NextLink} href="/" title="DZPC">
						<Heading size="lg">DZ PC</Heading>
					</LinkOverlay>
				</LinkBox>
				<Stack
					direction={'row'}
					display={directionResp === 'row' ? 'flex' : 'none'}
					justifySelf={'end'}
					alignSelf="end"
					spacing={4}
				>
					<Link as={NextLink} href="/product" title="Prebuilt Gaming PCs">
						<Button variant="ghost" colorScheme="teal">
							Prebuilt Gaming PCs
						</Button>
					</Link>
					<Link as={NextLink} href="/about" title="About">
						<Button variant="ghost" colorScheme="teal" m="auto">
							About
						</Button>
					</Link>
					{session?.user ? (
						<UserAvatar name={session.user.name!} role={session.user.role} />
					) : (
						<Link as={NextLink} href="/auth/signin" title="Sign In">
							<Button variant="unstyled" _hover={{ color: 'neon.blue' }}>
								<Icon as={FiUser} fontSize="1.7rem" />
							</Button>
						</Link>
					)}
					<CartButton />
				</Stack>
				<Flex
					direction={'row'}
					display={directionResp === 'row' ? 'none' : 'flex'}
					ms="auto"
					gap={4}
				>
					<UserAvatar name={session?.user.name!} role={session?.user.role!} />
					<CartButton />
				</Flex>
			</Container>
		</Box>
	);
}
export default Navbar;
