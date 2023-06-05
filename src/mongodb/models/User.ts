import { Schema, model, models, Document, Model } from 'mongoose';

export interface IUser extends Document {
	username: string;
	email: string;
	hash: string;
	role: string;
	orders: Order[];
	refreshToken: string[];
}

export interface Order {
	orderId: string
	items: OrderItems[]
	total: number
	status: string
	statusLogs: StatusLog[]
	createTime: string
}

interface OrderItems {
	name: string
	price: number
	quantity: number
}

interface StatusLog {
	status: string;
	updatedTime: string;
}

const userSchema: Schema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		hash: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'member',
		},
		orders: [{
			orderId: String,
			status: String,
			statusLogs: [{ status: String, updatedTime: String, _id: false }],
			items: [{
				_id: false,
				name: String,
				price: Number,
				quantity: Number
			}],
			total: Number,
			createTime: String,
			_id: false
		}],
		refreshToken: [String],
	},
	{ timestamps: true }
);

export default (models.User as Model<IUser>) || model<IUser>('User', userSchema);
