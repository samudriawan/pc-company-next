import { ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';
import {
	Alert,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Center,
	Container,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Select,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Tooltip,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { HiThumbDown, HiThumbUp } from 'react-icons/hi';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import Head from 'next/head';
import Image from 'next/image';
import { default as NextLink } from 'next/link';
import { useRef, useContext } from 'react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { CartContext, CART_ACTION, Cart } from '@/context/cartContext';
import Product, { IProduct } from '@/mongodb/models/Product';
import dbConnect from '@/mongodb/dbConnect';

type PageProps = {
	product: IProduct | null;
};
type pageParams = {
	slug: string | undefined;
};

export default function ProductInfo({ product }: PageProps) {
	const addToCartBtnRef = useRef(null);
	const qtyRef = useRef<HTMLSelectElement>(null);
	const { isOpen, onOpen } = useDisclosure();
	const { dispatch } = useContext(CartContext);

	function handleAddToCart() {
		if (qtyRef.current) {
			let newItem: Cart = {
				productName: product.name,
				productImgUrl: 'https://via.placeholder.com/1000x1000.png/09f/fff',
				productPrice: product.price,
				qty: +qtyRef.current.value,
			};
			dispatch({ type: CART_ACTION.ADD_CART, payload: newItem });

			onOpen();
		}
	}

	return (
		<>
			<Head>
				<title>{`${product.name} - DZPC`}</title>
			</Head>
			<Container
				maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
				paddingTop="1.5rem"
				paddingBottom="3rem"
			>
				{isOpen && (
					<Alert
						mb="4"
						status="success"
						variant="solid"
						fontSize={'sm'}
						color={'black'}
					>
						<Text>
							<strong>{product.name}</strong> has been successfully added to
							cart.
						</Text>
					</Alert>
				)}
				<Stack
					direction={{ base: 'column', lg: 'row' }}
					gap="1.5rem"
					marginBottom={{ sm: '3rem', lg: '6rem' }}
				>
					<Box
						flex={{ md: '1 0 50%' }}
						maxWidth="100%"
						maxH={{ sm: '500px', lg: '70%' }}
						minH="500px"
						position="relative"
					>
						<Image
							src="https://via.placeholder.com/1000x1000.png/09f/fff"
							alt="placeholder images"
							fill
							style={{
								objectFit: 'cover',
							}}
						/>
					</Box>
					<Box flex={{ md: '1 0 40%' }}>
						<VStack gap="0.5rem" alignItems="start">
							<Heading as={'h1'}>{product.name}</Heading>
							{/* <Box display="flex" mt="2" alignItems="center">
								{Array(5)
									.fill('')
									.map((_, i) => (
										<StarIcon
											key={i}
											color={i < 1 ? 'neon.blue' : 'gray.300'}
										/>
									))}
							</Box> */}
							<Box>
								<Text fontWeight="bold" fontSize="3xl">
									{new Intl.NumberFormat('us-ID', {
										style: 'currency',
										currency: 'USD',
									}).format(product.price)}
								</Text>
							</Box>
							<Center alignSelf="center">
								<Text>Buy</Text>
							</Center>
							<Divider />
							<Text>Stock: {product.stock}</Text>
							<Stack
								direction="row"
								w={{ base: '100%', lg: 'fit-content' }}
								marginBlock="3rem"
							>
								<Center>Qty:</Center>
								<Select ref={qtyRef} defaultValue={'1'} bg={'black'}>
									<option
										value="1"
										disabled={product.stock === 0}
										style={{ background: 'black' }}
									>
										1
									</option>
									<option
										value="2"
										disabled={product.stock < 2}
										style={{ background: 'black' }}
									>
										2
									</option>
									<option
										value="3"
										disabled={product.stock < 3}
										style={{ background: 'black' }}
									>
										3
									</option>
									<option
										value="4"
										disabled={product.stock < 4}
										style={{ background: 'black' }}
									>
										4
									</option>
									<option
										value="5"
										disabled={product.stock < 5}
										style={{ background: 'black' }}
									>
										5
									</option>
								</Select>
							</Stack>
							<Button
								w="100%"
								size="lg"
								bg="neon.blue"
								marginBlock="3rem"
								transition="transform 200ms ease"
								fontSize="1.1rem"
								_hover={{ transform: 'scale(1.03)' }}
								_active={{ transform: 'scale(0.97)' }}
								ref={addToCartBtnRef}
								onClick={handleAddToCart}
								isDisabled={product.stock === 0}
							>
								Add to cart
							</Button>

							<Box alignSelf="center">
								<Stack direction="row" justifyContent="center" fontSize="lg">
									<Text>Warranty - Parts & Services: 2 Years</Text>
								</Stack>
							</Box>
						</VStack>
					</Box>
				</Stack>

				{/* Key specs */}
				<Box>
					<Text fontSize={'4xl'} fontWeight={'bold'} mt={'4rem'} mb={'3rem'}>
						Key Specs
					</Text>
					<Flex flexGrow={1} direction={{ base: 'column', md: 'row' }} gap={4}>
						<Box
							w={'100%'}
							px={'1.5rem'}
							py="1.3rem"
							bgColor="whiteAlpha.100"
							rounded="md"
						>
							<Text fontWeight="bold" fontSize="1.3rem" marginBottom="1rem">
								Performance
							</Text>
							<Grid templateColumns="1fr 1fr" gap="0.7rem">
								{product.performance.map((item, index) => (
									<Flex
										key={index}
										flex="1 0"
										w="100%"
										rounded="md"
										overflow="hidden"
										textAlign="center"
									>
										<Flex
											w="100%"
											bgColor="grey"
											justifyContent={'center'}
											alignItems={'center'}
										>
											<Text fontWeight={'bold'}>{item.game}</Text>
										</Flex>
										<Box
											w="100%"
											h="100%"
											paddingBlock="1rem"
											margin="auto"
											bgColor="white"
										>
											<Flex direction="column" lineHeight="1.1">
												<Text fontSize="2xl" fontWeight="bold" color="green">
													{item.fps}
												</Text>
												<Text color="blackAlpha.900" fontSize="1.1rem">
													FPS
												</Text>
											</Flex>
										</Box>
									</Flex>
								))}
							</Grid>
							<Flex justifyContent={'end'}>
								<Text
									mt={'1.5rem'}
									px={'0.5rem'}
									rounded={'lg'}
									boxShadow={'outline'}
								>
									1080
								</Text>
							</Flex>
						</Box>
						<Box
							w={'100%'}
							mx={'auto'}
							p="1.5rem"
							bgColor="whiteAlpha.100"
							rounded="md"
						>
							<Grid rowGap={'0.3rem'}>
								{['CPU', 'Graphic', 'Memory', 'Storage'].map((item, index) => (
									<GridItem
										key={index}
										paddingBottom={'0.5rem'}
										borderBottom={'1px solid'}
										borderBottomColor={'whiteAlpha.300'}
									>
										<Text
											fontSize={'1.1rem'}
											fontWeight={'bold'}
											letterSpacing={'0.1rem'}
										>
											{product[item.toLowerCase()]}
										</Text>
										<Text letterSpacing="1px" color="whiteAlpha.800">
											{item}
										</Text>
									</GridItem>
								))}
							</Grid>
						</Box>
					</Flex>
				</Box>

				{/* product overview */}
				<Tabs mt={'3rem'}>
					<TabList>
						<Tab>Overview</Tab>
						<Tab>Specification</Tab>
						{/* <Tab>Reviews</Tab> */}
					</TabList>

					<TabPanels>
						{/* overview */}
						<TabPanel>
							<Grid templateColumns="150px 1fr 50px">
								<GridItem>
									<Text fontSize="1.2rem" fontWeight="bold">
										Details
									</Text>
								</GridItem>
								<GridItem>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Nesciunt exercitationem iure assumenda nulla minima vitae
									numquam cum, cumque doloremque obcaecati dolorem, accusantium
									quis sit itaque repudiandae consequatur saepe maiores quasi
									sapiente suscipit quibusdam doloribus aliquid placeat.
									Tempora, quisquam! Aspernatur, ullam!
								</GridItem>
							</Grid>
							<Divider marginBlock="1rem" />
							<Grid templateColumns="150px 1fr 50px">
								<GridItem>
									<Text fontSize="1.2rem" fontWeight="bold">
										In the box
									</Text>
								</GridItem>
								<GridItem>{product.slug}</GridItem>
								<GridItem>1</GridItem>
							</Grid>
						</TabPanel>

						{/* spesifikasi */}
						<TabPanel>
							<Text
								fontSize="2rem"
								fontWeight="bold"
								marginBottom="1rem"
								letterSpacing="2px"
							>
								Full Specs
							</Text>
							<Flex direction="column" fontSize={'lg'}>
								{[
									'CPU',
									'Graphic',
									'Memory',
									'Storage',
									'Motherboard',
									'Power',
									'Cooler',
									'Case',
								].map((item, index) => (
									<Box
										key={item + index}
										w={'full'}
										py={'2'}
										borderBottom={'1px solid'}
										borderBottomColor={'whiteAlpha.300'}
									>
										<Text
											fontSize={'1.1rem'}
											fontWeight={'bold'}
											letterSpacing={'0.1rem'}
										>
											{product[item.toLowerCase()]}
										</Text>
										<Text letterSpacing="1px" color="whiteAlpha.800">
											{item}
										</Text>
									</Box>
								))}
								<Box
									w={'full'}
									py={'2'}
									borderBottom={'1px solid'}
									borderBottomColor={'whiteAlpha.300'}
								>
									<Text
										fontSize={'1.1rem'}
										fontWeight={'bold'}
										letterSpacing={'0.1rem'}
									>
										Windows 11 Home
									</Text>
									<Text letterSpacing="1px" color="whiteAlpha.800">
										Software
									</Text>
								</Box>
								<Box
									w={'full'}
									py={'2'}
									borderBottom={'1px solid'}
									borderBottomColor={'whiteAlpha.300'}
								>
									<Text
										fontSize={'1.1rem'}
										fontWeight={'bold'}
										letterSpacing={'0.1rem'}
									>
										2 Years (Parts & Services)
									</Text>
									<Text letterSpacing="1px" color="whiteAlpha.800">
										Warranty
									</Text>
								</Box>
							</Flex>
						</TabPanel>

						{/* reviews */}
						{/* <TabPanel>
							<Stack direction="row" alignItems="center" gap="2">
								<Text fontSize={'2.5rem'} fontWeight={'bold'}>
									4
								</Text>
								<Box display="flex" mt="2" alignItems="center">
									{Array(5)
										.fill('')
										.map((_, i) => (
											<StarIcon
												key={i}
												color={i < 4 ? 'neon.blue' : 'gray.300'}
												fontSize={'1.3rem'}
											/>
										))}
								</Box>
								<Text color={'whiteAlpha.700'}>Total Reviews</Text>
							</Stack>
							<Box>
								<Select
									w={{ base: '100%', md: 'fit-content' }}
									my="1.5rem"
									defaultValue={'all'}
								>
									<option value="all">All</option>
									<option value="5">5</option>
									<option value="4">4</option>
									<option value="3">3</option>
									<option value="2">2</option>
									<option value="1">1</option>
								</Select>
								<Divider />
							</Box>

							<Grid
								templateColumns={{ sm: '1fr', md: '1fr 1fr' }}
								gap="1rem"
								my="1.5rem"
							>
								{Array(2)
									.fill('')
									.map((_, i) => (
										<GridItem key={i}>
											<Card maxW="100%">
												<CardHeader>
													<Flex justifyContent="space-between">
														<strong>Username</strong>
														<Text>date post</Text>
													</Flex>
													<Box display="flex" mt="2" alignItems="center">
														{Array(5)
															.fill('')
															.map((_, i) => (
																<StarIcon
																	key={i}
																	color={i < 4 ? 'neon.blue' : 'gray.300'}
																/>
															))}
													</Box>
												</CardHeader>

												<CardBody paddingBlock="0">
													<strong>Subject</strong>
													<Text>
														With Chakra UI, I wanted to sync the speed of
														development with the speed of design. I wanted the
														developer to be just as excited as the designer to
														create a screen.
													</Text>
												</CardBody>

												<CardFooter justify="space-between" flexWrap="wrap">
													<Popover placement="right" isLazy gutter={3}>
														<PopoverTrigger>
															<Button
																size="sm"
																variant="ghost"
																leftIcon={<ExternalLinkIcon />}
															>
																Share
															</Button>
														</PopoverTrigger>
														<PopoverContent w={'fit-content'}>
															<PopoverBody>
																<Flex gap="5">
																	<Tooltip
																		label="twitter"
																		placement="top"
																		shouldWrapChildren
																	>
																		<NextLink
																			href={
																				'https://twitter.com/intent/tweet?url=dzpc.com&text=reviews&via=dzpc&hashtags=prebuilt,gamingpc,dzpc'
																			}
																			passHref
																			legacyBehavior
																		>
																			<a
																				href="https://twitter.com/intent/tweet?url=dzpc.com&text=reviews&via=dzpc&hashtags=prebuilt,gamingpc,dzpc"
																				target="_blank"
																				rel="noopener noreferrer"
																			>
																				<FaTwitter />
																			</a>
																		</NextLink>
																	</Tooltip>
																	<Tooltip
																		label="instagram"
																		placement="top"
																		shouldWrapChildren
																	>
																		<NextLink
																			href={
																				'https://twitter.com/intent/tweet?url=dzpc.com&text=reviews&via=dzpc&hashtags=prebuilt,gamingpc,dzpc'
																			}
																			passHref
																			legacyBehavior
																		>
																			<a
																				href="https://twitter.com/intent/tweet?url=dzpc.com&text=reviews&via=dzpc&hashtags=prebuilt,gamingpc,dzpc"
																				target="_blank"
																				rel="noopener noreferrer"
																			>
																				<FaInstagram />
																			</a>
																		</NextLink>
																	</Tooltip>
																</Flex>
															</PopoverBody>
														</PopoverContent>
													</Popover>

													<Flex alignItems="center" gap={4}>
														<Flex gap={1}>
															<Icon
																as={HiThumbUp}
																size="sm"
																role="button"
																alignSelf="center"
															>
																Like
															</Icon>
															<Text alignSelf="center">0</Text>
														</Flex>
														<Flex gap={1}>
															<Icon
																as={HiThumbDown}
																size="sm"
																role="button"
																alignSelf="center"
															>
																Dislike
															</Icon>
															<Text alignSelf="center">0</Text>
														</Flex>
													</Flex>
												</CardFooter>
											</Card>
										</GridItem>
									))}
							</Grid>
						</TabPanel> */}
					</TabPanels>
				</Tabs>
			</Container>
		</>
	);
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<pageParams>): Promise<
	GetStaticPropsResult<PageProps>
> {
	await dbConnect();

	const allProducts: IProduct[] = await Product.find();
	const matchProduct: IProduct = allProducts.find(
		(x) => x.slug === params.slug
	);

	return {
		props: { product: JSON.parse(JSON.stringify(matchProduct)) },
	};
}

export async function getStaticPaths() {
	await dbConnect();

	const allProd: IProduct[] = await Product.find();
	const productsSlug: string[] = allProd.map((x) => x.slug);

	const paths = productsSlug.map((item) => ({
		params: {
			slug: item,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}
