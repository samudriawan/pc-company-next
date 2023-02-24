import UserDashboardLayout from '@/components/UserDashboardLayout';
import {
	Box,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Input,
	Text,
} from '@chakra-ui/react';

export default function UserSettings() {
	return (
		<UserDashboardLayout>
			<Text as="h2" fontSize={'1.5rem'} fontWeight="bold" letterSpacing={1}>
				Profile
			</Text>
			<Divider my="2rem" />
			<Grid
				as="form"
				w="100%"
				templateColumns={{ base: '1fr', md: 'repeat(12,minmax(0,1fr))' }}
				gap="6"
			>
				<GridItem gridColumn={{ md: '1/-1', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<Input type="text" placeholder="Username" />
					</FormControl>
				</GridItem>
				<GridItem gridColumn={{ md: '1/-1', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>First Name</FormLabel>
						<Input
							type="text"
							errorBorderColor="red.300"
							placeholder="First Name"
						/>
					</FormControl>
				</GridItem>
				<GridItem gridColumn={{ md: '1/-1', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Last Name</FormLabel>
						<Input
							type="text"
							errorBorderColor="red.300"
							placeholder="Last Name"
						/>
					</FormControl>
				</GridItem>
				<GridItem gridColumn={{ md: '1/-1', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							errorBorderColor="red.300"
							placeholder="Email Address"
						/>
					</FormControl>
				</GridItem>
				<GridItem gridColumn={{ md: '1/-1', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Birthday</FormLabel>
						<Input type="date" />
					</FormControl>
				</GridItem>
				<GridItem gridColumn={'span 12'}>
					<Text>Change Password</Text>
				</GridItem>
				<GridItem gridColumn={'span 12'}>
					<Divider />
				</GridItem>
				<GridItem gridColumn={'span 12'}>
					<Box w={'50%'} pe="3">
						<FormControl>
							<FormLabel>Current Password</FormLabel>
							<Input type="password" />
						</FormControl>
					</Box>
				</GridItem>
				<GridItem gridColumn={{ md: '1/-1', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>New Password</FormLabel>
						<Input type="password" />
					</FormControl>
				</GridItem>
				<GridItem gridColumn={{ md: '1/-1', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Retype New Password</FormLabel>
						<Input type="password" />
					</FormControl>
				</GridItem>
				<GridItem gridColumn={'span 12'} ms="auto" me="0">
					<Button
						minW={'140px'}
						size={'lg'}
						bg="neon.blue"
						letterSpacing={'1px'}
						_disabled={{
							color: 'grey',
							bg: 'whiteAlpha.400',
							opacity: '0.4',
							boxShadow: 'md',
							cursor: 'not-allowed',
						}}
						transition="transform 200ms ease"
						_hover={{ transform: 'scale(1.03)' }}
						_active={{ transform: 'scale(0.97)' }}
					>
						Save
					</Button>
				</GridItem>
			</Grid>
		</UserDashboardLayout>
	);
}
