import handler from '@/pages/api/auth/signin';
import { NextApiRequest, NextApiResponse } from 'next';
import { Cookies, createMocks, RequestMethod } from 'node-mocks-http';
import { parse } from 'cookie';

afterEach(() => jest.clearAllMocks());

describe('/api/auth/signin endpoint', () => {
	function mockRequestResponse(method: RequestMethod = 'POST') {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method,
		});
		req.headers = {
			'Content-type': 'application/json',
			authorization: `Bearer access token`,
		};
		req.body = { email: 'test@email.com', password: 'password' };

		return { req, res };
	}

	it('should return a successful response', async () => {
		const { req, res } = mockRequestResponse();

		await handler(req, res);
		const resCookie: Cookies = parse(res.getHeader('set-cookie') as string);

		expect(res.statusCode).toBe(200);
		expect(res.getHeader('content-type')).toBe('application/json');
		expect(resCookie).toHaveProperty('token');
		expect(res._getJSONData()).toEqual({
			success: true,
			data: { username: 'dayz', accessToken: 'access token' },
		});
	});

	it('should return a 403 if authorization headers is missing', async () => {
		const { req, res } = mockRequestResponse();
		req.headers = {
			authorization: undefined,
		};

		await handler(req, res);
		expect(res.statusCode).toBe(403);
		expect(res._getJSONData()).toEqual({
			success: false,
			msg: 'Authorization headers is missing.',
		});
	});

	it('should return a 403 if access token is empty ', async () => {
		const { req, res } = mockRequestResponse();
		req.headers = {
			authorization: `Bearer `,
		};

		await handler(req, res);
		expect(res.statusCode).toBe(403);
		expect(res._getJSONData()).toEqual({
			success: false,
			msg: 'Access token is missing.',
		});
	});

	it('should return a 405 if HTTP method is not POST', async () => {
		const { req, res } = mockRequestResponse('GET');

		await handler(req, res);
		expect(res.statusCode).toBe(405);
		expect(res._getJSONData()).toStrictEqual({
			success: false,
			msg: 'Method not allowed.',
		});
	});
});
