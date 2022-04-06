import { NextPage, PageConfig } from 'next';
import Sys from '../sys';

interface IProps {
}

/**
 * 400
 */
const Page: NextPage<IProps> = () => {
	return <Sys code={400} title='Bad Request' subTitle='糟糕……页面请求出错了' />;
};

export const config: PageConfig = {
	amp: false
};

export default Page;
