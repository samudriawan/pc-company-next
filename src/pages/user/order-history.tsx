import UserDashboardLayout from '@/components/UserDashboardLayout';
import { Text } from '@chakra-ui/react';

export default function OrderHistory() {
	return (
		<UserDashboardLayout>
			<Text
				as="h2"
				pb="6"
				fontSize={'1.5rem'}
				fontWeight="bold"
				letterSpacing={1}
			>
				Order History
			</Text>
			<Text>You have no order history.</Text>
		</UserDashboardLayout>
	);
}
