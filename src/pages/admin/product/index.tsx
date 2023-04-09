import ProductCreateNewForm from '@/components/admin/ProductCreateNewForm';
import UserDashboardLayout from '@/components/UserDashboardLayout';
import { IProduct } from '@/mongodb/models/Product';
import { EditIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	Divider,
	Text,
	useDisclosure,
	IconButton,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Center,
	Collapse,
	Spinner,
	Link,
} from '@chakra-ui/react';

import Head from 'next/head';
import { default as NextLink } from 'next/link';
import React, { useRef } from 'react';
import useSWR from 'swr';

type ResponseData = {
	success: boolean;
	error: string | null;
	data: IProduct[] | null;
};

const fetcher = (url: string): Promise<ResponseData> =>
	fetch(url).then((res) => res.json());

export default function AdminProductSetting() {
	const createNewBtnRef = useRef<HTMLButtonElement>(null);
	const { data: resp, isLoading } = useSWR<ResponseData>(
		'/api/product',
		fetcher,
		{
			keepPreviousData: true,
			refreshInterval: 3000,
		}
	);
	const { isOpen, onToggle } = useDisclosure();

	return (
		<UserDashboardLayout>
			<Head>
				<title>Admin Panel - DZPC</title>
			</Head>
			<Container
				maxW={{ sm: 'lg', md: '2xl', lg: 'container.lg', xl: '5xl' }}
				paddingTop="1.5rem"
				paddingBottom="3rem"
				px="2"
			>
				<Text as="h2" fontSize={'1.5rem'} fontWeight="bold" letterSpacing={1}>
					Manage Product
				</Text>
				<Divider my="1rem" />
				<Box as="section">
					<Box my="4">
						<Button onClick={onToggle} ref={createNewBtnRef}>
							Add New
						</Button>

						{isOpen && (
							<Collapse in={isOpen} animateOpacity>
								<ProductCreateNewForm onToggle={onToggle} />
							</Collapse>
						)}
					</Box>

					{/* product list */}
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Product Name</Th>
									<Th>
										<Center>Price</Center>
									</Th>
									<Th>
										<Center>Stock</Center>
									</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{isLoading ? (
									<Tr>
										<Td colSpan={4}>
											<Center my="4">
												<Spinner />
											</Center>
										</Td>
									</Tr>
								) : !resp ? (
									<Tr>
										<Td colSpan={4}>
											<Center my="4">Internal Server Error.</Center>
										</Td>
									</Tr>
								) : !resp.data ? (
									<Tr>
										<Td colSpan={4}>
											<Center my="4">Product data is empty.</Center>
										</Td>
									</Tr>
								) : (
									resp.data.map((item) => (
										<Tr key={item.name} _hover={{ bg: 'whiteAlpha.100' }}>
											<Td>
												<Text title={item.name} isTruncated>
													{item.name}
												</Text>
											</Td>
											<Td>
												<Center>${item.price}</Center>
											</Td>
											<Td isNumeric>
												<Center>{item.stock}</Center>
											</Td>
											<Td maxW={'min-content'}>
												<Link as={NextLink} href={`/admin/product/${item._id}`}>
													<IconButton
														variant="ghost"
														colorScheme="teal"
														aria-label="Edit"
														title="Edit"
														icon={<EditIcon />}
														size="sm"
														float={'right'}
													/>
												</Link>
											</Td>
										</Tr>
									))
								)}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</UserDashboardLayout>
	);
}
