import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import DownloadTemplate from './download-template';
import Uploader from './uploader';

interface IProps {
}

/**
 * 导入数据表
 */
const page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>导入数据表</title>
			</Head>
			<DownloadTemplate></DownloadTemplate>
			<Uploader
				multiple={false}
				onChange={() => {
				}}
				defaultFiles={[]}
			/>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;
