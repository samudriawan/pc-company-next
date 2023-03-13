import { model, models, Schema } from 'mongoose';

const orderSchema: Schema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		products: [{ name: String, price: Number, qty: Number }],
		sumTotal: Number,
		statusLog: [{ status: String, datetime: Date }],
		currentStatus: String,
		shippedDate: String,
	},
	{ timestamps: true }
);

export default models.Order || model('Order', orderSchema);
