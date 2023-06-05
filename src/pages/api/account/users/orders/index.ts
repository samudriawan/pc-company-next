import dbConnect from '@/mongodb/dbConnect';
import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ordersHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') return res.status(405);

	try {
		await dbConnect();

		const foundUser = await User.find().select('orders');

		return res.status(200).json({
			success: true,
			error: null,
			data: foundUser,
		});
	} catch (err) {
		return res.status(500).json({ success: false, error: err, data: null });
	}
}
