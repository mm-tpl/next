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
			</Head>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

