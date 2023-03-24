/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
	throw new Error('Please add your NEXT_PUBLIC_MONGODB_URI to .env.local');
}

const MONGODB_URI: string = process.env.NEXT_PUBLIC_MONGODB_URI;

async function dbConnect() {
	try {
		await mongoose.connect(MONGODB_URI);
	} catch (err) {
		console.log(err);
	}
}

export default dbConnect;
