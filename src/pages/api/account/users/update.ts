import dbConnect from '@/mongodb/dbConnect';
import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function updateUserHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'PUT')
		return res.status(405).json({
			success: false,
			error: 'HTTP method is not allowed.',
			data: null,
		});

	if (Object.keys(req.body).length < 1)
		return res.status(400).json({
			success: false,
			error: 'HTTP body is missing.',
			data: null,
		});

	const body = req.body;

	try {
		await dbConnect();

		if (!body.id)
			return res.status(400).json({
				success: false,
				error: 'HTTP body ID is missing.',
				data: null,
			});

		const foundUser = await User.findOne({ _id: body.id }).select(
			'username hash'
		);

		if (!foundUser)
			return res.status(400).json({
				success: false,
				error: 'User not found.',
				data: null,
			});

		// *** changing username section ***
		if (body.username) {
			if (body.username !== foundUser.username) {
				const allUsers = await User.find().select('username');

				if (body.username !== foundUser.username) {
					const usernameTaken = allUsers.find(
						(user) => user.username === body.username
					);
					if (usernameTaken)
						return res.status(400).json({
							success: false,
							error: 'Username already in used.',
							data: null,
						});

					// save the new username to db below
					const updatedUser = await User.updateOne(
						{ _id: body.id },
						{ username: body.username }
					);

					if (updatedUser.modifiedCount) {
						return res.status(200).json({
							success: true,
							error: null,
							data: `Your username is successfully updated to ${body.username}.`,
						});
					} else {
						return res.status(400).json({
							success: false,
							error: 'Username failed to update.',
							data: null,
						});
					}
				}
			} else {
				return res.status(400).json({
					success: false,
					error: 'Can not change with the same username.',
					data: null,
				});
			}
		}

		// *** change password section ***
		if (body.current || body.new || body.retype) {
			if (body.new !== body.retype)
				return res.status(400).json({
					success: false,
					error: 'Retype new password did not match.',
					data: null,
				});

			const isValid = await bcrypt.compare(body.current, foundUser.hash);

			if (isValid) {
				const newHash = await bcrypt.hash(body.new, 11);

				// store hash in db here
				const updatedHash = await User.updateOne(
					{ _id: body.id },
					{ hash: newHash }
				);

				return res.status(200).json({
					success: true,
					error: null,
					data: 'Your password is successfully updated.',
				});
			} else {
				return res.status(400).json({
					success: false,
					error: 'Current password did not match.',
					data: null,
				});
			}
		}

		return res.status(400).json({
			success: false,
			error: 'New username and new password is empty.',
			data: null,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: true,
			error: 'DB connection error',
			data: null,
		});
		throw new Error('DB connection error.');
	}
}
