import { Schema, model, models } from 'mongoose';

const userSchema: Schema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
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
		cartItem: [
			{
				productName: { type: String, trim: true },
				productQty: { type: Number },
			},
		],
		refreshToken: [String],
	},
	{ timestamps: true }
);

export default models.User || model('User', userSchema);
