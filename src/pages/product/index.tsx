import { default as NextLink } from 'next/link';
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Container,
	Heading,
	Link,
	LinkOverlay,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

function Product() {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Collection - DZ Prebuilt PC</title>
			</Head>
			<main>
				<Container
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					paddingTop="1rem"
					paddingBottom="3rem"
				>
					{/* starter pc series card */}
					<Box>
						<Heading marginBottom="2rem">Starter Series</Heading>
						<Stack
							w="100%"
							direction="row"
							wrap="wrap"
							justifyContent={{ sm: 'center', md: 'space-between' }}
							gap="5"
						>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/starter-pc'}>
										<Stack>
											<Heading size="md">Starter PC</Heading>
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
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/starter-plus-pc'}>
										<Stack>
											<Heading size="md">Starter Plus PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(17000000)}
									</Text>
								</CardFooter>
							</Card>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/starter-pro-pc'}>
										<Stack>
											<Heading size="md">Starter Pro PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(19000000)}
									</Text>
								</CardFooter>
							</Card>
						</Stack>
					</Box>

					{/* Streaming pc series card */}
					<Box marginTop="3rem">
						<Heading marginBottom="2rem">Streaming Series</Heading>
						<Stack
							w="100%"
							direction="row"
							wrap="wrap"
							justifyContent={{ sm: 'center', md: 'space-between' }}
							gap="5"
						>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/streaming-pc'}>
										<Stack>
											<Heading size="md">Streaming PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(20000000)}
									</Text>
								</CardFooter>
							</Card>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay
										as={NextLink}
										href={'/product/streaming-plus-pc'}
									>
										<Stack>
											<Heading size="md">Streaming Plus PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(23000000)}
									</Text>
								</CardFooter>
							</Card>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
								ms="0"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/streaming-pro-pc'}>
										<Stack>
											<Heading size="md">Streaming Pro PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(27000000)}
									</Text>
								</CardFooter>
							</Card>
						</Stack>
					</Box>

					{/* Creator pc series card */}
					<Box marginTop="3rem">
						<Heading marginBottom="2rem">Creator Series</Heading>
						<Stack
							w="100%"
							direction="row"
							wrap="wrap"
							justifyContent={{ sm: 'center', md: 'space-between' }}
							gap="5"
						>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/creator-pc'}>
										<Stack>
											<Heading size="md">Creator PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(30000000)}
									</Text>
								</CardFooter>
							</Card>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/creator-plus-pc'}>
										<Stack>
											<Heading size="md">Creator Plus PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(33000000)}
									</Text>
								</CardFooter>
							</Card>
							<Card
								maxW="300px"
								bg="transparent"
								rounded="lg"
								overflow="hidden"
								border="1px solid grey"
								flex="1 0 100%"
								ms="0"
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
										// width={200}
										// height={100}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								</CardHeader>
								<CardBody paddingBlock="2" bg="accent.shadeGrey">
									<LinkOverlay as={NextLink} href={'/product/creator-pro-pc'}>
										<Stack>
											<Heading size="md">Creator Pro PC</Heading>
											<Text>Mid-tower prebuild PC</Text>
										</Stack>
									</LinkOverlay>
								</CardBody>
								<CardFooter paddingTop="3" bg="accent.shadeGrey">
									<Text>
										{new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
										}).format(36000000)}
									</Text>
								</CardFooter>
							</Card>
						</Stack>
					</Box>
				</Container>
			</main>
		</>
	);
}
export default Product;
