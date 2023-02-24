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

export default function SignIn() {
	return (
		<Flex my={12} px={4} maxW="100%" align={'center'} justify={'center'}>
			<Stack w={{ base: '100%', sm: 'sm' }} mx={'auto'} gap={4}>
				<Center>
					<Heading as="h1">DZ PC</Heading>
				</Center>
				<Box as="form" rounded={'lg'}>
					<FormControl id="email" mt="6">
						<FormLabel>Email address</FormLabel>
						<Input type="email" />
					</FormControl>
					<FormControl id="password" mt="6">
						<FormLabel>Password</FormLabel>
						<Input type="password" />
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
				</Box>
				<Center gap={4} letterSpacing=".5px">
					<Text>Not a member?</Text>
					<Link as={NextLink} href="/auth/signup" color={'neon.blue'}>
						Create an account <ChevronRightIcon />
					</Link>
				</Center>
			</Stack>
		</Flex>
	);
}
