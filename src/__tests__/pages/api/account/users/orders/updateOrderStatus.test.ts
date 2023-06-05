import { mockRequestResponse } from '@/lib/test/types.mock';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '@/mongodb/models/User';
import updateOrderStatusHandler from '@/pages/api/account/users/orders/updateOrderStatus';

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

describe('/api/account/users/orders/updateOrderStatus API endpoint', () => {
	const body = {
		validBodyData: {
			currentStatus: 'PROCESSING',
			changedStatus: 'SHIPPED',
			statusLog: [
				{
					status: 'PROCESSING',
					updatedTime: '2023-05-25T07:19:50.193Z',
				},
			],
			orderId: '6VP239489C526362L',
			userId: '6411573208396c9c058f3f64',
		},
		statusNotChanges: {
			currentStatus: 'PROCESSING',
			changedStatus: 'PROCESSING',
			statusLog: [
				{
					status: 'PROCESSING',
					updatedTime: '2023-05-25T07:19:50.193Z',
				},
			],
			orderId: '6VP239489C526362L',
			userId: '6411573208396c9c058f3f64',
		},
		statusEqualWithDb: {
			currentStatus: 'SHIPPED',
			changedStatus: 'PROCESSING',
			statusLog: [
				{
					status: 'PROCESSING',
					updatedTime: '2023-05-25T07:19:50.193Z',
				},
			],
			orderId: '6VP239489C526362L',
			userId: '6411573208396c9c058f3f64',
		},
		changeStatusBackward: {
			currentStatus: 'PAID',
			changedStatus: 'SHIPPED',
			statusLog: [
				{
					status: 'DELIVERED',
					updatedTime: '2023-05-25T07:19:50.193Z',
				},
			],
			orderId: '6VP239489C526362L',
			userId: '6411573208396c9c058f3f64',
		},
		changeStatusBackToPaid: {
			currentStatus: 'PROCESSING',
			changedStatus: 'PAID',
			statusLog: [
				{
					status: 'PROCESSING',
					updatedTime: '2023-05-25T07:19:50.193Z',
				},
			],
			orderId: '6VP239489C526362L',
			userId: '6411573208396c9c058f3f64',
		},
		orderIdNotFound: {
			currentStatus: 'PROCESSING',
			changedStatus: 'SHIPPED',
			statusLog: [
				{
					status: 'PROCESSING',
					updatedTime: '2023-05-25T07:19:50.193Z',
				},
			],
			orderId: 'somerandomstring123',
			userId: '6411573208396c9c058f3f64',
		},
		userIdNotFound: {
			currentStatus: 'PROCESSING',
			changedStatus: 'DELIVERED',
			statusLog: [
				{
					status: 'PROCESSING',
					updatedTime: '2023-05-25T07:19:50.193Z',
				},
			],
			orderId: '6VP239489C526362L',
			userId: 'somerandomstring123',
		},
	};

	const foundUser = {
		username: 'admin',
		email: 'admin@email.com',
		hash: 'randomstringhash',
		role: 'admin',
		cartItem: [],
		refreshToken: [],
		id: '6411573208396c9c058f3f64',
		orders: [
			{
				orderId: '6VP239489C526362L',
				status: 'PROCESSING',
				total: 24,
				createTime: '2023-05-15T12:04:50Z',
				statusLogs: [
					{
						status: 'PAID',
						updatedTime: '2023-05-25T07:19:50.193Z',
					},
				],
			},
		],
	};

	const mockUpdateOne = jest.spyOn(User, 'updateOne');
	const mockFindOne = jest.spyOn(User, 'findOne');

	it('should return a successful if all input is valid.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = body.validBodyData;

		mockFindOne.mockResolvedValue(foundUser);
		mockUpdateOne.mockResolvedValue({
			acknowledged: true,
			matchedCount: 1,
			modifiedCount: 1,
			upsertedCount: 0,
			upsertedId: null,
		});

		await updateOrderStatusHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: 'Order status successfully updated.',
		});
	});

	it('should return error when body is missing.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = {};

		await updateOrderStatusHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Orders status data is missing.',
			data: null,
		});
	});

	it('should return error when currentStatus is equal to changedStatus.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = body.statusNotChanges;

		mockFindOne.mockResolvedValue(foundUser);

		await updateOrderStatusHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error:
				'No order status changes, current status and changed status from request is the same.',
			data: null,
		});
	});

	it('should return error when status from changedStatus is equal to status from db.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = body.statusEqualWithDb;

		mockFindOne.mockResolvedValue(foundUser);

		await updateOrderStatusHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error:
				'No order status changes, status from request changed status is equal to status from database.',
			data: null,
		});
	});

	it('should return error when status from changedStatus is the previous status from db.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = body.changeStatusBackward;

		mockFindOne.mockResolvedValue({
			username: 'admin',
			email: 'admin@email.com',
			hash: 'randomstringhash',
			role: 'admin',
			cartItem: [],
			refreshToken: [],
			id: '6411573208396c9c058f3f64',
			orders: [
				{
					orderId: '6VP239489C526362L',
					status: 'DELIVERED',
					total: 24,
					createTime: '2023-05-15T12:04:50Z',
					statusLogs: [
						{
							status: 'PAID',
							updatedTime: '2023-05-25T07:19:50.193Z',
						},
					],
				},
			],
		});

		await updateOrderStatusHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Order status can not go back.',
			data: null,
		});
	});

	it('should return error when status from changedStatus is PAID.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = body.changeStatusBackToPaid;

		mockFindOne.mockResolvedValue(foundUser);

		await updateOrderStatusHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Order status already PAID.',
			data: null,
		});
	});

	it('should return error if HTTP Method is not POST', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'GET';

		await updateOrderStatusHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});
