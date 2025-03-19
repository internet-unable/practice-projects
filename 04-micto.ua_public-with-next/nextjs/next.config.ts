import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Uncomment in prod
	// output: 'standalone',
	env: {
		NEXT_PUBLIC_GRAPHQL_API: process.env.NEXT_PUBLIC_GRAPHQL_API,
		REACT_GRAPHQL_API: process.env.REACT_GRAPHQL_API,
	},
};

export default nextConfig;
