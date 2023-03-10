import { NextApiRequest, NextApiResponse } from 'next';

type DataFromDbType = {
	username: string;
	email: string;
	hash: string;
};

type ResponseDataType = {
	success: boolean;
	error: string | null;
	data: DataFromDbType | null;
};

const dataFromDb: DataFromDbType = {
	username: 'dayz',
	email: 'dayz@email.com',
	hash: 'encrypted password',
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseDataType>
) {
	if (req.method !== 'POST') return res.status(405).end();

	const { user } = req.body;
	const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

	if (!user)
		return res.status(400).json({
			success: false,
			error: 'email and password is missing.',
			data: null,
		});

	if (typeof user !== 'string')
		return res
			.status(400)
			.json({ success: false, error: 'email is not valid type.', data: null });

	const decodedBody = Buffer.from(user, 'base64').toString();
	const [, email, password] = decodedBody.split(':');

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

	if (email === 'email@email.com')
		return res
			.status(400)
			.json({ success: false, error: 'email is already exist.', data: null });

	res.json({ success: true, error: null, data: { ...dataFromDb } });
}
