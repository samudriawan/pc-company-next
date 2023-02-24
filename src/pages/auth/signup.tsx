import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	Center,
	Container,
} from '@chakra-ui/react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';

export default function SignUp() {
	return (
		<>
			<Head>
				<title>Create an account - DZ Prebuilt PC</title>
			</Head>
			<main>
				<Container
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					py="12"
				>
					<Stack w={{ base: '100%', sm: 'sm' }} m={'auto'} py="8" gap={4}>
						<Center>
							<Heading as="h1">DZ PC</Heading>
						</Center>
						<Box as="form" rounded={'lg'}>
							<FormControl id="username" mt="6">
								<FormLabel>Username</FormLabel>
								<Input type="text" />
							</FormControl>
							<FormControl id="email" mt="6">
								<FormLabel>Email address</FormLabel>
								<Input type="email" />
							</FormControl>
							<FormControl id="password" mt="6">
								<FormLabel>Password</FormLabel>
								<Input type="password" />
							</FormControl>
							<FormControl id="confirm_password" mt="6">
								<FormLabel>Confirm Password</FormLabel>
								<Input type="password" />
							</FormControl>
							<Button
								w="full"
								mt="8"
								size="lg"
								bg={'neon.blue'}
								transition="transform 200ms ease"
								fontSize="1.1rem"
								_hover={{ transform: 'scale(1.03)' }}
								_active={{ transform: 'scale(0.97)' }}
							>
								Sign up
							</Button>
						</Box>
						<Center gap={4} letterSpacing=".5px">
							<Text>Have an account?</Text>
							<Link as={NextLink} href="/auth/signin" color={'neon.blue'}>
								Sign in <ChevronRightIcon />
							</Link>
						</Center>
					</Stack>
				</Container>
			</main>
		</>
	);
}
