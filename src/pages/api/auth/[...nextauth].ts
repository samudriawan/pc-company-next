import clientPromise from '@/mongodb/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
				// const decodedBody = Buffer.from(req.body?.data, 'base64').toString();
				// const [email, password] = decodedBody.split(':');

				if (
					credentials?.email === 'email@email.com' &&
					credentials?.password === 'password'
				) {
					return {
						id: '1',
						name: 'dayz',
						email: credentials?.email,
						role: 'admin',
						image: 'https://via.placeholder.com/24x24.png/09f/fff',
					};
				} else {
					throw new Error('invalid email or password');
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
			// console.log('session callbacks');
			params.session.user.role = params.token.role;
			return params.session;
		},
	},
});
