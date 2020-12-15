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
	// i18n: {
	// 	locales: ['en-US', 'zh_CN', 'cn'],
	// 	defaultLocale: 'cn',
	// },
};
