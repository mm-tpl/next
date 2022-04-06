import { NextPage, PageConfig } from 'next';
import Sys from '../sys';

interface IProps {
}

/**
 * 402
 */
const Page: NextPage<IProps> = () => {
	return <Sys code={402} title='Payment Required' subTitle='糟糕……页面需要付费进入' />;
};

export const config: PageConfig = {
	amp: false
};

export default Page;

