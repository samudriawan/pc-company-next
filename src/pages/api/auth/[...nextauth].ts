import User from '@/mongodb/models/User';
import clientPromise from '@/mongodb/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import dbConnect from '@/mongodb/dbConnect';
import NextAuth from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, createOptions(req));
};

export const createOptions = (req: NextApiRequest): AuthOptions => ({
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

				await dbConnect();

				const foundUser = await User.findOne({ email });

				if (!foundUser) throw new Error('email or password did not correct.');

				const isValid = await bcrypt.compare(password, foundUser.hash);
				if (isValid) {
					return {
						id: foundUser._id,
						name: foundUser.username,
						email,
						role: foundUser.role,
						image: null,
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
			// If the specific query param(s) exist(s), we know it's
			// an update. So we add it to the token
			// This is the best place to make an API request so you
			// can complete the data
			if (req.query?.name) {
				params.token.name = req.query.name as string;
			}

			if (params.user) {
				params.token.role = params.user.role;
				params.token.id = params.user.id;
			}
			return params.token;
		},
		async session(params) {
			params.session.user.name = params.token.name;
			params.session.user.role = params.token.role;
			params.session.user.id = params.token.id;
			return params.session;
		},
	},
});

export default handler;
