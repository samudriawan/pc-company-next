import ProductEditForm from '@/components/admin/ProductEditForm';
import UserDashboardLayout from '@/components/UserDashboardLayout';
import useProduct from '@/hooks/useProduct';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	Spinner,
	Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {};
export default function ProductInfo({}: Props) {
	const router = useRouter();
	const { id } = router.query;
	const { data: resp, isLoading, mutate } = useProduct(id as string);

	return (
		<UserDashboardLayout>
			<Head>
				<title>Edit Product - DZPC</title>
			</Head>
			{isLoading ? (
				<Center>
					<Spinner />
				</Center>
			) : (
				<Container
					maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
					px="2"
				>
					<Button
						mb={'4'}
						size={'sm'}
						leftIcon={<ArrowBackIcon />}
						onClick={() => router.back()}
					>
						Back
					</Button>
					<Text as="h2" fontSize={'1.5rem'} fontWeight="bold" letterSpacing={1}>
						{resp.data[0].name}
					</Text>
					<Divider my="1rem" />
					<Box as="section">
						<ProductEditForm productData={resp.data[0]} mutate={mutate} />
					</Box>
				</Container>
			)}
		</UserDashboardLayout>
	);
}
