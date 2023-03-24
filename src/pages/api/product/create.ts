import dbConnect from '@/mongodb/dbConnect';
import Product, { IProduct } from '@/mongodb/models/Product';
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
		const foundProduct = await Product.findOne({
			name: body.name,
		}).exec();

		if (foundProduct)
			return res.status(400).json({
				success: false,
				error: 'product name is already exist.',
				data: null,
			});

		const addedProduct: IProduct = await Product.create(body);

		res.json({
			success: true,
			error: null,
			data: addedProduct,
		});
	} catch (err) {
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
