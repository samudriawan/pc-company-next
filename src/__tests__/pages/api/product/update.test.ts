import updateHandler from '@/pages/api/product/update';
import { mockRequestResponse } from '@/lib/test/types.mock';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from '@/mongodb/models/Product';
import { jest } from '@jest/globals';

export const mockProductData = [
	{
		_id: '641c217d4161af5937141c86',
		name: 'Creator PC',
		slug: 'creator-pc',
		cpu: 'Intel I5-10400F',
		graphic: 'NVIDIA RTX 3050',
		memory: 'DDR4 16GB 3200Mhz (2x8GB)',
		power: '650W 80+ Bronze',
		case: 'NZXT H510',
		cooler: 'ID-COOLING SE 224 XT',
		price: 10,
		performance: [
			{ game: 'PUBG', fps: 100 },
			{ game: 'CSGO', fps: 200 },
			{ game: 'GTA V', fps: 90 },
			{ game: 'Warzone', fps: 150 },
		],
		stock: 5,
	},
	{
		_id: '641c2f454161af5937141c8d',
		name: 'Starter PC',
		slug: 'starter-pc',
		cpu: 'Intel I5-10400F',
		graphic: 'NVIDIA RTX 3050',
		memory: 'DDR4 16GB 3200Mhz (2x8GB)',
		power: '650W 80+ Bronze',
		case: 'NZXT H510',
		cooler: 'ID-COOLING SE 224 XT',
		price: 10,
		performance: [
			{ game: 'PUBG', fps: 100 },
			{ game: 'CSGO', fps: 200 },
			{ game: 'GTA V', fps: 90 },
			{ game: 'Warzone', fps: 150 },
		],
		stock: 5,
	},
	{
		_id: '641c53f29eac864bced85770',
		name: 'Creator PC',
		slug: 'creator-pc',
		cpu: 'Intel I5-10400F',
		graphic: 'NVIDIA RTX 3050',
		memory: 'DDR4 16GB 3200Mhz (2x8GB)',
		power: '650W 80+ Bronze',
		case: 'NZXT H510',
		cooler: 'ID-COOLING SE 224 XT',
		price: 10,
		performance: [
			{ game: 'PUBG', fps: 100 },
			{ game: 'CSGO', fps: 200 },
			{ game: 'GTA V', fps: 90 },
			{ game: 'Warzone', fps: 150 },
		],
		stock: 5,
	},
];

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

describe('/api/product/update API endpoint', () => {
	it('should return successful if all is valid.', async () => {
		const { req, res } = mockRequestResponse('PUT');
		req.query = { id: '641c53f29eac864bced85770' };
		req.body = { price: 15, stock: 8 };

		const mockFind = jest.spyOn(Product, 'findOne');
		mockFind.mockResolvedValue(mockProductData.at(-1));

		const mockUpdate = jest.spyOn(Product, 'updateOne');
		mockUpdate.mockResolvedValue({
			acknowledged: true,
			matchedCount: 1,
			modifiedCount: 1,
			upsertedCount: 0,
			upsertedId: null,
		});

		await updateHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: {
				acknowledged: true,
				matchedCount: 1,
				modifiedCount: 1,
				upsertedCount: 0,
				upsertedId: null,
			},
		});
	});

	it('should return failed if query ID is missing.', async () => {
		const { req, res } = mockRequestResponse('PUT');
		req.body = { price: 15, stock: 8 };

		const mockModel = jest.spyOn(Product, 'findOne');
		mockModel.mockResolvedValue(null);

		await updateHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Query ID is missing.',
			data: null,
		});
	});

	it('should return failed if req.body is missing.', async () => {
		const { req, res } = mockRequestResponse('PUT');
		req.query = { id: '5a9427648b0beebeb6957a4b' };

		const mockModel = jest.spyOn(Product, 'findOne');
		mockModel.mockResolvedValue(null);

		await updateHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Request body is missing.',
			data: null,
		});
	});

	it('should return failed if query id is not found on db.', async () => {
		const { req, res } = mockRequestResponse('PUT');
		req.query = { id: '5a9427648b0beebeb6957a4b' };
		req.body = { price: 15, stock: 8 };

		const mockModel = jest.spyOn(Product, 'findOne');
		mockModel.mockResolvedValue(null);

		await updateHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Product is not found.',
			data: null,
		});
	});

	it('should return error if HTTP Method is not PUT', async () => {
		const { req, res } = mockRequestResponse('POST');

		await updateHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});
