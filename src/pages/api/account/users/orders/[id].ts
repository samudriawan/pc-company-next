import dbConnect from '@/mongodb/dbConnect';
import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ordersHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') return res.status(405);

	if (!req.query.id) return res.status(400);

	const id = req.query.id as string;

	try {
		await dbConnect();

		if (req.query.id) {
			const foundUser = await User.findOne({ _id: id }).select('orders');

			if (!foundUser) {
				return res.status(400).json({
					success: false,
					error: 'User not found.',
					data: null,
				});
			}

			return res.status(200).json({
				success: true,
				error: null,
				data: foundUser,
			});
		}
	} catch (err) {
		console.log(err);
		throw new Error('DB connection error.');
	}
}
