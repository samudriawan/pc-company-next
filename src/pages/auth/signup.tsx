import ClientOnly from '@/components/ClientOnly';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
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
	FormErrorMessage,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ResponseDataType } from '../api/account/users/register';
import { createOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

type Props = {
	callbackUrl: string | undefined;
};

export default function SignUp({ callbackUrl }: Props) {
	const [pwdMatch, setPwdMatch] = useState(false);
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [respError, setRespError] = useState<string | null>(null);
	const router = useRouter();

	async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { confirmPassword, ...userData } = Object.fromEntries(
			new FormData(e.currentTarget)
		);

		if (userData.password !== confirmPassword) {
			return setPwdMatch(true);
		}

		setPwdMatch(false);
		setBtnDisabled(true);

		try {
			const resp = await fetch(
				'http://localhost:3000/api/account/users/register',
				{
					method: 'POST',
					body: JSON.stringify(userData),
					headers: { 'Content-type': 'application/json' },
				}
			);
			const getJson: ResponseDataType = await resp.json();

			if (!resp.ok) {
				return setRespError(getJson.error);
			}

			const login = await signIn('credentials', {
				email: userData.email,
				password: userData.password,
				redirect: false,
			});

			if (!login?.ok) {
				router.push('/auth/signin');
			}

			if (callbackUrl) {
				router.push(callbackUrl);
			} else {
				router.back();
			}
		} catch (err) {
			console.error(err);
			throw new Error(err as string);
		} finally {
			setPwdMatch(false);
			setBtnDisabled(false);
		}
	}

	return (
		<ClientOnly>
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
						<form onSubmit={handleSignUp} data-testid="signup-form">
							<FormControl id="username" mt="6">
								<FormLabel>Username</FormLabel>
								<Input
									type="text"
									name="username"
									required
									data-testid="username-input"
								/>
							</FormControl>
							<FormControl id="email" mt="6">
								<FormLabel>Email address</FormLabel>
								<Input
									type="email"
									name="email"
									required
									data-testid="email-input"
								/>
							</FormControl>
							<FormControl id="password" mt="6">
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									name="password"
									required
									data-testid="password-input"
								/>
							</FormControl>
							<FormControl id="confirmPassword" mt="6" isInvalid={pwdMatch}>
								<FormLabel>Confirm Password</FormLabel>
								<Input
									type="password"
									name="confirmPassword"
									borderColor={pwdMatch ? 'red.400' : 'inherit'}
									_hover={{ borderColor: pwdMatch ? 'red.400' : 'inherit' }}
									required
									data-testid="confirm-password-input"
								/>
								<FormErrorMessage>Password did not match.</FormErrorMessage>
							</FormControl>
							<Button
								type="submit"
								w="full"
								mt="8"
								mb="2"
								size="lg"
								bg={'neon.blue'}
								transition="transform 200ms ease"
								fontSize="1.1rem"
								_hover={{ transform: 'scale(1.03)' }}
								_active={{ transform: 'scale(0.97)' }}
								isLoading={btnDisabled}
								data-testid="submit-button"
							>
								Sign up
							</Button>
							{respError && <Center color={'red.400'}>{respError}</Center>}
						</form>
						<Center gap={4} letterSpacing=".5px">
							<Text>Have an account?</Text>
							<Link as={NextLink} href="/auth/signin" color={'neon.blue'}>
								Sign in <ChevronRightIcon />
							</Link>
						</Center>
					</Stack>
				</Container>
			</main>
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
