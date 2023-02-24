import UserDashboardLayout from '@/components/UserDashboardLayout';
import { Box, Divider, Text } from '@chakra-ui/react';

export default function UserSupport() {
	return (
		<UserDashboardLayout>
			<Text as="h2" fontSize={'1.5rem'} fontWeight="bold" letterSpacing={1}>
				Support
			</Text>
			<Divider my="2rem" />
			<Box>
				<Text
					as="h3"
					pb="4"
					fontSize={'1.5rem'}
					fontWeight="bold"
					letterSpacing={1}
				>
					Active Tickets
				</Text>
				<Text>You have no active tickets</Text>
			</Box>
		</UserDashboardLayout>
	);
}
