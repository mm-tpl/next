import an39 from '@mmstudio/an000039';
import { NextApiRequest } from 'next';
import getkey from './key';

interface User {
	// todo
}

/**
 * 从Cookie中获取数据
 */
export default function getuser(req: NextApiRequest) {
	const key = getkey();
	const token = req.cookies[key];
	return an39<User>(token);
}
