import getHandler from '@/pages/api/product';
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

describe('/api/product API endpoint', () => {
	it('should return all products if query id does not provide.', async () => {
		const { req, res } = mockRequestResponse();

		const mockModel = jest.spyOn(Product, 'find');
		mockModel.mockResolvedValue(mockProductData);

		await getHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: mockProductData,
		});
	});

	it('should return product based on query ID.', async () => {
		const { req, res } = mockRequestResponse();
		req.query = { id: '641c53f29eac864bced85770' };

		const mockModel = jest.spyOn(Product, 'findOne');
		mockModel.mockResolvedValue([mockProductData.at(-1)]);

		await getHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: [mockProductData.at(-1)],
		});
	});

	it('should return all product if query id is not found on db.', async () => {
		const { req, res } = mockRequestResponse();
		req.query = { id: '5a9427648b0beebeb6957a4b' };

		const mockModel = jest.spyOn(Product, 'find');
		mockModel.mockResolvedValue([mockProductData]);

		await getHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: [mockProductData],
		});
	});

	it('should return error if HTTP Method is not GET', async () => {
		const { req, res } = mockRequestResponse('POST');

		await getHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});
