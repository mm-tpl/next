import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an46 from '@mmstudio/an000046';
import an48 from '@mmstudio/an000048';

const logger = anylogger('pages/api/getfile/[id]');

export type Result = void;

export type Query = {
	id: string;
	download?: string;
}

/**
 * @openapi
 * /api/file/{id}:
 *   get:
 *     summary: 文件下载
 *     description: 下载文件或在页面中展示文件（一般为图片）
 *     tags:
 *       - file
 *       - 01factory
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     response:
 *       200:
 *         description: file downloaded
 */
const handler = an48<Result>();

handler.get(async (req, res) => {
	try {
		const { id, download } = req.query as Query;
		logger.debug('fileid:', id);
		await an46(id, download, req, res);
	} catch (error) {
		logger.trace(error);
		res.status(404).end((error as Error).message);
	}
});

export const config = {} as PageConfig;

export default handler;
