import UserDashboardLayout from '@/components/UserDashboardLayout';
import { IUser } from '@/mongodb/models/User';
import {
	Alert,
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
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type ResponseData = {
	success: boolean;
	error: string | null;
	data: IUser | null;
};

export default function UserSettings() {
	const [usernameInput, setUsernameInput] = useState({
		username: '',
		errorMsg: '',
	});
	const [changePasswordInput, setChangePasswordInput] = useState({
		current: '',
		new: '',
		retype: '',
		errorMsg: '',
	});
	const [userBtnLoading, setUserBtnLoading] = useState(false);
	const [changePwdBtnLoading, setChangePwdBtnLoading] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState('');
	const { data: session } = useSession({ required: true });
	const { data: resp, mutate } = useSWR<ResponseData>(
		session && session.user
			? `/api/account/users/?id=${session?.user ? session?.user?.id : ''}`
			: null,
		{
			// revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			onSuccess: (data) =>
				setUsernameInput({
					username: data.data.username,
					errorMsg: '',
				}),
		}
	);

	async function updateUserHandler() {
		setUpdateSuccess('');
		setUsernameInput({
			...usernameInput,
			errorMsg: '',
		});

		if (resp.data.username === usernameInput.username.trim()) {
			return;
		}

		setUserBtnLoading(true);
		try {
			const resp = await fetch('/api/account/users/update', {
				method: 'PUT',
				body: JSON.stringify({
					username: usernameInput.username.trim(),
					id: session.user.id,
				}),
				headers: { 'Content-type': 'application/json' },
			});
			const { error, data } = await resp.json();
			if (error) {
				setUsernameInput({
					...usernameInput,
					errorMsg: error,
				});
				return;
			}

			await fetch(`/api/auth/session?name=${usernameInput.username}`);
			setUpdateSuccess(data);
			mutate();
		} catch (err) {
			console.log(err);
			setUsernameInput({
				...usernameInput,
				errorMsg: err as string,
			});
		} finally {
			setUserBtnLoading(false);
		}
	}

	async function changePasswordHandler() {
		if (
			!changePasswordInput.current ||
			!changePasswordInput.new ||
			!changePasswordInput.retype
		)
			return;

		setUpdateSuccess('');
		setChangePasswordInput({
			...changePasswordInput,
			errorMsg: '',
		});

		if (changePasswordInput.new !== changePasswordInput.retype) {
			setChangePasswordInput({
				...changePasswordInput,
				errorMsg: 'New password and retype new password did not match.',
			});
			return;
		}

		setChangePwdBtnLoading(true);
		try {
			const resp = await fetch('/api/account/users/update', {
				method: 'PUT',
				body: JSON.stringify({
					current: changePasswordInput.current,
					new: changePasswordInput.new,
					retype: changePasswordInput.retype,
					id: session.user.id,
				}),
				headers: { 'Content-type': 'application/json' },
			});
			const { error, data } = await resp.json();
			if (error) {
				setChangePasswordInput({
					...changePasswordInput,
					errorMsg: 'Current password is wrong.',
				});
				return;
			}

			setUpdateSuccess(data);
		} catch (err) {
			setChangePasswordInput({
				...changePasswordInput,
				errorMsg: err as string,
			});
		} finally {
			setChangePwdBtnLoading(false);
		}
	}

	return (
		<UserDashboardLayout>
			{updateSuccess && (
				<Alert mb="4" status="success" variant="subtle">
					<Text>{updateSuccess}</Text>
				</Alert>
			)}
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
				<GridItem gridColumn={{ base: 'span 12', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<Input
							type="text"
							value={usernameInput.username}
							onChange={(e) =>
								setUsernameInput({
									...usernameInput,
									username: e.target.value,
								})
							}
							placeholder="Username"
							isDisabled={session?.user.role === 'admin'}
						/>
					</FormControl>
				</GridItem>
				<GridItem gridColumn={{ base: 'span 12', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							value={session?.user.email}
							errorBorderColor="red.300"
							placeholder="Email Address"
							isDisabled
						/>
					</FormControl>
				</GridItem>
				{usernameInput.errorMsg && (
					<GridItem gridColumn={'span 12'} ms={'auto'}>
						<Text fontSize={'sm'} color={'red'}>
							{usernameInput.errorMsg}
						</Text>
					</GridItem>
				)}
				<GridItem gridColumn={'span 12'} ms="auto" me="0">
					<Button
						minW={'140px'}
						me={{ base: '2', md: '0' }}
						color="white"
						bg="neon.blue"
						letterSpacing={'1px'}
						onClick={updateUserHandler}
						isDisabled={resp?.data.username === usernameInput.username.trim()}
						_disabled={{
							color: 'grey',
							bg: 'whiteAlpha.400',
							opacity: '0.4',
							boxShadow: 'md',
							cursor: 'not-allowed',
						}}
						isLoading={userBtnLoading}
						transition="transform 200ms ease"
						_hover={{ transform: 'scale(1.03)' }}
						_active={{ transform: 'scale(0.97)' }}
					>
						Save
					</Button>
				</GridItem>
				<GridItem gridColumn={'span 12'}>
					<Text>Change Password</Text>
				</GridItem>
				<GridItem gridColumn={'span 12'}>
					<Divider />
				</GridItem>
				<GridItem gridColumn={'span 12'}>
					<Box w={{ base: 'full', lg: '50%' }} pe={{ base: '0', lg: '3' }}>
						<FormControl mx={'auto'}>
							<FormLabel>Current Password</FormLabel>
							<Input
								type="password"
								value={changePasswordInput.current}
								onChange={(e) =>
									setChangePasswordInput({
										...changePasswordInput,
										current: e.target.value,
									})
								}
								placeholder="Your current password"
								isDisabled={session?.user.role === 'admin'}
							/>
						</FormControl>
					</Box>
				</GridItem>
				<GridItem gridColumn={{ base: 'span 12', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>New Password</FormLabel>
						<Input
							type="password"
							value={changePasswordInput.new}
							onChange={(e) =>
								setChangePasswordInput({
									...changePasswordInput,
									new: e.target.value,
								})
							}
							placeholder="Your new password"
							isDisabled={session?.user.role === 'admin'}
						/>
					</FormControl>
				</GridItem>
				<GridItem gridColumn={{ base: 'span 12', lg: 'span 6' }}>
					<FormControl>
						<FormLabel>Retype New Password</FormLabel>
						<Input
							type="password"
							value={changePasswordInput.retype}
							onChange={(e) =>
								setChangePasswordInput({
									...changePasswordInput,
									retype: e.target.value,
								})
							}
							placeholder="Type your new password again"
							isDisabled={session?.user.role === 'admin'}
						/>
					</FormControl>
				</GridItem>
				{changePasswordInput.errorMsg && (
					<GridItem gridColumn={'span 12'} ms={'auto'}>
						<Text fontSize={'sm'} color={'red'}>
							{changePasswordInput.errorMsg}
						</Text>
					</GridItem>
				)}
				<GridItem gridColumn={'span 12'} ms="auto" me="0">
					<Button
						minW={'140px'}
						me={{ base: '2', md: '0' }}
						color="white"
						bg="neon.blue"
						letterSpacing={'1px'}
						onClick={changePasswordHandler}
						isDisabled={
							!changePasswordInput.current ||
							!changePasswordInput.new ||
							!changePasswordInput.retype
						}
						_disabled={{
							color: 'grey',
							bg: 'whiteAlpha.400',
							opacity: '0.4',
							boxShadow: 'md',
							cursor: 'not-allowed',
						}}
						isLoading={changePwdBtnLoading}
						transition="transform 200ms ease"
						_hover={{ transform: 'scale(1.03)' }}
						_active={{ transform: 'scale(0.97)' }}
					>
						Change Password
					</Button>
				</GridItem>
			</Grid>
		</UserDashboardLayout>
	);
}
