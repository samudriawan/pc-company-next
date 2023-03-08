import handler from '@/pages/api/hello';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';

describe('/pages/api/hello endpoint', () => {
	function mockRequestResponse(method: RequestMethod = 'GET') {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method,
		});
		req.headers = {
			'content-type': 'application/json',
		};
		return { req, res };
	}

	test('should return a successful response', async () => {
		const { req, res } = mockRequestResponse();
		await handler(req, res);
		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({ name: 'John Doe' });
	});
});
