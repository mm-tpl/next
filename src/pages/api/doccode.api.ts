import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an48 from '@mmstudio/an000048';
import doccode from '../../atoms/doccode';

const logger = anylogger('pages/api/doccode.api');

export type Result = string[];

export type Message = {
	name: string;
	num: number;
	len: number;
}

/**
 * 编码服务
 */
const handler = an48<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const { name, len, num } = req.body as Message;
		const codes = await doccode(name, num, len);
		res.status(200).json(codes);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(500).json([]);
	}
});

export const config = {} as PageConfig;

export default handler;
