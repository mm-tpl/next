import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an48 from '@mmstudio/an000048';
import an53 from '@mmstudio/an000053';

const logger = anylogger('pages/api/file/delete.api');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	/**
	* 文件id
	*/
	id: string;
}

/**
 * 文件删除
 */
const handler = an48<Result>();

handler.delete(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const { id } = req.query as Message;
		if (id) {
			//remove files
			await an53(id);
		}
		res.status(200).json({ ok: true });
	} catch (error) {
		const msg = (error as Error).message;
		logger.error(error);
		res.status(500).end(msg);
	}
});

export const config = {} as PageConfig;

export default handler;
