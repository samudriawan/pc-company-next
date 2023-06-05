import dbConnect from '@/mongodb/dbConnect';
import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function captureOrderHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405).end();

	const { body } = req;

	if (!body || Object.keys(body).length === 0)
		return res.status(400).json({
			success: false,
			error: 'Orders data is missing.',
			data: null,
		});

	try {
		await dbConnect();

		const result = await User.updateOne(
			{
				email: body.userEmail,
			},
			{ $push: { orders: body.orders } },
			{ upsert: true, new: true }
		);

		if (!result.modifiedCount)
			return res.status(400).json({
				success: false,
				error: 'Orders failed.',
				data: null,
			});

		res.status(200).json({
			success: true,
			error: null,
			data: 'Order checkout success.',
		});
	} catch (err) {
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
