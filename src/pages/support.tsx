import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	Box,
	Container,
	Divider,
	Grid,
	GridItem,
	Heading,
	Link,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { default as NextLink } from 'next/link';

interface textGroupProps {
	title: string;
	text: string;
}

const TextGroup = ({ title, text }: textGroupProps) => {
	return (
		<Stack>
			<Text fontSize={'1.5rem'} fontWeight={'bold'}>
				{title}
			</Text>
			<Text color={'whiteAlpha.800'}>{text}</Text>
		</Stack>
	);
};

export default function Support() {
	return (
		<>
			<Head>
				<title>Support - DZ PC</title>
			</Head>
			<main>
				<Container
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					paddingTop="1rem"
					paddingBottom="3rem"
				>
					{/* header */}
					<Grid
						w="100%"
						p="2rem"
						templateColumns={{
							sm: '1fr',
							md: 'repeat(12, minmax(0, 1fr))',
						}}
						gap="4"
						bg="whiteAlpha.200"
					>
						<GridItem gridColumn="2/span 6">
							<Stack>
								<Heading
									fontSize="4rem"
									letterSpacing="0.15rem"
									textAlign={{ base: 'center', md: 'start' }}
								>
									Support
								</Heading>
								<Text fontSize="1.5rem" color="whiteAlpha.700">
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Voluptas, ex.
								</Text>
							</Stack>
						</GridItem>
						<GridItem h="250px" position={'relative'} gridColumn="span 5">
							<Image
								alt="image placeholder"
								fill
								src={'https://via.placeholder.com/1000x1000.png/09f/fff'}
								style={{
									objectFit: 'cover',
								}}
							/>
						</GridItem>
					</Grid>

					{/* our values */}
					<Box py={4}>
						<Heading my={6} fontSize={'4xl'}>
							Our values
						</Heading>
						<Divider />
						<SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} my={6}>
							<TextGroup
								title={'Lifetime Support'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<TextGroup
								title={'Unlimited Donations'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<TextGroup
								title={'Instant Delivery'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<TextGroup
								title={'Instant Delivery'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
						</SimpleGrid>
					</Box>

					{/* company contact information */}
					<Box py={4}>
						<Grid
							templateColumns={{ base: '1fr', md: 'repeat(12,minmax(0,1fr))' }}
							gap={4}
							my={6}
						>
							{/* contact info */}
							<Box gridColumn={'span 4'}>
								<Heading my={6} fontSize={'4xl'}>
									Contact Us
								</Heading>
								<Divider />
								<SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} my={6}>
									<Stack>
										<Text fontWeight={'bold'}>Address</Text>
										<Text color="whiteAlpha.800">
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Hic, aperiam.
										</Text>
										<Text fontWeight={'bold'}>Phone</Text>
										<Text color="whiteAlpha.800">000-000-0000</Text>
									</Stack>
								</SimpleGrid>
							</Box>

							{/* faq */}
							<Box gridColumn={'5/ -1'} p={4} bg="whiteAlpha.200">
								<SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} my={6}>
									<Box>
										<Text fontWeight={'bold'}>Customer Support</Text>
										<Text mt={2} mb={4}>
											Lorem ipsum dolor, sit amet consectetur adipisicing elit.
											Debitis, cumque?
										</Text>
										<Link as={NextLink} href="#" color={'neon.shadeBlue'}>
											Customer Support <ChevronRightIcon />
										</Link>
									</Box>
									<Box>
										<Text fontWeight={'bold'}>Support Center</Text>
										<Text mt={2} mb={4}>
											Lorem ipsum dolor, sit amet consectetur adipisicing elit.
											Debitis, cumque?
										</Text>
										<Link as={NextLink} href="#" color={'neon.shadeBlue'}>
											Support Center <ChevronRightIcon />
										</Link>
									</Box>
									<Box>
										<Text fontWeight={'bold'}>Issue Request</Text>
										<Text mt={2} mb={4}>
											Lorem ipsum dolor, sit amet consectetur adipisicing elit.
											Debitis, cumque?
										</Text>
										<Link as={NextLink} href="#" color={'neon.shadeBlue'}>
											Submit a request <ChevronRightIcon />
										</Link>
									</Box>
									<Box>
										<Text fontWeight={'bold'}>FAQ</Text>
										<Text mt={2} mb={4}>
											Lorem ipsum dolor, sit amet consectetur adipisicing elit.
											Debitis, cumque?
										</Text>
										<Link as={NextLink} href="#" color={'neon.shadeBlue'}>
											FAQ <ChevronRightIcon />
										</Link>
									</Box>
								</SimpleGrid>
							</Box>
						</Grid>
					</Box>
				</Container>
			</main>
		</>
	);
}
