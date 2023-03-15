import User from '@/mongodb/models/User';
import clientPromise from '@/mongodb/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export default nextAuth({
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'email',
			type: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				const foundUser = await User.findOne({ email }).exec();

				if (!foundUser) throw new Error('email or password did not correct.');

				const isValid = await bcrypt.compare(password, foundUser.hash);
				if (isValid) {
					return {
						id: foundUser._id,
						name: foundUser.username,
						email,
						role: foundUser.role,
					};
				} else {
					throw new Error('password did not correct.');
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		async jwt(params) {
			if (params.user?.role) {
				params.token.role = params.user.role;
			}
			return params.token;
		},
		async session(params) {
			params.session.user.role = params.token.role;
			return params.session;
		},
	},
});
