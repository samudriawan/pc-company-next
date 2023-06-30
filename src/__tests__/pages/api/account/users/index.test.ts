import { mockRequestResponse } from '@/lib/test/types.mock';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '@/mongodb/models/User';
import getUserHandler from '@/pages/api/account/users';
import dbConnect from '@/mongodb/dbConnect';

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
	jest.resetAllMocks();
});

describe('/api/account/users API endpoint', () => {
	test('should return a successful if all input is valid.', async () => {
		const { req, res } = mockRequestResponse();
		req.query.id = '641136faab73fcce8979cd92';

		User.findOne = jest.fn().mockImplementationOnce(() => ({
			select: jest.fn().mockResolvedValue({
				_id: '641136faab73fcce8979cd92',
				username: 'dayz',
			}),
		}));

		jest.mock('dbConnect');

		await getUserHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: { username: 'dayz', _id: '641136faab73fcce8979cd92' },
		});
	});

	it('should return error if req.query.id is missing.', async () => {
		const { req, res } = mockRequestResponse();
		req.query.id = '';

		await getUserHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			success: false,
			error: 'User ID is missing.',
			data: null,
		});
	});

	it('should return error if req.query.id is not found.', async () => {
		const { req, res } = mockRequestResponse();
		req.query.id = 'invalidid';

		User.findOne = jest.fn().mockImplementationOnce(() => ({
			select: jest.fn().mockResolvedValue(null),
		}));

		await getUserHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			success: false,
			error: 'User not found.',
			data: null,
		});
	});

	it('should return error if HTTP Method is not GET', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'POST';

		await getUserHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});
