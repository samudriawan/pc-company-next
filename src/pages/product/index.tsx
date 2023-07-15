import { default as NextLink } from 'next/link';
import {
	Card,
	CardBody,
	CardHeader,
	Container,
	Link,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import { ResponseData } from '@/lib/swrFetch';
import Product, { IProduct } from '@/mongodb/models/Product';
import dbConnect from '@/mongodb/dbConnect';

type PageProps = {
	fallback: ResponseData;
};

export default function ProductHomePage({ fallback }: PageProps) {
	const { data: resp } = useSWR<ResponseData>('/api/product', {
		fallback,
	});

	return (
		<>
			<Head>
				<title>Products - DZ Prebuilt PC</title>
			</Head>
			<main>
				<Container
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					paddingTop="1rem"
					paddingBottom="3rem"
				>
					<Text as="h1" mb="4" fontSize={'2xl'} fontWeight={'semibold'}>
						Product
					</Text>
					<SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
						{resp.data.map((item) => (
							<Link
								as={NextLink}
								href={`/product/${item.slug}`}
								key={item.name}
								_hover={{ textDecoration: 'none' }}
							>
								<Card
									maxH="300px"
									bg="transparent"
									rounded="lg"
									overflow="hidden"
									border="1px solid grey"
									flex="1 0 100%"
									data-testid="product-card"
								>
									<CardHeader
										position="relative"
										w="70%"
										h="250px"
										marginInline="auto"
										marginBlock="2rem"
										padding="0"
										data-testid="product-card-header"
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
									<CardBody
										paddingBlock="2"
										bg="accent.shadeGrey"
										color={'white'}
										data-testid="product-card-body"
									>
										<Stack>
											<Text as={'h2'} title={item.name} isTruncated>
												{item.name}
											</Text>
											<Text fontWeight={'bold'}>
												{new Intl.NumberFormat('us-ID', {
													style: 'currency',
													currency: 'USD',
												}).format(item.price)}
											</Text>
										</Stack>
									</CardBody>
								</Card>
							</Link>
						))}
					</SimpleGrid>
				</Container>
			</main>
		</>
	);
}

export async function getStaticProps() {
	await dbConnect();

	const allProducts: IProduct[] = await Product.find();
	const result: ResponseData = {
		success: true,
		error: null,
		data: JSON.parse(JSON.stringify(allProducts)),
	};

	return {
		props: {
			fallback: {
				'/api/product': result,
			},
		},
	};
}
