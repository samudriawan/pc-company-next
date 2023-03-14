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
	await User.create([
		{
			username: 'dayz',
			email: 'dayz@email.com',
			hash: 'randomstringhash',
			role: 'member',
			cartItem: [],
			refreshToken: [],
		},
		{
			username: 'admin',
			email: 'admin@email.com',
			hash: 'randomstringhash',
			role: 'admin',
			cartItem: [],
			refreshToken: [],
		},
		{
			username: 'member',
			email: 'member@email.com',
			hash: 'randomstringhash',
			role: 'member',
			cartItem: [],
			refreshToken: [],
		},
	]);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	jest.resetAllMocks();
});

describe('/api/account/users/register API endpoint', () => {
	test('should return a successful if all input is valid.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = {
			username: 'dayz',
			email: 'dzpc@email.com',
			password: 'password',
		};

		await handler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: { username: 'dayz', email: 'dzpc@email.com' },
		});
	});

	it('should return error if email is missing.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = { username: 'dayz', email: '', password: 'password' };

		await handler(req, res);
		expect(res.statusCode).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			success: false,
			error: 'email and password is missing.',
			data: null,
		});
	});

	it('should return error if password is missing.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = { username: 'dayz', email: 'email@email.com', password: '' };

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
		req.body = {
			username: 'dayz',
			email: 'dzpcemail.com',
			password: 'password',
		};

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
		req.body = {
			username: 'dayz',
			email: 'dayz@email.com',
			password: 'password',
		};

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
	it('create new user', async () => {
		const userTest = await User.create({
			username: 'alca',
			email: 'alca@email.com',
			hash: 'randomstringhash',
			role: 'member',
			cartItem: [],
			refreshToken: [],
		});

		expect(await User.findOne({ email: 'alca@email.com' }).exec()).toBeTruthy();
	});

	it('should find user with email is already exist', async () => {
		const userDb = await User.findOne({ email: 'dayz@email.com' }).exec();

		expect(userDb.email).toBe('dayz@email.com');
	});
});
