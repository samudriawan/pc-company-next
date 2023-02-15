import { StarIcon } from '@chakra-ui/icons';
import {
	Box,
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
	Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';

export default function Reviews() {
	return (
		<>
			<Head>
				<title>Reviews - DZ PC</title>
			</Head>
			<main>
				<Container
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					paddingTop="1rem"
					paddingBottom="3rem"
				>
					{/* headers */}
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
								Reviews
							</Heading>
						</GridItem>
						<GridItem h={{ base: '300px', md: '200px' }} position={'relative'}>
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

					{/* content */}
					<Heading>Reviews</Heading>
					<Flex alignItems={'center'} gap="4" my="5">
						<Box display="flex" alignItems="center">
							{Array(5)
								.fill('')
								.map((_, i) => (
									<StarIcon
										key={i}
										fontSize="1.3rem"
										color={i < 5 ? 'neon.blue' : 'gray.300'}
									/>
								))}
						</Box>
						<Center>
							<Text color={'whiteAlpha.800'} textAlign="center">
								Total Reviews
							</Text>
						</Center>
					</Flex>

					<Grid
						templateColumns={{ sm: '1fr', md: '1fr 1fr' }}
						gap="1rem"
						my="1.5rem"
					>
						{Array(5)
							.fill('')
							.map((_, i) => (
								<GridItem key={i}>
									<Card maxW="100%">
										<CardHeader py="4">
											<Flex justifyContent="space-between">
												<strong>Username</strong>
												<Text fontStyle={'italic'}>date post</Text>
											</Flex>
											<Box display="flex" mt="4" alignItems="center">
												{Array(5)
													.fill('')
													.map((_, i) => (
														<StarIcon
															key={i}
															fontSize="1.2rem"
															marginEnd={1}
															color={i < 4 ? 'neon.blue' : 'gray.300'}
														/>
													))}
											</Box>
										</CardHeader>

										<CardBody pt="0" pb="7">
											<Text>
												With Chakra UI, I wanted to sync the speed of
												development with the speed of design. I wanted the
												developer to be just as excited as the designer to
												create a screen.
											</Text>
										</CardBody>

										<Divider w="92%" mx="auto" />
										<CardFooter pt="1" flexWrap="wrap">
											<Text color={'whiteAlpha.700'}>Product name</Text>
										</CardFooter>
									</Card>
								</GridItem>
							))}
					</Grid>
				</Container>
			</main>
		</>
	);
}
