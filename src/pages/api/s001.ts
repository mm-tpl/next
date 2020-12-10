import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect<
	NextApiRequest,
	NextApiResponse<Record<string, unknown>>
>();

const starttime = new Date().getTime();

function format(millisecond: number) {
	if (millisecond === undefined) {
		return '';
	}
	const seconds = Math.floor(millisecond / 1000);
	const hour = Math.floor(seconds / 60 / 60);
	const min = Math.floor(seconds / 60) - hour * 60;
	const second = seconds - hour * 60 * 60 - min * 60;
	let txt = '';
	if (hour) {
		txt += `${hour}小时`;
	}
	if (min) {
		txt += `${min}分`;
	}
	if (second) {
		txt += `${second}秒`;
	}
	return txt;
}

handler.get((req, res) => {
	const now = new Date().getTime();
	res.statusCode = 200;
	res.json({ time: format(now - starttime) });
});

export default handler;
