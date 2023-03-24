import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
	username: string;
	email: string;
	hash: string;
	role: string;
	refreshToken: string[];
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
		refreshToken: [String],
	},
	{ timestamps: true }
);

export default models.User || model<IUser>('User', userSchema);
