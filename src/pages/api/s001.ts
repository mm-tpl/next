import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';

const handler = nextConnect<NextApiRequest, NextApiResponse<{}>>();

handler.get((req, res) => {
	res.statusCode = 200
	res.json({ name: 'mmstudio' })
});

export const config = {} as PageConfig;

export default handler;
