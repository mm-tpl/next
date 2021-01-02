import { GetStaticProps, NextPage } from 'next';
import useSWR, { mutate } from 'swr';
import anylogger from 'anylogger';
import Head from 'next/head';

const logger = anylogger('pg001');

interface IProps {
	name: string
}

const pg001: NextPage<IProps> = (context) => {
	console.debug(context);	// anylogger would not print anything if configured with log4js, use console would be fine.
	const { data } = useSWR<{ time: string }>('api/s001');
	// const { data } = useSWR<{ time: string; }>('api/s001', { refreshInterval: 3000 });
	async function update() {
		await mutate('api/s001');
	}
	return (
		<>
			<Head>
				<title>mmstudio</title>
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

export default pg001;
