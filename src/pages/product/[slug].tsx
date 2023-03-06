import { ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Center,
	Container,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	LinkOverlay,
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
import { useRouter } from 'next/router';
import { useRef, useState, useContext } from 'react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { CartContext, CART_ACTION, Cart } from '@/context/cartContext';

type slugProps = {
	slug: string | undefined;
};
type pageParams = {
	slug: string | undefined;
};

export default function ProductInfo(props: slugProps) {
	const [itemInfo, setItemInfo] = useState<Cart>({
		productName: '',
		productImgUrl: '',
		productPrice: 0,
		qty: 0,
	});
	const [reviewsLikeCount, setReviewsLikeCount] = useState(false);
	const [reviewsDisikeCount, setReviewsDislikeCount] = useState(false);
	const addToCartBtnRef = useRef(null);
	const qtyRef = useRef<HTMLSelectElement>(null);
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { state: cartItems, dispatch } = useContext(CartContext);

	const queryUrl = router.query.slug;
	const series: string = (queryUrl as string).split('-')[0];
	const seriesCapitalize: string =
		series.charAt(0).toUpperCase() + series.slice(1);
	// starter-plus-pc
	// console.log(props?.slug?.includes('plus'));

	const formatQueryString = (query: string | undefined): string => {
		if (!query) return '';
		const split: string[] = query.split('-');
		let result: string[] = [];
		split.forEach((str) => {
			result.push(str.charAt(0).toUpperCase() + str.slice(1));
		});

		return result.join(' ');
	};

	function handleAddToCart() {
		if (qtyRef.current) {
			let newItem: Cart = {
				productName: formatQueryString(queryUrl as string),
				productImgUrl: 'https://via.placeholder.com/1000x1000.png/09f/fff',
				productPrice: 17000000,
				qty: +qtyRef.current.value,
			};
			dispatch({ type: CART_ACTION.ADD_CART, payload: newItem });
			setItemInfo(newItem);

			if (parseInt(qtyRef?.current?.value) === 1) {
				onOpen();
				return;
			} else {
				router.push('/cart');
				return;
			}
		}
	}

	const handleReviewsLikeBtn = (action: string): void => {
		switch (action) {
			case 'like':
				setReviewsLikeCount((prev) => !prev);
				if (reviewsDisikeCount) setReviewsDislikeCount(false);
				break;

			case 'dislike':
				setReviewsDislikeCount((prev) => !prev);
				if (reviewsLikeCount) setReviewsLikeCount(false);
				break;

			default:
				break;
		}
	};

	// TODO: refactor to own component
	function recommendItems() {
		const currentPage = props?.slug;
		const items = {
			text: [] as string[],
			path: [] as string[],
		};
		if (!currentPage) return items;

		if (currentPage.includes('starter')) {
			if (currentPage.includes('plus')) {
				items.text.push('Starter Pc');
				items.text.push('Starter Pro Pc');
				items.text.push('Streaming Pc');

				items.path.push('starter-pc');
				items.path.push('starter-pro-pc');
				items.path.push('streaming-pc');
			} else {
				// current page is starter-pro-pc
				items.text.push('Streaming Pc');
				items.text.push('Streaming Plus Pc');
				items.text.push('Creator Pc');

				items.path.push('streaming-pc');
				items.path.push('streaming-plus-pc');
				items.path.push('creator-pc');
			}

			// current page is starter-pc
			items.text.push('Starter Pro Pc');
			items.text.push('Streaming Pc');
			items.text.push('Creator Pc');

			items.path.push('starter-pro-pc');
			items.path.push('streaming-pc');
			items.path.push('creator-pc');
		} else if (currentPage.includes('streaming')) {
			if (currentPage.includes('plus')) {
				items.text.push('Starter Pro Pc');
				items.text.push('Streaming Pro Pc');
				items.text.push('Creator Pc');

				items.path.push('starter-pro-pc');
				items.path.push('streaming-pro-pc');
				items.path.push('creator-pc');
			} else {
				// current page is streaming-pro-pc
				items.text.push('Streaming Plus Pc');
				items.text.push('Creator Pc');
				items.text.push('Creator Plus Pc');

				items.path.push('streaming-plus-pc');
				items.path.push('creator-pc');
				items.path.push('creator-plus-pc');
			}
			// current page is streaming-pc
			items.text.push('Starter Pro Pc');
			items.text.push('Streaming Plus Pc');
			items.text.push('Creator Pc');

			items.path.push('starter-pro-pc');
			items.path.push('streaming-plus-pc');
			items.path.push('creator-pc');
		} else if (currentPage.includes('creator')) {
			if (currentPage.includes('plus')) {
				items.text.push('Starter Pro Pc');
				items.text.push('Streaming Pro Pc');
				items.text.push('Creator Pro Pc');

				items.path.push('starter-pro-pc');
				items.path.push('streaming-pro-pc');
				items.path.push('creator-pro-pc');
			} else {
				// current page is creator-pro-pc
				items.text.push('Streaming Plus Pc');
				items.text.push('Streaming Pro Pc');
				items.text.push('Creator Plus Pc');

				items.path.push('streaming-plus-pc');
				items.path.push('streaming-pro-pc');
				items.path.push('creator-plus-pc');
			}
			// current page is creator-pc
			items.text.push('Starter Pro Pc');
			items.text.push('Streaming Pro Pc');
			items.text.push('Creator Plus Pc');

			items.path.push('starter-pro-pc');
			items.path.push('streaming-pro-pc');
			items.path.push('creator-plus-pc');
		}

		// console.log(items);
		return items;
	}

	return (
		<>
			<Head>
				<title>{formatQueryString(props?.slug)}</title>
			</Head>
			<Container
				maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
				paddingTop="1.5rem"
				paddingBottom="3rem"
			>
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
							<Heading>{formatQueryString(queryUrl as string)}</Heading>
							<Box display="flex" mt="2" alignItems="center">
								{Array(5)
									.fill('')
									.map((_, i) => (
										<StarIcon
											key={i}
											color={i < 1 ? 'neon.blue' : 'gray.300'}
										/>
									))}
							</Box>
							<Box>
								<Text>Mid-Tower PC</Text>
								<Text fontWeight="bold" fontSize="3xl">
									{new Intl.NumberFormat('id-ID', {
										style: 'currency',
										currency: 'IDR',
									}).format(17000000)}
								</Text>
							</Box>
							<strong>Series</strong>
							<Select defaultValue={props?.slug}>
								<option
									value={series + '-pc'}
									onClick={(e) =>
										router.push(`/product/${e.currentTarget.value}`)
									}
								>
									{seriesCapitalize + ' Pc'}
								</option>
								<option
									value={series + '-plus-pc'}
									onClick={(e) =>
										router.push(`/product/${e.currentTarget.value}`)
									}
								>
									{seriesCapitalize + ' Plus Pc'}
								</option>
								<option
									value={series + '-pro-pc'}
									onClick={(e) =>
										router.push(`/product/${e.currentTarget.value}`)
									}
								>
									{seriesCapitalize + ' Pro Pc'}
								</option>
							</Select>
							<Center alignSelf="center">
								<Text>Buy</Text>
							</Center>
							<Divider />
							<Stack
								direction="row"
								w={{ base: '100%', lg: 'fit-content' }}
								marginBlock="3rem"
							>
								<Center>Qty:</Center>
								<Select ref={qtyRef} defaultValue={'1'}>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
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
							>
								Add to cart
							</Button>

							{/* start of add to cart drawer */}
							<Drawer
								isOpen={isOpen}
								placement="right"
								onClose={onClose}
								finalFocusRef={addToCartBtnRef}
								size={{ base: 'xs', md: 'sm' }}
							>
								<DrawerOverlay />
								<DrawerContent>
									<DrawerHeader>
										Added to cart
										<DrawerCloseButton top="4" right="6" />
									</DrawerHeader>
									<Divider />

									<DrawerBody position={'relative'} py="4">
										<Flex
											gap={{ base: 2, md: 8 }}
											w="100%"
											height={'max-content'}
											justifyContent={'space-between'}
										>
											<Box w={'64px'} h="64px" position="relative">
												<Image
													alt="image placeholder"
													fill
													src={
														'https://via.placeholder.com/1000x1000.png/09f/fff'
													}
												/>
											</Box>
											<Stack flexGrow={1}>
												<Text
													as={'span'}
													fontSize={'1.1rem'}
													fontWeight={'bold'}
												>
													{/* Product name */}
													{itemInfo.productName}
												</Text>
											</Stack>
											<Text color={'whiteAlpha.700'}>
												{new Intl.NumberFormat('id-ID', {
													style: 'currency',
													currency: 'IDR',
												}).format(itemInfo.productPrice)}
											</Text>
										</Flex>
										<Button
											position={'fixed'}
											bottom="5.5rem"
											w="calc(100% - 48px)"
											bg="neon.blue"
											transition="transform 200ms ease"
											fontSize="1.1rem"
											size="lg"
											_hover={{ transform: 'scale(1.02)' }}
											_active={{ transform: 'scale(0.97)' }}
											onClick={() => {
												router.push('/cart');
												onClose();
											}}
										>
											View Cart
										</Button>
									</DrawerBody>
								</DrawerContent>
							</Drawer>
							{/* end of add to cart drawer */}

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
								<Flex
									flex="1 0"
									w="100%"
									rounded="md"
									overflow="hidden"
									textAlign="center"
								>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="grey"
									>
										<Text fontSize="1.5rem">Game</Text>
									</Box>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="white"
									>
										<Flex direction="column" lineHeight="1.1">
											<Text fontSize="1.5rem" fontWeight="bold" color="green">
												80
											</Text>
											<Text color="blackAlpha.900" fontSize="1.1rem">
												FPS
											</Text>
										</Flex>
									</Box>
								</Flex>
								<Flex
									flex="1 0"
									w="100%"
									rounded="md"
									overflow="hidden"
									textAlign="center"
								>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="grey"
									>
										<Text fontSize="1.5rem">Game</Text>
									</Box>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="white"
									>
										<Flex direction="column" lineHeight="1.1">
											<Text fontSize="1.5rem" fontWeight="bold" color="green">
												80
											</Text>
											<Text color="blackAlpha.900" fontSize="1.1rem">
												FPS
											</Text>
										</Flex>
									</Box>
								</Flex>
								<Flex
									flex="1 0"
									w="100%"
									rounded="md"
									overflow="hidden"
									textAlign="center"
								>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="grey"
									>
										<Text fontSize="1.5rem">Game</Text>
									</Box>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="white"
									>
										<Flex direction="column" lineHeight="1.1">
											<Text fontSize="1.5rem" fontWeight="bold" color="green">
												80
											</Text>
											<Text color="blackAlpha.900" fontSize="1.1rem">
												FPS
											</Text>
										</Flex>
									</Box>
								</Flex>
								<Flex
									flex="1 0"
									w="100%"
									rounded="md"
									overflow="hidden"
									textAlign="center"
								>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="grey"
									>
										<Text fontSize="1.5rem">Game</Text>
									</Box>
									<Box
										w="100%"
										h="100%"
										paddingBlock="1rem"
										margin="auto"
										bgColor="white"
									>
										<Flex direction="column" lineHeight="1.1">
											<Text fontSize="1.5rem" fontWeight="bold" color="green">
												80
											</Text>
											<Text color="blackAlpha.900" fontSize="1.1rem">
												FPS
											</Text>
										</Flex>
									</Box>
								</Flex>
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
								<GridItem
									paddingBottom={'0.5rem'}
									borderBottom={'1px solid'}
									borderBottomColor={'whiteAlpha.300'}
								>
									<Text
										fontSize={'1.1rem'}
										fontWeight={'bold'}
										letterSpacing={'0.1rem'}
									>
										Intel Core i5-10400F
									</Text>
									<Text letterSpacing="1px" color="whiteAlpha.800">
										CPU
									</Text>
								</GridItem>
								<GridItem
									paddingBottom={'0.5rem'}
									borderBottom={'1px solid'}
									borderBottomColor={'whiteAlpha.300'}
								>
									<Text
										fontSize={'1.1rem'}
										fontWeight={'bold'}
										letterSpacing={'0.1rem'}
									>
										NVIDIA GeForce® RTX™ 3060 Ti
									</Text>
									<Text letterSpacing="1px" color="whiteAlpha.800">
										GPU
									</Text>
								</GridItem>
								<GridItem
									paddingBottom={'0.5rem'}
									borderBottom={'1px solid'}
									borderBottomColor={'whiteAlpha.300'}
								>
									<Text
										fontSize={'1.1rem'}
										fontWeight={'bold'}
										letterSpacing={'0.1rem'}
									>
										3200 MHz 16 GB (2 x 8 GB)
									</Text>
									<Text letterSpacing="1px" color="whiteAlpha.800">
										RAM
									</Text>
								</GridItem>
								<GridItem
									paddingBottom={'0.5rem'}
									borderBottom={'1px solid'}
									borderBottomColor={'whiteAlpha.300'}
								>
									<Text
										fontSize={'1.1rem'}
										fontWeight={'bold'}
										letterSpacing={'0.1rem'}
									>
										SSD NVMe M.2 1 TB
									</Text>
									<Text letterSpacing="1px" color="whiteAlpha.800">
										Storage
									</Text>
								</GridItem>
							</Grid>
						</Box>
					</Flex>
				</Box>

				{/* product overview */}
				<Tabs mt={'3rem'}>
					<TabList>
						<Tab>Overview</Tab>
						<Tab>Spesifikasi</Tab>
						<Tab>Reviews</Tab>
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
								<GridItem>{props?.slug}</GridItem>
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
								Spesifikasi
							</Text>
							<Grid
								templateColumns={{ sm: '1fr', md: '1fr 1fr' }}
								gridAutoFlow={'row dense'}
								columnGap="3rem"
							>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Key Specs
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>CPU:</strong> Intel i5-10400F
									</Text>
									<Text>
										<strong>GPU:</strong> GeForce® RTX™ 3060 Ti
									</Text>
									<Text>
										<strong>RAM:</strong> 3200 MHz (max speed) 16 GB (2 x 8 GB)
									</Text>
									<Text>
										<strong>Storage:</strong> SSD M.2 1 TB
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Software
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Operating System:</strong> Windows 11 Home
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Processor
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Brand:</strong> Intel
									</Text>
									<Text>
										<strong>Series:</strong> i5-10400F
									</Text>
									<Text>
										<strong>Number of Cores:</strong> 6
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Graphic
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Series:</strong> GeForce® RTX™ 3060 Ti
									</Text>
									<Text>
										<strong>Manufactures:</strong> NVIDIA
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Memory
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Model:</strong> Team T-FORCE Vulcan Z
									</Text>
									<Text>
										<strong>Capacity:</strong> 16 GB (2x8GB)
									</Text>
									<Text>
										<strong>Speed: </strong> 3200 MHz
									</Text>
									<Text>
										<strong>Interface:</strong> DDR4
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Storage
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Model:</strong> Product brand may vary
									</Text>
									<Text>
										<strong>Capacity:</strong> 1 TB
									</Text>
									<Text>
										<strong>Form Factor: </strong> NVMe M.2 SSD
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Motherboard
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Model:</strong> ASUS Prime B560-PLUS AC-HES
									</Text>
									<Text>
										<strong>Form Factor:</strong> ATX
									</Text>
									<Text>
										<strong>Wi-Fi:</strong> Included
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										CPU Cooler
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Model:</strong> DEEPCOOL GAMMAX GTE V2
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Power
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Model:</strong> Product brand may vary
									</Text>
									<Text>
										<strong>Wattage:</strong> 650 W
									</Text>
									<Text>
										<strong>Rating:</strong> 80+ Bronze
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Case
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Model:</strong> Product brand may vary
									</Text>
									<Text>
										<strong>Motherboard Support:</strong> Mini-ITX, MicroATX,
										ATX
									</Text>
									<Text>
										<strong>Front I/O: </strong>
										1x USB 3.2 Gen 1 Type-A / 1x USB 3.2 Gen 2 Type-C / 1x
										Headset Audio Jack
									</Text>
								</GridItem>
								<GridItem mb="2rem">
									<Text
										fontSize="1.1rem"
										fontWeight="bold"
										letterSpacing="2px"
										color="whiteAlpha.800"
									>
										Warranty
									</Text>
									<Divider marginBlock="3" />
									<Text>
										<strong>Part:</strong> 2 Years
									</Text>
									<Text>
										<strong>Service:</strong> 2 Years
									</Text>
								</GridItem>
							</Grid>
						</TabPanel>

						{/* reviews */}
						<TabPanel>
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
								{Array(10)
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
																onClick={(e) => handleReviewsLikeBtn('like')}
															>
																Like
															</Icon>
															<Text alignSelf="center">
																{reviewsLikeCount ? 1 : 0}
															</Text>
														</Flex>
														<Flex gap={1}>
															<Icon
																as={HiThumbDown}
																size="sm"
																role="button"
																alignSelf="center"
																onClick={(e) => handleReviewsLikeBtn('dislike')}
															>
																Dislike
															</Icon>
															<Text alignSelf="center">
																{reviewsDisikeCount ? 1 : 0}
															</Text>
														</Flex>
													</Flex>
												</CardFooter>
											</Card>
										</GridItem>
									))}
							</Grid>
						</TabPanel>
					</TabPanels>
				</Tabs>

				{/* recommend items */}
				<Box mt={'4rem'}>
					<Text fontSize={'4xl'} fontWeight={'bold'}>
						You may also like
					</Text>
					<Divider my={5} />
					<Flex
						direction={{ base: 'column', md: 'row' }}
						flexGrow={1}
						justifyContent={'center'}
						alignItems={'center'}
						gap={5}
					>
						{Array(3)
							.fill('')
							.map((_, i) => (
								<Card
									w={{ base: 'full', md: 'auto' }}
									maxW={'100%'}
									bg="transparent"
									rounded="lg"
									overflow="hidden"
									border="1px solid grey"
									flexGrow={1}
									key={i}
								>
									<CardHeader
										position="relative"
										w="70%"
										h="250px"
										marginInline="auto"
										marginBlock="2rem"
										padding="0"
									>
										<Image
											src="https://images.unsplash.com/photo-1627281795244-0f5db916344a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGNvbXB1dGVyJTIwaGFyZHdhcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
											alt="Green double couch with wooden legs"
											fill
											style={{
												objectFit: 'cover',
											}}
										/>
									</CardHeader>
									<CardBody paddingBlock="2" bg="accent.shadeGrey">
										<LinkOverlay
											as={NextLink}
											href={`/product/${recommendItems().path[i]}`}
										>
											<Stack>
												<Heading size="md">{recommendItems().text[i]}</Heading>
												<Text>Mid-tower prebuild PC</Text>
											</Stack>
										</LinkOverlay>
									</CardBody>
									<CardFooter paddingTop="3" bg="accent.shadeGrey">
										<Text>
											{new Intl.NumberFormat('id-ID', {
												style: 'currency',
												currency: 'IDR',
											}).format(15000000)}
										</Text>
									</CardFooter>
								</Card>
							))}
					</Flex>
				</Box>
			</Container>
		</>
	);
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<pageParams>): Promise<
	GetStaticPropsResult<slugProps>
> {
	const slug = params?.slug;

	return {
		props: { slug },
	};
}

export async function getStaticPaths() {
	const series: string[] = [
		'starter-pc',
		'starter-plus-pc',
		'starter-pro-pc',
		'streaming-pc',
		'streaming-plus-pc',
		'streaming-pro-pc',
		'creator-pc',
		'creator-plus-pc',
		'creator-pro-pc',
	];
	const paths = series.map((item) => ({
		params: {
			slug: item,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}
