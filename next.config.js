const withTM = require('next-transpile-modules')([/*'antd-mobile'*/]);

module.exports = withTM({
	pageExtensions: ['page.tsx', 'api.ts'],
	async redirects() {
		return [
			// {
			// 	source: '/',
			// 	destination: '/pg001',
			// 	permanent: true,
			// },
		]
	},
	// i18n: {
	// 	locales: ['en-US', 'zh_CN', 'cn'],
	// 	defaultLocale: 'cn',
	// },
});
