import { NextPage, PageConfig } from 'next';
import Sys from '../sys';

interface IProps {
}

/**
 * 403
 */
const Page: NextPage<IProps> = () => {
	return <Sys code={403} title='Forbidden' subTitle='糟糕……服务器拒绝访问' />;
};

export const config: PageConfig = {
	amp: false
};

export default Page;

