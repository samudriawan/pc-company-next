import { model, models, Schema } from 'mongoose';

const productSchema: Schema = new Schema(
	{
		name: String,
		series: String,
		slug: String,
		cpu: String,
		gpu: String,
		ram: String,
		motherboard: String,
		storage: String,
		psu: String,
		case: String,
		cooler: String,
		price: Number,
		performance: [{ name: String, fps: Number }],
		stock: Number,
	},
	{ timestamps: true }
);

export default models.Product || model('Product', productSchema);
