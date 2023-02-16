import {
	Container,
	Grid,
	GridItem,
	Heading,
	Box,
	SimpleGrid,
	Text,
	Stack,
	Divider,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';

interface FeatureProps {
	title: string;
	text: string;
}

const Feature = ({ title, text }: FeatureProps) => {
	return (
		<Stack>
			<Text fontWeight={'bold'}>{title}</Text>
			<Text color={'whiteAlpha.800'}>{text}</Text>
		</Stack>
	);
};

export default function About() {
	return (
		<>
			<Head>
				<title>About - DZ PC</title>
			</Head>
			<main>
				<Container
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					paddingBottom="3rem"
				>
					{/* hero section */}
					<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
						<Grid
							w="100%"
							py="3rem"
							templateColumns={{
								sm: '1fr',
								md: '1fr 1fr',
							}}
							gap="4"
						>
							<GridItem>
								<Heading
									fontSize="3rem"
									letterSpacing="0.15rem"
									textAlign={{ base: 'center', md: 'start' }}
								>
									Our purpose is to help people build their PC gaming without
									the confuse of choosing individual parts.
								</Heading>
							</GridItem>
							<GridItem h="500px" position={'relative'}>
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
					</Stack>

					{/* mission statement */}
					<Box py={4}>
						<Heading my={6} fontSize={'4xl'}>
							Our mission
						</Heading>
						<Divider />
						<SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} my={6}>
							<Feature
								title={'Lifetime Support'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<Feature
								title={'Unlimited Donations'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<Feature
								title={'Instant Delivery'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<Feature
								title={'Instant Delivery'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
						</SimpleGrid>
					</Box>

					{/* values */}
					<Box py={4}>
						<Heading my={6} fontSize={'4xl'}>
							Our values
						</Heading>
						<Divider />
						<SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} my={6}>
							<Feature
								title={'Lifetime Support'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<Feature
								title={'Unlimited Donations'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<Feature
								title={'Instant Delivery'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
							<Feature
								title={'Instant Delivery'}
								text={
									'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
								}
							/>
						</SimpleGrid>
					</Box>

					{/* brief history */}
					<Box py={4}>
						<Heading my={6} fontSize={'4xl'}>
							Our history
						</Heading>
						<Divider />
						<Text my={6} color="whiteAlpha.800">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
							eligendi delectus laudantium molestias sed vero! Ex exercitationem
							eius cumque fugiat est sapiente, laborum, cum dolorem itaque,
							animi necessitatibus adipisci cupiditate voluptates autem?
							Explicabo quia maxime eligendi quod, quaerat rerum iure, inventore
							corrupti temporibus incidunt nemo asperiores praesentium,
							assumenda quo a.
						</Text>
					</Box>

					{/* company contact information */}
					<Box py={4}>
						<Heading my={6} fontSize={'4xl'}>
							Contact Us
						</Heading>
						<Divider />
						<SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} my={6}>
							<Stack>
								<Text fontWeight={'bold'}>Address</Text>
								<Text color="whiteAlpha.800">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
									aperiam.
								</Text>
								<Text fontWeight={'bold'}>Phone</Text>
								<Text color="whiteAlpha.800">000-000-0000</Text>
							</Stack>
						</SimpleGrid>
					</Box>
				</Container>
			</main>
		</>
	);
}
