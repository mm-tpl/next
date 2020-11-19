import { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.warn('dddddddddddddddd.qqq');
	res.statusCode = 200;
	// res.end({ name: 'John Doe' })
	res.json({ name: 'John Doe' })
}
