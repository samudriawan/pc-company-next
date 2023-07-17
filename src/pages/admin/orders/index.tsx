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
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	SimpleGrid,
	Spinner,
	Text,
	UnorderedList,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import useSWR from 'swr';

type DataOrder = {
	_id: string;
	orders: Order[];
};

type ResponseData = {
	success: boolean;
	error: string | null;
	data: DataOrder[] | null;
};

export default function ManageOrder() {
	const [statusHistoryLogs, setStatusHistoryLogs] = useState([]);
	const [showMoreItems, setShowMoreItems] = useState<{
		[index: string]: boolean;
	}>({});
	const [changeStatusParams, setChangeStatusParams] = useState({
		currentStatus: null,
		changedStatus: null,
		statusLog: [],
		orderId: null,
		userId: null,
	});

	const {
		data: resp,
		isLoading,
		mutate,
	} = useSWR<ResponseData>('/api/account/users/orders', {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	const { isOpen, onClose, onToggle } = useDisclosure();
	const fontSizeResponsive = useBreakpointValue(
		{ base: 'sm', lg: 'md' },
		{ fallback: 'md' }
	);

	async function changeOrderStatus() {
		setChangeStatusParams({
			...changeStatusParams,
			changedStatus: null,
		});

		try {
			fetch('/api/account/users/orders/updateOrderStatus', {
				method: 'POST',
				body: JSON.stringify(changeStatusParams),
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then(({ error, data }) => {
					if (error) {
						console.log(error);
						return;
					}

					mutate(async (data) => {
						return {
							...data,
							orders: data.data
								.map((x) => x.orders)
								.flat(1)
								.map((order) => {
									if (order.orderId === changeStatusParams.orderId) {
										return {
											...order,
											status: changeStatusParams.changedStatus,
										};
									} else {
										return order;
									}
								}),
						};
					});
				});
		} catch (err) {
			console.log(err);
			throw new Error(err as string);
		}
		onClose();
	}

	function disabledOption(status: string): boolean {
		switch (status) {
			case 'PAID':
				return true;
			case 'PROCESSING':
				return (
					changeStatusParams.currentStatus !== 'PAID' ||
					changeStatusParams.currentStatus === status
				);
			case 'SHIPPED':
				return (
					(changeStatusParams.currentStatus !== 'PAID' &&
						changeStatusParams.currentStatus !== 'PROCESSING') ||
					changeStatusParams.currentStatus === status
				);
			case 'DELIVERED':
				return (
					(changeStatusParams.currentStatus !== 'PAID' &&
						changeStatusParams.currentStatus !== 'PROCESSING' &&
						changeStatusParams.currentStatus !== 'SHIPPED') ||
					changeStatusParams.currentStatus === status
				);
			case 'COMPLETED':
				return (
					(changeStatusParams.currentStatus !== 'PAID' &&
						changeStatusParams.currentStatus !== 'PROCESSING' &&
						changeStatusParams.currentStatus !== 'SHIPPED' &&
						changeStatusParams.currentStatus !== 'DELIVERED') ||
					changeStatusParams.currentStatus === status
				);
			default:
				return false;
		}
	}

	return (
		<UserDashboardLayout>
			<Text
				as="h2"
				pb="6"
				fontSize={'1.5rem'}
				fontWeight="bold"
				letterSpacing={1}
			>
				Manage Order
			</Text>
			{isLoading ? (
				<Center my="4">
					<Spinner />
				</Center>
			) : resp ? (
				resp?.data
					.map((x) => x.orders)
					.flat(1)
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
							fontSize={fontSizeResponsive}
						>
							<CardHeader>
								<Text>
									{new Date(order.createTime).toLocaleString('default', {
										dateStyle: 'long',
									})}
								</Text>
							</CardHeader>
							<CardBody overflowX={'auto'}>
								<SimpleGrid
									columns={4}
									spacing={'4'}
									w={{ base: 'max-content', lg: 'full' }}
								>
									<Box>
										<Text>Order Number</Text>
										<Text fontWeight={'bold'}>{order.orderId}</Text>
									</Box>
									<Box>
										<Text>Products</Text>
										{showMoreItems[order.orderId] ? (
											order.items.map((item) => (
												<Box key={item.name}>
													<Text fontWeight={'bold'} isTruncated>
														{item.name}
													</Text>
													<Text>
														{item.quantity} x ${item.price}
													</Text>
												</Box>
											))
										) : (
											<Box>
												<Text fontWeight={'bold'}>{order.items[0].name}</Text>
												<Text>
													{order.items[0].quantity} x ${order.items[0].price}
												</Text>
											</Box>
										)}
										{order.items.length > 1 ? (
											<Button
												onClick={() => {
													if (showMoreItems[order.orderId]) {
														const removeOrderId: { [index: string]: boolean } =
															{
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
									<Box>
										<Text>Total</Text>
										<Text fontWeight={'bold'}>${order.total}</Text>
									</Box>
									<Box ms={'4'}>
										<Text>Status</Text>
										<Text fontWeight={'bold'}>{order.status}</Text>

										<Button
											onClick={() => {
												setChangeStatusParams({
													...changeStatusParams,
													changedStatus: order.status,
													currentStatus: order.status,
													statusLog: order.statusLogs,
													orderId: order.orderId,
													userId: resp?.data
														.map(
															(x) =>
																x.orders.find(
																	(x) => x.orderId === order.orderId
																) && x._id
														)
														.filter((x) => !!x)[0],
												});
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
													Change Status
													<Select
														value={changeStatusParams.changedStatus}
														size="sm"
														mt="2"
														maxW={'max-content'}
														bg={'black'}
														color={'white'}
														onChange={(e) => {
															setChangeStatusParams({
																...changeStatusParams,
																changedStatus: e.target.value,
															});
														}}
													>
														<option
															disabled={disabledOption('PAID')}
															value="PAID"
															style={{ background: 'black' }}
														>
															PAID
														</option>
														<option
															disabled={disabledOption('PROCESSING')}
															value="PROCESSING"
															style={{ background: 'black' }}
														>
															PROCESSING
														</option>
														<option
															disabled={disabledOption('SHIPPED')}
															value="SHIPPED"
															style={{ background: 'black' }}
														>
															SHIPPED
														</option>
														<option
															disabled={disabledOption('DELIVERED')}
															value="DELIVERED"
															style={{ background: 'black' }}
														>
															DELIVERED
														</option>
														<option
															disabled={disabledOption('COMPLETED')}
															value="COMPLETED"
															style={{ background: 'black' }}
														>
															COMPLETED
														</option>
													</Select>
												</ModalHeader>
												<ModalCloseButton />
												<ModalBody>
													<UnorderedList>
														{statusHistoryLogs.map((log) => (
															<ListItem key={log.updatedTime}>
																{new Date(log.updatedTime).toLocaleString()} -{' '}
																<span style={{ fontWeight: 'bold' }}>
																	{log.status}
																</span>
															</ListItem>
														))}
													</UnorderedList>
												</ModalBody>
												<ModalFooter>
													<Button
														size={'sm'}
														colorScheme="blue"
														mr={3}
														onClick={changeOrderStatus}
														isDisabled={
															changeStatusParams.currentStatus ===
															changeStatusParams.changedStatus
														}
													>
														Save
													</Button>
													<Button size={'sm'} variant="ghost" onClick={onClose}>
														Cancel
													</Button>
												</ModalFooter>
											</ModalContent>
										</Modal>
									</Box>
								</SimpleGrid>
							</CardBody>
						</Card>
					))
			) : (
				<Text>You have no order history.</Text>
			)}
		</UserDashboardLayout>
	);
}
