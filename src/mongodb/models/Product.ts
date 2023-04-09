import { Document, Model, model, models, Schema } from 'mongoose';

export interface IProduct extends Document {
	[key: string]: any;
	name: string;
	slug: string;
	cpu: string;
	graphic: string;
	motherboard: string;
	memory: string;
	storage: string;
	power: string;
	case: string;
	cooler: string;
	price: number;
	performance: IPerformance[];
	stock?: number;
	ratingAverage?: number;
	createdAt?: string;
	updatedAt?: string;
}

interface IPerformance {
	game: string;
	fps: number;
}

const productSchema: Schema = new Schema(
	{
		name: { type: String, unique: true },
		slug: { type: String, unique: true },
		cpu: String,
		graphic: String,
		memory: String,
		motherboard: String,
		storage: String,
		power: String,
		case: String,
		cooler: String,
		price: Number,
		performance: [{ game: String, fps: Number, _id: false }],
		stock: { type: Number, default: 1 },
		ratingAverage: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export default (models.Product as Model<IProduct>) ||
	model<IProduct>('Product', productSchema);
