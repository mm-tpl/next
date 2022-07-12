import an39 from '@mmstudio/an000039';
import { NextApiRequest } from 'next';
import getkey from './key';

interface IUser {

}
/**
 * 从Cookie中获取数据
 */
export default async function getuser(req: NextApiRequest) {
	const key = getkey();
	const token = req.cookies[key];
	try {
		return await an39<IUser>(token);
	} catch (error) {
		return null;
	}
}
