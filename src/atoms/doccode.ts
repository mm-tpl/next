import smartfetch from '@mmstudio/an000058';
import { Message as M1, Result as R1 } from '../pages/api/doccode.api';
import api from './api';

/**
 * 编码
 * @param name 编码前缀
 * @param num 编码数量
 * @param len 编码中数字的长度
 */
export default function doccode(name: string, num: number, len: number) {
	if (num === 0) {
		return Promise.resolve([] as string[]);
	}
	const uri = typeof window == 'undefined' ? 'http://docode:8890' : api['/api/doccode'];
	return smartfetch<R1, M1>(uri, 'post', {
		name,
		num,
		len
	});
}
