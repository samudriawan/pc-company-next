import { CartContext, CART_ACTION } from '@/context/cartContext';
import { Order } from '@/mongodb/models/User';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

type Props = {
	total: string
	items: any[]
	userEmail?: string
};
export default function PaypalButton({ total, items, userEmail }: Props) {
	const [checkoutError, setCheckoutError] = useState(null);
	const { dispatch } = useContext(CartContext);
	const router = useRouter();


	return (
		<>
			<PayPalButtons

				style={{ color: 'gold', shape: 'rect', label: 'paypal' }}
				forceReRender={[total]}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [{
							amount: { value: total, currency_code: 'USD', breakdown: { item_total: { value: total, currency_code: 'USD' } } },
							items: items
						}],
						intent: "CAPTURE",
					});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then(async (details) => {
						const items = details.purchase_units[0].items.map(item => {
							return {
								name: item.name,
								price: parseInt(item.unit_amount.value),
								quantity: parseInt(item.quantity)
							}
						})

						const orders: Order = {
							orderId: details.id,
							status: details.status,
							createTime: details.update_time,
							total: parseInt(details.purchase_units[0].amount.value),
							items,
						}

						try {
							fetch('http://localhost:3000/api/paypal/captureOrder', {
								method: 'POST',
								body: JSON.stringify({ orders, userEmail }),
								headers: { 'Content-type': 'application/json' },
							}).then((res) => 
								res.json()
							).then(({ error, data }) => {
								if (error) {
									setCheckoutError(error)
								}
								dispatch({ type: CART_ACTION.CLEAR_CART })
								router.push('/product');
							});
						} catch (err) {
							setCheckoutError(err)
							console.log(err)
						}
					});
				}}
			/>
			{checkoutError ? <span>{checkoutError}</span> : null}
		</>
	);
}