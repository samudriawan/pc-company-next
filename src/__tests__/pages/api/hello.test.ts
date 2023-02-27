// import getApiData from '@/components/getApiData';
import handler from '@/pages/api/hello';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
	createMocks,
	createRequest,
	createResponse,
	RequestMethod,
} from 'node-mocks-http';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe('/pages/api/hello endpoint', () => {
	function mockRequestResponse(method: RequestMethod = 'GET') {
		const { req, res } = createMocks<ApiRequest, ApiResponse>({ method });
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
