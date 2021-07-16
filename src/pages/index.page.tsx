import { NextPage, PageConfig } from 'next';
import Head from 'next/head';

interface IProps {
}

/**
 * 首页
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>首页</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
				<link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon-32x32.ico" ></link>
				<link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon-16x16.ico"></link>
			</Head>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

