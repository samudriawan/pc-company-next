/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['images.unsplash.com', 'via.placeholder.com'],
		// remotePatterns: [
		// 	{
		// 		hostname: ['images.unsplash.com', 'via.placeholder.com'],
		// 	},
		// ],
	},
};

module.exports = nextConfig;
