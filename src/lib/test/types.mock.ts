import { NextApiRequest, NextApiResponse } from 'next';
import {
	createMocks,
	createRequest,
	createResponse,
	RequestMethod,
} from 'node-mocks-http';

export type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
export type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

export function mockRequestResponse(method: RequestMethod = 'GET') {
	const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
		method,
	});
	req.body = {};
	req.headers = {
		'content-type': 'application/json',
	};
	return { req, res };
}
