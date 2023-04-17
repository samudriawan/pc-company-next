import dbConnect from '@/mongodb/dbConnect';
import Product from '@/mongodb/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getBySlugHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') return res.status(405);

	await dbConnect();

	if (req.query.slug) {
		const foundSlug = await Product.findOne({ slug: req.query.slug });

		if (foundSlug) {
			return res.status(200).json({
				success: true,
				error: null,
				data: [foundSlug],
			});
		}
	}

	return res.status(400).json({
		success: false,
		error: 'Product not found.',
		data: null,
	});
}
