import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	Flex,
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
import React, { useState } from 'react';
import ClientOnly from '@/components/ClientOnly';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { createOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

type Props = {
	callbackUrl: string | undefined;
};

export default function SignIn({ callbackUrl }: Props) {
	const [respError, setRespError] = useState<string | undefined>('');
	const router = useRouter();

	async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = Object.fromEntries(new FormData(e.currentTarget));

		const res = await signIn('credentials', { ...formData, redirect: false });
		if (res?.ok) {
			setRespError('');
			if (callbackUrl) {
				router.push(callbackUrl);
			} else {
				router.back();
			}
			return;
		}

		setRespError(res?.error);
	}

	return (
		<ClientOnly>
			<Head>
				<title>Sign In - DZPC</title>
			</Head>
			<Flex
				my={12}
				px={4}
				maxW="100%"
				direction={'column'}
				align={'center'}
				justify={'center'}
			>
				<Flex direction={'column'}>
					<Text>Test account</Text>
					<Text>
						admin email:{' '}
						<code>
							<strong>admin@email.com</strong>
						</code>{' '}
						password:{' '}
						<code>
							<strong>password</strong>
						</code>
					</Text>
					<Text>
						member email:{' '}
						<code>
							<strong>member1@email.com</strong>
						</code>{' '}
						password:{' '}
						<code>
							<strong>password</strong>
						</code>
					</Text>
				</Flex>
				<Stack w={{ base: '100%', sm: 'sm' }} mx={'auto'} my={'4'} gap={0}>
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
							{respError && <Center color={'red.400'}>{respError}</Center>}
						</Stack>
					</form>
					<Center gap={4} mt="4" letterSpacing=".5px">
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

export async function getServerSideProps(context: any) {
	const session = await getServerSession(
		context.req,
		context.res,
		createOptions(context.req)
	);

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: context.query,
	};
}
