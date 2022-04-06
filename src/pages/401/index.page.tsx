import { NextPage, PageConfig } from 'next';
import Sys from '../sys';

interface IProps {
}

/**
 * 401
 */
const Page: NextPage<IProps> = () => {
	return <Sys code={401} title='Unauthorized' subTitle='糟糕……页面未经过授权' />;
};

export const config: PageConfig = {
	amp: false
};

export default Page;

