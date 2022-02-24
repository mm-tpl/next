import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an48 from '@mmstudio/an000048';
import base64encode from '../base64encode';
import api from '../../../../../atoms/api';

const logger = anylogger('pages/api/file/preview/imgs/[ids].api');

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
	ids: string;
}

const separator = '|';

/**
 * pages/api/file/preview/imgs/[ids].api
 */
const handler = an48<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const { ids } = req.query as Message;
		const uris = ids.split(separator).map((id) => {
			return `${req.headers.scheme}://${req.headers.host}${api['/api/file/id']}/${id}`;
		});
		res.redirect(`/preview/picturesPreview?urls=${encodeURIComponent(base64encode(uris.join(separator)))}&watermarkTxt=${encodeURIComponent('01微工厂')}'`);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config = {} as PageConfig;

export default handler;
