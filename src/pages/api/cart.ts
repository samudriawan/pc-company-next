import { Cart } from '@/context/cartContext';
import dbConnect from '@/mongodb/dbConnect';
import Product from '@/mongodb/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

type CurrentProductStockType = {
	name: string;
	currentStock: number;
};

export default async function createHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405).end();

	const { body } = req;

	if (!body || Object.keys(body).length === 0)
		return res.status(400).json({
			success: false,
			error: 'product input data is missing.',
			data: null,
		});

	let currentProductStock: CurrentProductStockType[] = [];

	try {
		await dbConnect();

		let result = await Promise.all(
			body.cart.map(async (item: Cart) => {
				const foundProduct = await Product.findOne({
					name: item.productName,
				});

				if (!foundProduct) return 0;
				// return res.status(400).json({
				// 	success: false,
				// 	error: 'Can not find the product.',
				// 	data: null,
				// });

				if (foundProduct.stock - item.qty < 0) {
					currentProductStock.push({
						name: foundProduct.name,
						currentStock: foundProduct.stock,
					});
					return 0;
				}

				return foundProduct.price * item.qty;
			})
		);

		if (currentProductStock.length > 0) {
			let productNameList = currentProductStock.map(
				(item) => `${item.name} stock are only ${item.currentStock} left.`
			);
			res.status(400).json({
				success: false,
				error: 'Some product are not enough stock. '.concat(
					productNameList.join(' ')
				),
				data: null,
			});
		} else {
			res.status(200).json({
				success: true,
				error: null,
				data: result.reduce((a, v) => a + v, 0),
			});
		}
	} catch (err) {
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
