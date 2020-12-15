module.exports = {
	// async exportPathMap(
	// 	defaultPathMap,
	// 	{ dev, dir, outDir, distDir, buildId }
	// ) {
	// 	return {
	// 		'/': { page: '/pg001' },
	// 	};
	// },
	async redirects() {
		return [
			{
				source: '/',
				destination: '/pg001',
				permanent: true,
			},
		]
	},
};
