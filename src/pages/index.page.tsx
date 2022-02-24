import { NextPage, PageConfig } from 'next';
import Head from 'next/head';

interface IProps {
}

/**
 * 01微工厂
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>01微工厂</title>
			</Head>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
