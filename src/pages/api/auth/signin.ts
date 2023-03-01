import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST')
		return res.status(405).json({ success: false, msg: 'Method not allowed.' });
	if (!req.headers['authorization'])
		return res
			.status(403)
			.json({ success: false, msg: 'Authorization headers is missing.' });

	const accessToken = req.headers['authorization']?.split(' ')[1];
	if (!accessToken)
		return res
			.status(403)
			.json({ success: false, msg: 'Access token is missing.' });

	res.setHeader(
		'Set-Cookie',
		serialize('token', 'access token', {
			httpOnly: true,
			sameSite: true,
			maxAge: 24 * 60 * 60,
			path: '/',
		})
	);

	res.status(200).json({
		success: true,
		data: { username: 'dayz', accessToken: 'access token' },
	});
}
