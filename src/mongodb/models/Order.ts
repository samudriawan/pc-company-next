import { Document, model, models, Schema } from 'mongoose';
import { IProduct } from './Product';
import { IUser } from './User';

export interface IOrder extends Document {
	userId: IUser['_id'];
	products: IProductInfo[];
	sumTotal: number;
	statusLog: IStatusLog[];
	currentStatus: string;
	shippedDate: string;
}

interface IProductInfo {
	name: IProduct['name'];
	price: IProduct['price'];
	qty: number;
}

interface IStatusLog {
	status: string;
	datetime: Date;
}

const orderSchema: Schema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		products: [{ name: String, price: Number, qty: Number }],
		sumTotal: Number,
		statusLog: [{ status: String, datetime: Date }],
		currentStatus: String,
		shippedDate: String,
	},
	{ timestamps: true }
);

export default models.Order || model<IOrder>('Order', orderSchema);
