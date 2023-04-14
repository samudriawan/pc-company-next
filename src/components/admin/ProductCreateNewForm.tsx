import {
	FormControl,
	FormLabel,
	Input,
	Flex,
	Button,
	Box,
	useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
	onToggle: () => void;
};

export default function ProductCreateNewForm({ onToggle }: Props) {
	const [btnLoading, setBtnLoading] = useState(false);
	const addNewRef = useRef<HTMLFormElement>(null);
	const toast = useToast();

	useEffect(() => {
		(
			addNewRef.current?.childNodes[0].childNodes[1] as HTMLInputElement
		).focus();
	}, []);

	const inputName = [
		'Name',
		'Processor',
		'Motherboard',
		'Graphic',
		'Memory',
		'Storage',
		'Power',
		'Case',
		'Cooler',
		'Price',
		'Stock',
	];

	async function handleAddNewSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(addNewRef.current!);

		let spreadFormData = {};
		let performanceData = [];

		setBtnLoading(true);

		// iterate the formData value to get the correct data type
		for (let [key, value] of formData.entries()) {
			if (key.includes('fps') || key.includes('game')) {
				performanceData.push({ [key]: value });
				continue;
			}

			if (key === 'price') {
				spreadFormData = {
					...spreadFormData,
					[key]: parseInt(value as string),
				};
				continue;
			}

			if (key === 'stock') {
				if (!value) {
					spreadFormData = {
						...spreadFormData,
						stock: 1,
					};
					continue;
				}
				spreadFormData = {
					...spreadFormData,
					[key]: parseInt(value as string),
				};
				continue;
			}

			spreadFormData = { ...spreadFormData, [key]: value.toString().trim() };
		}

		const productSlug = {
			slug: getProductSlug(formData.get('name') as string),
		};

		const performance = setPerformanceArray(
			performanceData as unknown as [Object]
		);

		console.log('formdata ', formData.entries());
		console.log('final data ', {
			...spreadFormData,
			...productSlug,
			performance,
		});

		try {
			const resp = await fetch('http://localhost:3000/api/product/create', {
				method: 'POST',
				body: JSON.stringify({
					...spreadFormData,
					...productSlug,
					performance,
				}),
				headers: { 'Content-type': 'application/json' },
			});
			const { error, ...other } = await resp.json();

			console.log(resp);
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

			onToggle();
			window.scrollTo(0, 100);
			if (!toast.isActive('add-product-toast')) {
				toast({
					id: 'add-product-toast',
					title: 'Product has successfuly added.',
					position: 'top',
					status: 'success',
					isClosable: true,
				});
			}
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

	function getProductSlug(name: string): string {
		return name.trim().toLowerCase().replace(/\W/g, '-');
	}

	function setPerformanceArray(arr: [Object]) {
		let performance = [];
		performance.push(Object.assign({}, ...arr.slice(0, 2))); // 0
		performance.push(Object.assign({}, ...arr.slice(2, 4))); // 1
		performance.push(Object.assign({}, ...arr.slice(4, 6))); // 2
		performance.push(Object.assign({}, ...arr.slice(6, 8))); // 3

		const perf = performance.map((x) => {
			return { game: x.game as string, fps: parseInt(x.fps) };
		});

		return perf;
	}

	return (
		<Box my="4">
			<form ref={addNewRef} onSubmit={handleAddNewSubmit}>
				{inputName.map((item) => {
					return (
						<FormControl
							key={item}
							mb="2"
							maxW={item === 'Price' || item === 'Stock' ? '50%' : 'full'}
							display={
								item === 'Price' || item === 'Stock' ? 'inline-flex' : 'block'
							}
							flexDirection={
								item === 'Price' || item === 'Stock' ? 'column' : 'row'
							}
						>
							<FormLabel>{item}</FormLabel>
							<Input
								type={item === 'Price' || item === 'Stock' ? 'number' : 'text'}
								name={item === 'Processor' ? 'cpu' : item.toLowerCase()}
								placeholder={item}
								isRequired={item !== 'Stock' ? true : false}
								errorBorderColor="crimson"
							/>
						</FormControl>
					);
				})}
				<FormControl>
					<FormLabel>Performance</FormLabel>
					{Array(4)
						.fill('')
						.map((_, index) => {
							return (
								<Flex gap="4" mb="4" key={index}>
									<Input
										type="text"
										name="game"
										placeholder="Game"
										flexGrow="1"
										required
									/>
									<Input
										type="number"
										name="fps"
										placeholder="FPS"
										flexShrink="1"
										w="20%"
										required
									/>
								</Flex>
							);
						})}
				</FormControl>
				<Button mr="3" type="submit" isLoading={btnLoading} colorScheme="blue">
					Save
				</Button>
				<Button
					type="reset"
					onClick={() => {
						onToggle();
						window.scrollTo(0, 100);
					}}
				>
					Cancel
				</Button>
			</form>
		</Box>
	);
}
