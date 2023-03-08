import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	Center,
} from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { signIn } from 'next-auth/react';
import React from 'react';
import ClientOnly from '@/components/ClientOnly';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SignIn() {
	const router = useRouter();

	async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = Object.fromEntries(new FormData(e.currentTarget));

		const res = await signIn('credentials', { ...formData, redirect: false });
		if (res?.ok) return router.back();
		console.log(res);
	}

	return (
		<ClientOnly>
			<Head>
				<title>Sign In - DZPC</title>
			</Head>
			<Flex my={12} px={4} maxW="100%" align={'center'} justify={'center'}>
				<Stack w={{ base: '100%', sm: 'sm' }} mx={'auto'} gap={4}>
					<Center>
						<Heading as="h1">DZ PC</Heading>
					</Center>
					<form onSubmit={handleSignIn}>
						<FormControl id="email" mt="6">
							<FormLabel htmlFor="email">Email address</FormLabel>
							<Input type="email" name="email" />
						</FormControl>
						<FormControl id="password" mt="6">
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input type="password" name="password" />
						</FormControl>
						<Stack spacing={6} mt="6">
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}
							>
								<Checkbox iconColor={'neon.blue'}>Remember me</Checkbox>
								<Link color={'blue.400'}>Forgot password?</Link>
							</Stack>
							<Button
								type="submit"
								size="lg"
								bg={'neon.blue'}
								transition="transform 200ms ease"
								fontSize="1.1rem"
								_hover={{ transform: 'scale(1.03)' }}
								_active={{ transform: 'scale(0.97)' }}
							>
								Sign in
							</Button>
						</Stack>
					</form>
					<Center gap={4} letterSpacing=".5px">
						<Text>Not a member?</Text>
						<Link as={NextLink} href="/auth/signup" color={'neon.blue'}>
							Create an account <ChevronRightIcon />
						</Link>
					</Center>
				</Stack>
			</Flex>
		</ClientOnly>
	);
}
