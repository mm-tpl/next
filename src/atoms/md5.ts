import { createHash } from 'crypto';

export default function md5(value: string) {
	return createHash('md5').update(value).digest('hex');
}
