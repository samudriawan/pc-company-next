import User from '@/mongodb/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

interface DataFromDbType {
	username: string;
	email: string;
}

export interface ResponseDataType {
	success: boolean;
	error: string | null;
	data: DataFromDbType | null;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseDataType>
) {
	if (req.method !== 'POST') return res.status(405).end();

	const { username, email, password } = req.body;
	const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

	if (!email || !password)
		return res.status(400).json({
			success: false,
			error: 'email and password is missing.',
			data: null,
		});

	if (typeof email !== 'string')
		return res
			.status(400)
			.json({ success: false, error: 'email is not valid type.', data: null });

	if (!email || !password)
		return res.status(400).json({
			success: false,
			error: 'email or password is missing.',
			data: null,
		});

	if (!email.match(regexEmail))
		return res
			.status(400)
			.json({ success: false, error: 'email is not valid.', data: null });

	const userDb = await User.findOne({ email }).exec();

	if (userDb)
		return res
			.status(400)
			.json({ success: false, error: 'email is already exist.', data: null });

	const hash = await bcrypt.hash(password, 10);

	await User.create({
		username,
		email,
		hash,
	});

	res.json({
		success: true,
		error: null,
		data: { username, email },
	});
}
