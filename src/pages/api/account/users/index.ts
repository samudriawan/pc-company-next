import dbConnect from '@/mongodb/dbConnect';
import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getUserHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET')
		return res.status(405).json({
			success: false,
			error: 'HTTP method is not allowed.',
			data: null,
		});

	if (!req.query.id)
		return res.status(400).json({
			success: false,
			error: 'User ID is missing.',
			data: null,
		});

	const id = req.query.id as string;

	try {
		await dbConnect();

		if (req.query.id) {
			const foundUser = await User.findOne({ _id: id }).select('username');

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
