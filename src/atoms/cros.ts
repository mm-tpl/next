import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import anylogger from 'anylogger';

const logger = anylogger('cros');

export default function cros<T>() {
	return nextConnect<NextApiRequest, NextApiResponse<T>>()
		.use<NextApiRequest, NextApiResponse<T>>((req, res, next) => {
			// h5应用需要设置，小程序不进行options请求，也不存在跨域问题
			const acao = req.headers.origin;
			logger.debug('method', req.method, 'headers', req.headers);
			if (acao) {
				// h5时有值，微信小程序请求时origin为空值
				res.setHeader('Access-Control-Allow-Origin', acao);
				res.setHeader('Access-Control-Allow-Headers', 'content-type, x-requested-with');
				// res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
				res.setHeader('Access-Control-Allow-Methods', 'POST,GET');
				res.setHeader('Access-Control-Allow-Credentials', 'true');
			}
			next();
		})
		.options((req, res) => {
			res.end();
		});
}
