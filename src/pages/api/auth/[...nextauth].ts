import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default nextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'email',
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				if (email === 'email@email.com' && password === 'password') {
					return {
						id: '1',
						name: 'dayz',
						email: 'email@email.com',
						role: 'member',
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
