import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an45 from '@mmstudio/an000045';

const logger = anylogger('pages/api/upload');

export type Result = {
	ok: true;
	fileid: string;
} | {
	ok: false;
	message: string;
};

export type Message = {

}

export type Query = {

}

/**
 * 上传文件
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		// 解析并保存文件
		const [file] = await an45(req);
		res.status(200).json({ ok: true, fileid: file.id });
	} catch (error) {
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config = {} as PageConfig;

export default handler;
