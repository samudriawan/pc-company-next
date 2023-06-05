import { Document, model, models, Schema } from 'mongoose';
import { IProduct } from './Product';
import { IUser } from './User';

export interface Order extends Document {
	userId: IUser['_id'];
	products: ProductInfo[];
	sumTotal: number;
	statusLog: StatusLog[];
	status: string;
}

interface ProductInfo {
	name: IProduct['name'];
	price: IProduct['price'];
	qty: number;
}

interface StatusLog {
	status: string;
	updatedTime: string;
}

const orderSchema: Schema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		products: [{ name: String, price: Number, qty: Number }],
		sumTotal: Number,
		statusLog: [{ status: String, updatedTime: String }],
		status: String,
	},
	{ timestamps: true }
);

export default models.Order || model<Order>('Order', orderSchema);
