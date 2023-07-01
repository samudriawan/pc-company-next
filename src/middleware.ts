import { withAuth } from 'next-auth/middleware';

export default withAuth(
	function middleware() {
		console.log('middleware');
	},
	{
		callbacks: {
			authorized({ token, req }) {
				const pathName = req.nextUrl.pathname;
				// if the return value is true, run the middleware
				// otherwise get 404 _error page

				if (!token) {
					return false;
				}

				if (pathName.includes('admin') && token?.role !== 'admin') {
					// if role is not an admin and try access to admin dashboard,
					// redirect to signin page
					return false;
				}
				return true;
			},
		},
	}
);

export const config = {
	matcher: ['/admin/:path*', '/user/:path*'],
};
