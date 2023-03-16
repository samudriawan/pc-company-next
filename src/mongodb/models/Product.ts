import { Document, model, models, Schema } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	category: string;
	slug: string;
	cpu: string;
	graphic: string;
	memory: string;
	power: string;
	case: string;
	cooler: string;
	price: number;
	performance: IPerformance[];
	stock: number;
}

interface IPerformance {
	name: string;
	fps: number;
}

const productSchema: Schema = new Schema(
	{
		name: String,
		category: String,
		slug: String,
		cpu: String,
		graphic: String,
		memory: String,
		motherboard: String,
		storage: String,
		power: String,
		case: String,
		cooler: String,
		price: Number,
		performance: [{ name: String, fps: Number }],
		stock: Number,
	},
	{ timestamps: true }
);

export default models.Product || model<IProduct>('Product', productSchema);
