import createHandler from '@/pages/api/product/create';
import { mockRequestResponse } from '@/lib/test/types.mock';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product, { IProduct } from '@/mongodb/models/Product';

jest.setTimeout(60 * 1000);
mongoose.set('strictQuery', true);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	await mongoose.connect(mongoServer.getUri(), { dbName: 'dzpc' });
	await Product.create({
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
			{ name: 'PUBG', fps: 100 },
			{ name: 'CSGO', fps: 200 },
			{ name: 'GTA V', fps: 90 },
			{ name: 'Warzone', fps: 150 },
		],
		stock: 5,
	});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	jest.resetAllMocks();
});

describe('/api/product/create API endpoint', () => {
	const productMockData = {
		name: 'Streaming PC',
		slug: 'streaming-pc',
		cpu: 'Intel I5-10400F',
		graphic: 'NVIDIA RTX 3050',
		memory: 'DDR4 16GB 3200Mhz (2x8GB)',
		power: '650W 80+ Bronze',
		case: 'NZXT H510',
		cooler: 'ID-COOLING SE 224 XT',
		price: 10,
		performance: [
			{ name: 'PUBG', fps: 100 },
			{ name: 'CSGO', fps: 200 },
			{ name: 'GTA V', fps: 90 },
			{ name: 'Warzone', fps: 150 },
		],
		stock: 5,
	};

	it('should return a successful if all input is valid.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = productMockData;

		await createHandler(req, res);

		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toEqual({
			success: true,
			error: null,
			data: productMockData,
		});
	});

	it('should return error when body is missing.', async () => {
		const { req, res } = mockRequestResponse('POST');
		req.body = {};

		await createHandler(req, res);

		expect(res.statusCode).toBe(400);
	});

	it('should return error when product name is already exist.', async () => {
		const existProduct = {
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
				{ name: 'PUBG', fps: 100 },
				{ name: 'CSGO', fps: 200 },
				{ name: 'GTA V', fps: 90 },
				{ name: 'Warzone', fps: 150 },
			],
			stock: 5,
		};

		const { req, res } = mockRequestResponse('POST');
		req.body = existProduct;

		await createHandler(req, res);

		expect(res.statusCode).toBe(400);
		expect(res._getJSONData()).toEqual({
			success: false,
			error: 'product name is already exist.',
			data: null,
		});
	});

	it('should return error if HTTP Method is not POST', async () => {
		const { req, res } = mockRequestResponse();
		req.method = 'GET';

		await createHandler(req, res);
		expect(res.statusCode).toBe(405);
	});
});

describe('create', () => {
	it('create new product', async () => {
		const createTest: IProduct = await Product.create({
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
				{ name: 'PUBG', fps: 100 },
				{ name: 'CSGO', fps: 200 },
				{ name: 'GTA V', fps: 90 },
				{ name: 'Warzone', fps: 150 },
			],
			stock: 5,
		});

		expect(await Product.findOne({ name: 'Starter PC' }).exec()).toBeTruthy();
	});

	it('should find user with email is already exist', async () => {
		const productDb = await Product.findOne({ name: 'Starter PC' }).exec();

		expect(productDb.name).toBe('Starter PC');
		expect(productDb).toBeTruthy();
	});
});
