import { mockRequestResponse } from '@/lib/test/types.mock';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '@/mongodb/models/User';
import updateUserHandler from '@/pages/api/account/users/update';

jest.setTimeout(120 * 1000);
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
	jest.clearAllMocks();
});

describe('/api/account/users/update API endpoint', () => {
	describe('username update', () => {
		test('should return username update success.', async () => {
			const { req, res } = mockRequestResponse('PUT');
			req.body = {
				id: '641136faab73fcce8979cd92',
				username: 'new dayz',
			};

			User.findOne = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue({
					_id: '641136faab73fcce8979cd92',
					username: 'dayz',
					hash: 'somehash',
				}),
			}));

			User.find = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue([]),
			}));

			User.updateOne = jest.fn().mockResolvedValue({
				matchedCount: 1,
				modifiedCount: 1,
				acknowledged: true,
			});

			await updateUserHandler(req, res);

			expect(res.statusCode).toBe(200);
			expect(res._getJSONData()).toEqual({
				success: true,
				error: null,
				data: `Your username is successfully updated to ${req.body.username}.`,
			});
		});

		test('should failed return username already in used.', async () => {
			const { req, res } = mockRequestResponse('PUT');
			req.body = {
				id: '641136faab73fcce8979cd92',
				username: 'new dayz',
			};

			User.findOne = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue({
					_id: '641136faab73fcce8979cd92',
					username: 'dayz',
					hash: 'somehash',
				}),
			}));

			User.find = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue([
					{
						_id: '641136faab73fcce8979cd92',
						username: 'new dayz',
					},
				]),
			}));

			await updateUserHandler(req, res);

			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toEqual({
				success: false,
				error: 'Username already in used.',
				data: null,
			});
		});

		test('should return username failed to update.', async () => {
			const { req, res } = mockRequestResponse('PUT');
			req.body = {
				id: '641136faab73fcce8979cd92',
				username: 'some invalid string',
			};

			User.findOne = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue({
					_id: '641136faab73fcce8979cd92',
					username: 'dayz',
					hash: 'somehash',
				}),
			}));

			User.find = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue([]),
			}));

			User.updateOne = jest.fn().mockResolvedValue({
				matchedCount: 0,
				modifiedCount: 0,
				acknowledged: true,
			});

			await updateUserHandler(req, res);

			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toEqual({
				success: false,
				error: 'Username failed to update.',
				data: null,
			});
		});

		test('should return update failed if change using same username.', async () => {
			const { req, res } = mockRequestResponse('PUT');
			req.body = {
				id: '641136faab73fcce8979cd92',
				username: 'new dayz',
			};

			User.findOne = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue({
					_id: '641136faab73fcce8979cd92',
					username: 'new dayz',
					hash: 'somehash',
				}),
			}));

			User.find = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue([]),
			}));

			User.updateOne = jest.fn().mockResolvedValue({
				matchedCount: 0,
				modifiedCount: 0,
				acknowledged: true,
			});

			await updateUserHandler(req, res);

			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toEqual({
				success: false,
				error: 'Can not change with the same username.',
				data: null,
			});
		});
	});

	describe('update password', () => {
		test('should return password update success.', async () => {
			const { req, res } = mockRequestResponse('PUT');
			req.body = {
				id: '641136faab73fcce8979cd92',
				current: 'password',
				new: 'pass123',
				retype: 'pass123',
			};

			User.findOne = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue({
					_id: '641136faab73fcce8979cd92',
					username: 'dayz',
					hash: 'somehash',
				}),
			}));

			jest
				.spyOn(bcrypt, 'compare')
				.mockImplementation(() => Promise.resolve(true));

			jest
				.spyOn(bcrypt, 'hash')
				.mockImplementation(() => Promise.resolve('newhash'));

			User.updateOne = jest.fn().mockResolvedValue({
				matchedCount: 1,
				modifiedCount: 1,
				acknowledged: true,
			});

			await updateUserHandler(req, res);

			expect(res.statusCode).toBe(200);
			expect(res._getJSONData()).toEqual({
				success: true,
				error: null,
				data: 'Your password is successfully updated.',
			});
		});

		test('should return failed if new password and retype password do not match.', async () => {
			const { req, res } = mockRequestResponse('PUT');
			req.body = {
				id: '641136faab73fcce8979cd92',
				current: 'password',
				new: 'newpass',
				retype: 'pass1234',
			};
			User.findOne = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue({
					_id: '641136faab73fcce8979cd92',
					username: 'dayz',
					hash: 'somehash',
				}),
			}));
			await updateUserHandler(req, res);
			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toEqual({
				success: false,
				error: 'Retype new password did not match.',
				data: null,
			});
		});

		test('should return failed if new password and stored hash do not match.', async () => {
			const { req, res } = mockRequestResponse('PUT');
			req.body = {
				id: '641136faab73fcce8979cd92',
				current: 'password',
				new: 'newpass',
				retype: 'newpass',
			};
			User.findOne = jest.fn().mockImplementationOnce(() => ({
				select: jest.fn().mockResolvedValue({
					_id: '641136faab73fcce8979cd92',
					username: 'dayz',
					hash: 'somehash',
				}),
			}));
			jest
				.spyOn(bcrypt, 'compare')
				.mockImplementation(() => Promise.resolve(false));
			await updateUserHandler(req, res);
			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toEqual({
				success: false,
				error: 'Current password did not match.',
				data: null,
			});
		});
	});

	test('should return error if user not found in db.', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'PUT';
		req.body = {
			id: '641136faab73fcce8979cdie',
			username: 'new dayz',
		};

		User.findOne = jest.fn().mockImplementationOnce(() => ({
			select: jest.fn().mockResolvedValue(null),
		}));

		await updateUserHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'User not found.',
			data: null,
		});
	});

	test('should return error if HTTP body is missing.', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'PUT';

		await updateUserHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'HTTP body is missing.',
			data: null,
		});
	});

	test('should return error if HTTP body ID is missing.', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'PUT';
		req.body = {
			id: '',
			username: 'new dayz',
		};

		await updateUserHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'HTTP body ID is missing.',
			data: null,
		});
	});

	test('should return error if HTTP body username and password is missing.', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'PUT';
		req.body = {
			id: '641136faab73fcce8979cdie',
		};

		User.findOne = jest.fn().mockImplementationOnce(() => ({
			select: jest.fn().mockResolvedValue({
				_id: '641136faab73fcce8979cd92',
				username: 'dayz',
				hash: 'somehash',
			}),
		}));

		await updateUserHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'New username and new password is empty.',
			data: null,
		});
	});

	test('should return error if HTTP Method is not PUT', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'POST';

		await updateUserHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});
