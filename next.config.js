/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["i.pinimg.com", "images.hdqwalls.com", "get.wallhere.com"],
	},
};

module.exports = nextConfig;
