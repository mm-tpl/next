import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
	openApiVersion: '3.0.0',
	apiFolder: 'src/pages/api/',
	title: '01factory API',
	version: '1.0.0'
});
export default swaggerHandler();
