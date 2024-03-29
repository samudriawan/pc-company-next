import dbConnect from '@/mongodb/dbConnect';
import Product from '@/mongodb/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function updateHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'PUT') return res.status(405);

	if (!req.query.id)
		return res.status(400).json({
			success: false,
			error: 'Query ID is missing.',
			data: null,
		});

	if (Object.entries(req.body).length === 0)
		return res.status(400).json({
			success: false,
			error: 'Request body is missing.',
			data: null,
		});

	await dbConnect();

	if (req.query.id && req.body) {
		if (req.body.price <= 0)
			return res.status(400).json({
				success: false,
				error: 'Product price must be above 0.',
				data: null,
			});

		if (req.body.stock < 0)
			return res.status(400).json({
				success: false,
				error: 'Product stock can not be negative value.',
				data: null,
			});

		const foundProduct = await Product.findOne({
			_id: req.query.id,
		});

		if (foundProduct) {
			const result = await Product.updateOne(
				{ _id: foundProduct._id },
				req.body
			);

			return res.status(200).json({
				success: true,
				error: null,
				data: result,
			});
		}
	}

	return res.status(400).json({
		success: false,
		error: 'Product is not found.',
		data: null,
	});
}
