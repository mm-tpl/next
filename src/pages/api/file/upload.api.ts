import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an45 from '@mmstudio/an000045';
import an48 from '@mmstudio/an000048';

const logger = anylogger('pages/api/upload');

export type Result = {
	ok: true;
	fileid: string;
	filename: string;
} | {
	ok: false;
	message: string;
};

export type Message = {

}

export type Query = {

}

/**
 * @openapi
 * /api/upload:
 *   post:
 *     summary: 文件上传
 *     description: 将文件保存进文件服务器，同时返回文件id
 *     tags:
 *       - 01factory
 *     requestBody:
 *       description: 要上传的文件
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     response:
 *       200:
 *         description:返回文件id
 *       500:
 *         description:失败
 */
const handler = an48<Result>();

handler.put(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		// 解析并保存文件
		const [file] = await an45(req);
		res.status(200).json({
			ok: true,
			fileid: file.id,
			filename: file.name
		});
	} catch (error) {
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
}).post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		// 解析并保存文件
		const [file] = await an45(req);
		res.status(200).json({
			ok: true,
			fileid: file.id,
			filename: file.name
		});
	} catch (error) {
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;
