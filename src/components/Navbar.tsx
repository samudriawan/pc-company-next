import {
	Box,
	Button,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Heading,
	Link,
	LinkBox,
	LinkOverlay,
	Stack,
	StackDirection,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { default as NextLink } from 'next/link';
import { useRef } from 'react';

function Navbar() {
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
								<Link as={NextLink} href="/" mr={3} onClick={onClose}>
									Home
								</Link>
								<Link as={NextLink} href="/product" mr={3} onClick={onClose}>
									Prebuilt Gaming PCs
								</Link>
								<Link as={NextLink} href="/about" mr={3} onClick={onClose}>
									About
								</Link>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</Box>

				<LinkBox h="100%">
					<LinkOverlay as={NextLink} href="/">
						<Heading size="lg">DZ PC</Heading>
					</LinkOverlay>
				</LinkBox>
				<Stack
					direction={directionResp as StackDirection}
					display={directionResp === 'row' ? 'block' : 'none'}
				>
					<Link as={NextLink} href="/product">
						<Button variant="ghost" colorScheme="teal">
							Prebuilt Gaming PCs
						</Button>
					</Link>
					<Link as={NextLink} href="/about">
						<Button variant="ghost" colorScheme="teal">
							About
						</Button>
					</Link>
				</Stack>
			</Container>
		</Box>
	);
}
export default Navbar;
