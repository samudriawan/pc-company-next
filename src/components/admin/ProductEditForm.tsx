import { ResponseData } from '@/lib/swrFetch';
import { IProduct } from '@/mongodb/models/Product';
import {
	FormControl,
	FormLabel,
	Input,
	Flex,
	Button,
	Box,
	useToast,
	Modal,
	ModalContent,
	ModalBody,
	useDisclosure,
	ModalOverlay,
	ModalFooter,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';

type ProductType = IProduct & {
	[key: string]: any;
};

type Props = {
	productData: ProductType;
	mutate?: KeyedMutator<ResponseData>;
};

export default function ProductEditForm({ productData, mutate }: Props) {
	const { _id, ratingAverage, __v, createdAt, updatedAt, ...productObj } =
		productData;
	const [btnLoading, setBtnLoading] = useState(false);
	const [inputForm, setInputForm] = useState(() => productObj);
	const [performanceForm, setPerformanceForm] = useState(
		() => productObj.performance
	);
	const router = useRouter();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		// forcing rerender with latest value
		setInputForm(() => productObj);
		setPerformanceForm(() => productObj.performance);
	}, [productData]);

	async function handleSave(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setBtnLoading(true);

		try {
			const resp = await fetch(
				`http://localhost:3000/api/product/update/?id=${_id}`,
				{
					method: 'PUT',
					body: JSON.stringify({
						...inputForm,
						performance: performanceForm,
						slug: getProductSlug(inputForm.name),
					}),
					headers: { 'Content-type': 'application/json' },
				}
			);
			const { error } = await resp.json();

			if (error) {
				if (!toast.isActive('error-resp-toast')) {
					toast({
						id: 'error-resp-toast',
						title: error,
						status: 'error',
						position: 'top',
						isClosable: true,
					});
				}
				return;
			}

			if (!toast.isActive('add-product-toast')) {
				toast({
					id: 'add-product-toast',
					title: 'Product has successfuly updated.',
					position: 'top',
					status: 'success',
					isClosable: true,
				});
			}

			mutate();
			router.push('/admin/product');
		} catch (err) {
			if (!toast.isActive('resp-server-error-toast')) {
				toast({
					id: 'resp-server-error-toast',
					title: 'Internal Server Error.',
					position: 'top',
					status: 'error',
					isClosable: true,
				});
			}
		} finally {
			setBtnLoading(false);
		}
	}

	async function handleDelete() {
		setBtnLoading(true);
		try {
			const resp = await fetch(
				`http://localhost:3000/api/product/delete/?id=${_id}`,
				{
					method: 'DELETE',
				}
			);
			const { error } = await resp.json();

			if (error) {
				if (!toast.isActive('error-resp-toast')) {
					toast({
						id: 'error-resp-toast',
						title: error,
						status: 'error',
						position: 'top',
						isClosable: true,
					});
				}
				return;
			}

			if (!toast.isActive('add-product-toast')) {
				toast({
					id: 'add-product-toast',
					title: 'Product has successfuly removed.',
					position: 'top',
					status: 'success',
					isClosable: true,
				});
			}

			mutate();
			router.push('/admin/product');
			onClose();
		} catch (err) {
			if (!toast.isActive('resp-server-error-toast')) {
				toast({
					id: 'resp-server-error-toast',
					title: 'Internal Server Error.',
					position: 'top',
					status: 'error',
					isClosable: true,
				});
			}
		} finally {
			setBtnLoading(false);
		}
	}

	function handlePerformanceInputChange(
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) {
		let temp = [...performanceForm];
		if (e.target.name === 'fps' && !Number.isNaN(parseInt(e.target.value))) {
			temp[index] = {
				...temp[index],
				[e.target.name]: parseInt(e.target.value),
			};
			setPerformanceForm(temp);
		} else if (e.target.name === 'game') {
			temp[index] = {
				...temp[index],

				[e.target.name]: e.target.value,
			};
			setPerformanceForm(temp);
		}
	}

	function getProductSlug(name: string): string {
		return name.trim().toLowerCase().replace(/\W/g, '-');
	}

	return (
		<Box my="4">
			<form onSubmit={handleSave}>
				<FormControl mb="2">
					<FormLabel>Name</FormLabel>
					<Input
						type={'text'}
						name={'name'}
						value={inputForm.name}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Product Name'}
						isRequired
					/>
				</FormControl>
				<FormControl mb="2">
					<FormLabel>Processor</FormLabel>
					<Input
						type={'text'}
						name={'cpu'}
						value={inputForm.cpu}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Processor'}
						isRequired
					/>
				</FormControl>
				<FormControl mb="2">
					<FormLabel>Motherboard</FormLabel>
					<Input
						type={'text'}
						name={'motherboard'}
						value={inputForm.motherboard}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Motherboard'}
						isRequired
					/>
				</FormControl>
				<FormControl mb="2">
					<FormLabel>Graphic</FormLabel>
					<Input
						type={'text'}
						name={'graphic'}
						value={inputForm.graphic}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Graphic'}
						isRequired
					/>
				</FormControl>
				<FormControl mb="2">
					<FormLabel>Memory</FormLabel>
					<Input
						type={'text'}
						name={'memory'}
						value={inputForm.memory}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Memory'}
						isRequired
					/>
				</FormControl>
				<FormControl mb="2">
					<FormLabel>Power</FormLabel>
					<Input
						type={'text'}
						name={'power'}
						value={inputForm.power}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Power Supply'}
						isRequired
					/>
				</FormControl>
				<FormControl mb="2">
					<FormLabel>Case</FormLabel>
					<Input
						type={'text'}
						name={'case'}
						value={inputForm.case}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Case'}
						isRequired
					/>
				</FormControl>
				<FormControl mb="2">
					<FormLabel>Cooler</FormLabel>
					<Input
						type={'text'}
						name={'cooler'}
						value={inputForm.cooler}
						onChange={(e) =>
							setInputForm({
								...inputForm,
								[e.target.name]: e.target.value,
							})
						}
						placeholder={'Cooler'}
						isRequired
					/>
				</FormControl>
				<Flex mb="2" display={'flex'} gap="4">
					<FormControl mb="2">
						<FormLabel>Price</FormLabel>
						<Input
							type={'number'}
							name={'price'}
							value={inputForm.price}
							onChange={(e) =>
								setInputForm({
									...inputForm,
									[e.target.name]: parseInt(e.target.value),
								})
							}
							placeholder={'Price'}
							isRequired
						/>
					</FormControl>
					<FormControl mb="2">
						<FormLabel>Stock</FormLabel>
						<Input
							type={'number'}
							name={'stock'}
							value={inputForm.stock}
							onChange={(e) =>
								setInputForm({ ...inputForm, [e.target.name]: e.target.value })
							}
							placeholder={'Stock'}
							isRequired
						/>
					</FormControl>
				</Flex>

				<FormControl>
					<FormLabel>Performance</FormLabel>
					{performanceForm.map((item, index) => {
						return (
							<Flex gap="4" mb="4" key={index}>
								<Input
									type="text"
									name="game"
									value={item.game}
									onChange={(e) => handlePerformanceInputChange(e, index)}
									placeholder="Game"
									flexGrow="1"
									required
								/>
								<Input
									type="number"
									name="fps"
									value={item.fps}
									onChange={(e) => handlePerformanceInputChange(e, index)}
									placeholder="FPS"
									flexShrink="1"
									w="20%"
									required
								/>
							</Flex>
						);
					})}
				</FormControl>

				<Box mb="4" color={'whiteAlpha.500'}>
					<Text>Created at {new Date(createdAt).toLocaleString()}</Text>
				</Box>

				<Button
					mr="3"
					type="submit"
					isLoading={btnLoading}
					colorScheme="blue"
					isDisabled={
						JSON.stringify(inputForm) ===
						JSON.stringify({ ...productObj, performance: performanceForm })
					}
				>
					Save
				</Button>
				<Button onClick={() => router.push('/admin/product')}>Cancel</Button>
				<Button
					variant={'outline'}
					colorScheme={'red'}
					float="right"
					onClick={onOpen}
				>
					Delete
				</Button>

				<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalBody>
							<Text>
								Do you want to delete product{' '}
								<strong>{productData.name}</strong>?
							</Text>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="red"
								size={'sm'}
								mr={3}
								onClick={handleDelete}
								isLoading={btnLoading}
							>
								Delete
							</Button>
							<Button variant="ghost" size={'sm'} onClick={onClose}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</form>
		</Box>
	);
}
