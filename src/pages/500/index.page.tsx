import { NextPage, PageConfig } from 'next';
import Sys from '../sys';

interface IProps {
}

/**
 * 500
 */
const Page: NextPage<IProps> = () => {
	return <Sys code={500} title='Internal Server Error' subTitle='糟糕……内部服务器出现错误' />;
};

export const config: PageConfig = {
	amp: false
};

export default Page;

