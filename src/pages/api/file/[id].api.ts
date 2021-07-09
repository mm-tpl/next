import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an46 from '@mmstudio/an000046';
import an48 from '@mmstudio/an000048';

const logger = anylogger('pages/api/getfile/[id]');

export type Result = void;

export type Query = {
	id: string;
}

/**
 * 下载展示文件
 */
const handler = an48<Result>();

handler.get(async (req, res) => {
	try {
		const { id } = req.query as Query;
		logger.debug('fileid:', id);
		// 将下载文件返回给调用者
		await (() => {
			const param1 = id;	// file id
			const param2 = false;	// 是否下载.可以为文件名,或"true","false"
			return an46(param1, param2, req, res);
		})();
	} catch (error) {
		logger.trace(error);
		res.status(200).end((error as Error).message);
	}
});

export const config = {} as PageConfig;

export default handler;
