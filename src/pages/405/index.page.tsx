import { NextPage, PageConfig } from 'next';
import Sys from '../sys';

interface IProps {
}

/**
 * 405
 */
const Page: NextPage<IProps> = () => {
	return <Sys code={405} title='Method Not Allowed' subTitle='糟糕……请求方法不被允许' />;
};

export const config: PageConfig = {
	amp: false
};

export default Page;

