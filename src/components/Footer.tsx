import {
	Box,
	chakra,
	Container,
	Link,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
	Divider,
	VisuallyHidden,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={'700'} fontSize={'lg'} mb={2}>
			{children}
		</Text>
	);
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Container as={Stack} maxW={'6xl'} py={10} marginInline={5}>
				<Stack direction={'row'} spacing={6} mb={8}>
					<SocialButton label={'Twitter'} href={'#'}>
						<FaTwitter />
					</SocialButton>
					<SocialButton label={'YouTube'} href={'#'}>
						<FaYoutube />
					</SocialButton>
					<SocialButton label={'Instagram'} href={'#'}>
						<FaInstagram />
					</SocialButton>
				</Stack>

				<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
					<Stack align={'flex-start'}>
						<ListHeader>Contact</ListHeader>
						<Link href={'#'}>About</Link>
						<Link href={'#'}>Customer Support</Link>
						<Link href={'#'}>Submit a Request</Link>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Product</ListHeader>
						<Link href={'#'}>Prebuilt PC</Link>
						<Link href={'#'}>FAQ</Link>
						<Link href={'#'}>Reviews</Link>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Account</ListHeader>
						<Link href={'#'}>Manage Your Account</Link>
					</Stack>
				</SimpleGrid>
			</Container>
			<Box mt={20} pt={10} pb={8}>
				<Divider />
				<Text pt={8} fontSize={'sm'} textAlign={'center'}>
					© 2022 Chakra Templates. All rights reserved
				</Text>
			</Box>
		</Box>
	);
}
