import { mockRequestResponse } from '@/lib/test/types.mock';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from '@/mongodb/models/Product';
import { jest } from '@jest/globals';
import getBySlugHandler from '@/pages/api/product/[slug]';

const mockProductData = [
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

describe('/api/product/[slug] API endpoint', () => {
	it('should return failed if query slug is missing.', async () => {
		const { req, res } = mockRequestResponse();

		const mockModel = jest.spyOn(Product, 'findOne');
		mockModel.mockResolvedValue(undefined);

		await getBySlugHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Product not found.',
			data: null,
		});
	});

	it('should return product based on query slug.', async () => {
		const { req, res } = mockRequestResponse();
		req.query = { slug: 'creator-pc' };

		const mockModel = jest.spyOn(Product, 'findOne');
		mockModel.mockResolvedValue(mockProductData[0]);

		await getBySlugHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: [mockProductData[0]],
		});
	});

	it('should return error if query slug is not found on db.', async () => {
		const { req, res } = mockRequestResponse();
		req.query = { slug: 'somethinginvalid' };

		const mockModel = jest.spyOn(Product, 'findOne');
		mockModel.mockResolvedValue(undefined);

		await getBySlugHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'Product not found.',
			data: null,
		});
	});

	it('should return error if HTTP Method is not GET', async () => {
		const { req, res } = mockRequestResponse('POST');

		await getBySlugHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});
