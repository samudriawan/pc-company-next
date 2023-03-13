import handler from '@/pages/api/account/users/register';
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
	jest.resetAllMocks();
});

describe('/api/account/users/register API endpoint', () => {
	function encodeData(username: string, email: string, password: string) {
		return Buffer.from(`${username}:${email}:${password}`).toString('base64');
	}

	test('should return a successful if all input is valid.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = { user: encodeData('dayz', 'dayz@email.com', 'password') };

		await handler(req, res);

		expect(res.statusCode).toBe(200);
	});

	it('should return error if email and/or password is missing.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = { user: '' };

		await handler(req, res);
		expect(res.statusCode).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			success: false,
			error: 'email and password is missing.',
			data: null,
		});
	});

	it('should return error email is not valid', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = { user: encodeData('dayz', 'emailemail.com', 'password') };

		await handler(req, res);
		expect(res.statusCode).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			success: false,
			error: 'email is not valid.',
			data: null,
		});
	});

	it('should return error when email is already exist.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = { user: encodeData('dayz', 'email@email.com', 'password') };

		await handler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'email is already exist.',
			data: null,
		});
	});

	it('should return error if HTTP Method is not POST', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'GET';

		await handler(req, res);
		expect(res.statusCode).toBe(405);
	});
});

describe('register', () => {
	it('connect to mongo server', async () => {
		const userTest = await User.create({
			username: 'dayz',
			email: 'dayz@email.com',
			hash: 'randomstringhash',
			role: 'member',
			cartItem: [],
			refreshToken: [],
		});
		console.log(userTest);

		expect(await User.countDocuments({})).toBe(1);
	});
});
