import dbConnect from '@/mongodb/dbConnect';
import Product from '@/mongodb/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') return res.status(405);

	await dbConnect();

	if (req.query.id) {
		const foundProduct = await Product.findOne({ _id: req.query.id });

		if (foundProduct) {
			return res.status(200).json({
				success: true,
				error: null,
				data: [foundProduct],
			});
		}
	}

	const getAll = await Product.find();

	return res.status(200).json({
		success: true,
		error: null,
		data: getAll,
	});
}
