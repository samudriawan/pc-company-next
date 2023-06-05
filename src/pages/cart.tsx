import { DeleteIcon } from '@chakra-ui/icons';
import {
	Alert,
	Box,
	Button,
	Container,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	List,
	ListItem,
	Stack,
	Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { default as NextLink } from 'next/link';
import React, {
	useState,
	useRef,
	useEffect,
	useContext,
	useCallback,
} from 'react';
import { CartContext, CART_ACTION } from '@/context/cartContext';
import PaypalButton from '@/components/PaypalButton';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useSession } from 'next-auth/react';

export default function Cart() {
	const { state: cartItems, dispatch } = useContext(CartContext);
	const [subTotal, setSubTotal] = useState(0);
	const [showPaypalButton, setShowPaypalButton] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const qtyInputRef = useRef<HTMLInputElement>(null);
	const { data: session } = useSession();

	const purchaseItems: any[] = [];
	cartItems.map((item) => {
		purchaseItems.push({
			name: item.productName,
			description: item.productName,
			quantity: item.qty,
			unit_amount: {
				value: item.productPrice.toString(),
				currency_code: 'USD',
			},
		});
	});

	useEffect(() => {
		setShowPaypalButton(false);
		setSubTotal(0);
	}, [cartItems]);

	const paymentSuccessHandler = useCallback(
		(isSuccess: boolean) => {
			setPaymentSuccess(isSuccess);
		},
		[paymentSuccess]
	);

	if (cartItems.length === 0)
		return (
			<>
				<Head>
					<title>Cart - DZ PC</title>
				</Head>
				<main>
					<Container
						maxW={{ sm: 'lg', md: '3xl', lg: 'container.lg', xl: '5xl' }}
						paddingBottom="3rem"
					>
						<Flex
							my={14}
							direction={'column'}
							justifyContent="center"
							alignItems={'center'}
						>
							{paymentSuccess && (
								<Alert mb="4" status="success" variant="subtle">
									<Text>Your payment is successful, thank you.</Text>
								</Alert>
							)}
							<Heading as={'h3'}>Your cart is empty</Heading>
							<NextLink href={'/product'}>
								<Button
									maxW="100%"
									bg="neon.blue"
									paddingBlock="1.4rem"
									my={6}
									transition="transform 200ms ease"
									fontSize="1.1rem"
									_hover={{ transform: 'scale(1.02)' }}
								>
									Continue shopping
								</Button>
							</NextLink>
						</Flex>
					</Container>
				</main>
			</>
		);

	return (
		<>
			<Head>
				<title>Cart - DZ PC</title>
			</Head>
			<main>
				<Container
					maxW={{ sm: 'lg', md: '3xl', lg: 'container.lg', xl: '5xl' }}
					paddingBottom="3rem"
				>
					<Grid
						templateColumns={{ sm: '1', md: 'repeat(12,minmax(0,1fr))' }}
						gap={8}
						my={6}
					>
						{/* item info */}
						<GridItem
							pb={{ base: 10, md: 20 }}
							gridColumn={{ base: '1fr', md: 'span 7' }}
						>
							<Stack
								direction={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
							>
								<Heading>Cart</Heading>
								<Text fontSize={'1.2rem'} letterSpacing="2px">
									(
									<Text as="span">
										{cartItems
											.map((item) => item.qty)
											.reduce((acc, curr) => acc + curr, 0)}
									</Text>
									)
								</Text>
							</Stack>
							<Divider my={4} />

							{/* TODO: refactor */}
							{cartItems.map((item, i) => (
								<Flex
									key={i}
									gap={{ base: 4, md: 8 }}
									w="100%"
									pt={i === 0 ? 0 : 6}
									pb={6}
									height={'max-content'}
									justifyContent={'space-between'}
									borderTop={i === 0 ? '' : '1px solid grey'}
								>
									<Box w={'64px'} h="64px">
										<Image
											alt="image placeholder"
											width={64}
											height={64}
											src={'https://via.placeholder.com/1000x1000.png/09f/fff'}
										/>
									</Box>
									<Stack flexGrow={1}>
										<Text
											as={'span'}
											mb={4}
											fontSize={'1.1rem'}
											fontWeight={'bold'}
										>
											{/* Product name */}
											{item.productName}
										</Text>

										<Stack>
											<InputGroup verticalAlign={'center'}>
												<InputLeftAddon p={0}>
													<Button
														variant={'unstyled'}
														roundedRight={0}
														lineHeight="2"
														onClick={() => {
															if (item.qty === 1) return;

															dispatch({
																type: CART_ACTION.SUBSTRACT_QTY,
																payload: item,
															});
														}}
													>
														-
													</Button>
												</InputLeftAddon>
												<Input
													type="number"
													min={1}
													ref={qtyInputRef}
													value={item.qty.toString()}
													onChange={(e) => {
														const stripNonNumber = e.target.value.replace(
															/\D/g,
															''
														);
														if (!stripNonNumber) {
															return;
														} else {
															dispatch({
																type: CART_ACTION.SET_QTY,
																payload: { ...item, qty: +e.target.value },
															});
														}
													}}
													rounded={0}
													textAlign="center"
													w={10}
													p={2}
												/>
												<InputRightAddon p={0}>
													<Button
														variant={'unstyled'}
														roundedLeft={0}
														onClick={() =>
															dispatch({
																type: CART_ACTION.ADD_QTY,
																payload: item,
															})
														}
													>
														+
													</Button>
												</InputRightAddon>
											</InputGroup>
										</Stack>
									</Stack>
									<Stack justifyContent={'space-between'} alignItems={'center'}>
										<Button
											rightIcon={<DeleteIcon />}
											variant={'ghost'}
											alignSelf="end"
											_hover={{
												bgColor: 'none',
											}}
											_active={{
												bgColor: 'none',
											}}
											onClick={() =>
												dispatch({
													type: CART_ACTION.DELETE_ITEM,
													payload: item,
												})
											}
										></Button>
										<Text color={'whiteAlpha.700'}>
											{new Intl.NumberFormat('us-ID', {
												style: 'currency',
												currency: 'USD',
											}).format(item.productPrice)}
										</Text>
									</Stack>
								</Flex>
							))}
						</GridItem>

						{/* summary */}
						<GridItem gridColumn={{ base: '1', md: '8/-1' }}>
							<Box p={4} bg={'whiteAlpha.200'}>
								<Heading as={'h2'} mb={4}>
									Summary
								</Heading>
								<List spacing={3} fontWeight={'semibold'}>
									<ListItem>
										<Stack
											direction={'row'}
											justifyContent={'space-between'}
											alignItems={'center'}
										>
											<Text as={'span'} fontSize={'xl'}>
												Subtotal
											</Text>
											<Text as={'span'}>
												{subTotal
													? new Intl.NumberFormat('us-ID', {
															style: 'currency',
															currency: 'USD',
													  }).format(subTotal)
													: 'Calculate on checkout.'}
											</Text>
										</Stack>
									</ListItem>
								</List>
								<Button
									w="100%"
									bg="neon.blue"
									paddingBlock="1.4rem"
									mt={10}
									mb={4}
									transition="transform 200ms ease"
									fontSize="1.1rem"
									_hover={{ transform: 'scale(1.02)' }}
									onClick={() => {
										fetch('http://localhost:3000/api/cart', {
											method: 'POST',
											body: JSON.stringify({ cart: cartItems }),
											headers: { 'Content-type': 'application/json' },
										})
											.then((res) => res.json())
											.then((total) => setSubTotal(total))
											.finally(() => setShowPaypalButton(true));
									}}
								>
									Chekcout
								</Button>
								<PayPalScriptProvider
									options={{
										'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
										currency: 'USD',
										'disable-funding': 'card',
									}}
								>
									{showPaypalButton ? (
										<PaypalButton
											total={subTotal.toString()}
											items={purchaseItems}
											userEmail={session.user?.email}
											paymentSuccessHandler={paymentSuccessHandler}
										/>
									) : null}
								</PayPalScriptProvider>
							</Box>
						</GridItem>
					</Grid>
				</Container>
			</main>
		</>
	);
}
