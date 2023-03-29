import dbConnect from '@/mongodb/dbConnect';
import Product from '@/mongodb/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'DELETE')
		return res.status(405).json({
			success: false,
			error: 'HTTP method is invalid.',
			data: null,
		});

	if (!req.query.id)
		return res.status(400).json({
			success: false,
			error: 'Query ID is missing.',
			data: null,
		});

	try {
		await dbConnect();

		const result = await Product.deleteOne({
			_id: req.query.id,
		});

		// product with provided from query id is not found.
		if (!result.deletedCount)
			return res.status(400).json({
				success: false,
				error: 'Product is not found.',
				data: null,
			});

		// if all are ok
		res.json({
			success: true,
			error: null,
			data: result,
		});
	} catch (err) {
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
