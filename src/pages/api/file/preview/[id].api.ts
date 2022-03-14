import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an48 from '@mmstudio/an000048';
import base64encode from './base64encode';
import api from '../../../../atoms/api';

const logger = anylogger('pages/api/file/preview/[id].api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = {
	id: string;
}

/**
 * pages/api/file/preview/[id].api
 */
const handler = an48<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const { id } = req.query as Message;
		const uri = `${req.headers.scheme}://${req.headers.host}${api['/api/file/id']}/${id}`;
		logger.info('preview', uri);
		res.redirect(`/preview/onlinePreview?url=${encodeURIComponent(base64encode(uri))}&watermarkTxt=${encodeURIComponent('01微工厂')}`);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config = {} as PageConfig;

export default handler;
