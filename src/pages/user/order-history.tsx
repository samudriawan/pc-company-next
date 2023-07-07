import UserDashboardLayout from '@/components/UserDashboardLayout';
import { Order } from '@/mongodb/models/User';
import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Spinner,
	Text,
	UnorderedList,
	useBreakpointValue,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';

type DataOrder = {
	_id: string;
	orders: Order[];
};

type ResponseData = {
	success: boolean;
	error: string | null;
	data: DataOrder | null;
};

export default function OrderHistory() {
	const [showMoreItems, setShowMoreItems] = useState<{
		[index: string]: boolean;
	}>({});
	const [statusHistoryLogs, setStatusHistoryLogs] = useState([]);
	const { data: session } = useSession();
	const { isOpen, onClose, onToggle } = useDisclosure();

	const { data: resp, isLoading } = useSWR<ResponseData>(
		`/api/account/users/orders/${session?.user ? session?.user?.id : ''}`,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	const [isMobile] = useMediaQuery('(max-width: 576px)');
	const fontSize = useBreakpointValue(
		{ base: 'sm', lg: 'md' },
		{ fallback: 'md' }
	);

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
			{isLoading ? (
				<Center my="4">
					<Spinner />
				</Center>
			) : resp ? (
				resp.data.orders ? (
					resp?.data.orders.length === 0 ? (
						<Text>You have no order history.</Text>
					) : (
						resp?.data.orders
							.sort(
								(a, b) =>
									new Date(b.createTime).getTime() -
									new Date(a.createTime).getTime()
							)
							.map((order) => (
								<Card
									w={'full'}
									mb={'2'}
									size={'sm'}
									variant={'outline'}
									color={'white'}
									bg={'transparent'}
									key={order.orderId}
									fontSize={fontSize}
								>
									<CardHeader display={'flex'} justifyContent={'space-between'}>
										<Text>
											{new Date(order.createTime).toLocaleString('default', {
												dateStyle: 'long',
											})}
										</Text>
										<Box display={!isMobile && 'flex'} gap={'4'}>
											<Text fontSize={'xs'} my={'auto'}>
												Order Number
											</Text>
											<Text fontWeight={'bold'}>{order.orderId}</Text>
										</Box>
									</CardHeader>
									<CardBody pt={'0'} overflowX={'auto'}>
										<SimpleGrid columns={3} spacing={'4'}>
											<Box>
												{/* <Text>Products</Text> */}
												{showMoreItems[order.orderId] ? (
													order.items.map((item) => (
														<Box key={item.name}>
															<Text fontWeight={'bold'}>{item.name}</Text>
															<Text>
																{item.quantity} x ${item.price}
															</Text>
														</Box>
													))
												) : (
													<Box>
														<Text fontWeight={'bold'}>
															{order.items[0].name}
														</Text>
														<Text>
															{order.items[0].quantity} x $
															{order.items[0].price}
														</Text>
													</Box>
												)}
												{order.items.length > 1 ? (
													<Button
														onClick={() => {
															if (showMoreItems[order.orderId]) {
																const removeOrderId: {
																	[index: string]: boolean;
																} = {
																	...showMoreItems,
																};
																delete removeOrderId[order.orderId];
																setShowMoreItems(removeOrderId);
															} else {
																setShowMoreItems({
																	...showMoreItems,
																	[order.orderId]: true,
																});
															}
														}}
														variant={'link'}
														size={'sm'}
														color={'accent.green'}
													>
														{showMoreItems[order.orderId]
															? 'Show Less'
															: 'Show More'}
													</Button>
												) : null}
											</Box>
											<Box mx={'0'} maxW={'max-content'}>
												<Text>Total</Text>
												<Text fontWeight={'bold'}>${order.total}</Text>
											</Box>
											<Box>
												<Text>Status</Text>
												<Text fontWeight={'bold'}>{order.status}</Text>
												<Button
													onClick={() => {
														setStatusHistoryLogs(order.statusLogs);
														onToggle();
													}}
													variant={'link'}
													size={'sm'}
													color={'accent.green'}
												>
													Details
												</Button>
												<Modal
													isOpen={isOpen}
													onClose={onClose}
													scrollBehavior={'inside'}
													isCentered
												>
													<ModalOverlay bg="blackAlpha.300" />
													<ModalContent
														bg={'black'}
														border={'1px solid'}
														borderColor={'whiteAlpha.400'}
													>
														<ModalHeader
															borderBottom={'1px solid'}
															borderColor={'whiteAlpha.200'}
														>
															Status Details
														</ModalHeader>
														<ModalCloseButton />
														<ModalBody>
															<UnorderedList>
																{statusHistoryLogs.map((log) => (
																	<ListItem key={log.updatedTime} mb={'2'}>
																		{new Date(log.updatedTime).toLocaleString()}{' '}
																		-{' '}
																		<span style={{ fontWeight: 'bold' }}>
																			{log.status}
																		</span>
																	</ListItem>
																))}
															</UnorderedList>
														</ModalBody>
													</ModalContent>
												</Modal>
											</Box>
										</SimpleGrid>
									</CardBody>
								</Card>
							))
					)
				) : (
					<Text>You have to Signin to see order history.</Text>
				)
			) : (
				<Text>Something wrong in database connection.</Text>
			)}
		</UserDashboardLayout>
	);
}
