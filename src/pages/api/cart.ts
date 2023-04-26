import { Cart } from '@/context/cartContext';
import dbConnect from '@/mongodb/dbConnect';
import Product from '@/mongodb/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

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

	try {
		await dbConnect();

		let result = await Promise.all(
			body.cart.map(async (item: Cart) => {
				const foundProduct = await Product.findOne({
					name: item.productName,
				});

				if (!foundProduct)
					return res.status(400).json({
						success: false,
						error: 'product name is already exist. Please choose another name.',
						data: null,
					});

				return foundProduct.price * item.qty;
			})
		);

		// console.log(result);
		res.json(result.reduce((a, v) => a + v, 0));
	} catch (err) {
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
