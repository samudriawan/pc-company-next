import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default nextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'email',
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const user = { id: '1', name: 'dayz', email: 'email@email.com' };
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				if (email === 'email@email.com' && password === 'password') {
					return user;
				} else {
					throw new Error('invalid email or password');
				}
			},
		}),
	],
	pages: {
		signIn: '/src/pages/auth/signin',
	},
});
