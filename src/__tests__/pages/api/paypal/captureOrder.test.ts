import captureOrderHandler from '@/pages/api/paypal/captureOrder';
import { mockRequestResponse } from '@/lib/test/types.mock';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '@/mongodb/models/User';

jest.setTimeout(60 * 1000);
mongoose.set('strictQuery', true);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	await mongoose.connect(mongoServer.getUri(), { dbName: 'dzpc' });
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	jest.clearAllMocks();
	jest.resetAllMocks();
});

describe('/api/paypal/checkout API endpoint', () => {
	let body = {
		orders: {
			orderId: "1HG21901VW426294X",
			status: "COMPLETED",
			createTime: "2023-05-03T11:46:16Z",
			total: 12,
			items: [
				{
					name: "Starter PC",
					price: 4,
					quantity: 1
				},
				{
					name: "Streaming PC",
					price: 8,
					quantity: 1
				}
			],
		},
		userEmail: "admin@email.com"
	};

	it('should return a successful if all input is valid.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = body

		const mockUpdate = jest.spyOn(User, 'updateOne');
		mockUpdate.mockResolvedValue({
			acknowledged: true,
			matchedCount: 1,
			modifiedCount: 1,
			upsertedCount: 0,
			upsertedId: null,
		});

		await captureOrderHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: "Order checkout success.",
		});
	});

	it('should return error when body is missing.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = {};

		await captureOrderHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Orders data is missing.',
			data: null,
		});
	});

	it('should return error when checkout is failed.', async () => {
		body.userEmail = "notfound@email.com"
		const { req, res } = mockRequestResponse('POST');
		req.body = body;

		const mockUpdate = jest.spyOn(User, 'updateOne');
		mockUpdate.mockResolvedValue({
			acknowledged: true,
			matchedCount: 0,
			modifiedCount: 0,
			upsertedCount: 0,
			upsertedId: null,
		});

		await captureOrderHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Orders failed.',
			data: null,
		});
	});

	it('should return error if HTTP Method is not POST', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'GET';

		await captureOrderHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});
