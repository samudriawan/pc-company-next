import { CartContext } from '@/context/cartContext';
import { Button, Icon, Link, Tag } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { BsCart2 } from 'react-icons/bs';

type Props = {
	direction?: string;
};

export default function CartButton({ direction }: Props) {
	const { state: carts } = useContext(CartContext);
	const [cartQty, setCartQty] = useState(() => {
		return carts.reduce((acc, curr) => acc + curr.qty, 0);
	});

	useEffect(() => {
		setCartQty(() => carts.reduce((acc, curr) => acc + curr.qty, 0));
	}, [carts]);

	return (
		<Link as={NextLink} href="/cart">
			<Button
				variant="unstyled"
				_hover={{ color: 'neon.blue' }}
				position="relative"
				// sx={{
				// 	position: direction === 'row' ? 'relative' : 'fixed',
				// 	// position: 'fixed',
				// 	top: 0,
				// 	right: 0,
				// 	display: 'block',
				// }}
			>
				<Icon as={BsCart2} fontSize="1.7rem" />
				<Tag
					size={'sm'}
					variant="solid"
					rounded={'full'}
					position="absolute"
					top="0"
					right="0"
					bg={'white'}
					color="black"
					px="1.5"
					fontSize={'1rem'}
					fontWeight={'bold'}
					display={cartQty ? 'block' : 'none'}
				>
					{carts.reduce((acc, curr) => acc + curr.qty, 0)}
				</Tag>
			</Button>
		</Link>
	);
}
