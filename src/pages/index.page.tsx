import { GetStaticProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface IProps {
	spec: Record<string, any>;
}

/**
 * 服务文档
 */
const Page: NextPage<IProps> = ({ spec }) => {
	return (
		<>
			<Head>
				<title>服务文档</title>
			</Head>
			<SwaggerUI spec={spec} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

export const getStaticProps: GetStaticProps = async ctx => {
	const spec: Record<string, any> = createSwaggerSpec({
		apiFolder: 'src/pages/api/',
		openApiVersion: '3.0.0',
		title: '01factory API',
		version: '1.0.0'
	});
	return {
		props: {
			spec
		},
	};
};
