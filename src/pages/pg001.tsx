import { GetStaticProps, NextPage } from 'next';
import useSWR, { mutate } from 'swr';
import anylogger from 'anylogger';
import Head from 'next/head';

const logger = anylogger('pg001');

interface IProps {
	name: string
}

/**
 * 01factory
 */
const page: NextPage<IProps> = (context) => {
	console.debug(context);	// anylogger would not print anything if configured with log4js, use console would be fine.
	const { data } = useSWR<{ time: string }>('api/s001');
	// const { data } = useSWR<{ time: string; }>('api/s001', { refreshInterval: 3000 });
	async function update() {
		await mutate('api/s001');
	}
	return (
		<>
			<Head>
				<title>01factory</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
				<link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon-32x32.ico" ></link>
				<link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon-16x16.ico"></link>
			</Head>
			<div>Hello {context.name} !</div>
			<br />
			<input type="button" value="update" onClick={update} />
			<br />
			<div>系统已启动: {data?.time}</div>
		</>
	);
};

export const getStaticProps: GetStaticProps<IProps> = async (content) => {
	logger.info(content);
	return Promise.resolve({
		props: {
			name: 'mmstudio',
		},
	});
};

export default page;
