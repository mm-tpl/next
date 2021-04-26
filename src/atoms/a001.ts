/**
 * 发出http请求
 * @param service 服务地址
 * @param method 请求方式
 * @param msg 消息体
 */
export default async function smartfetch<R, T>(service: string, method: 'get' | 'put' | 'post' | 'delete', msg?: T) {
	const body = JSON.stringify(msg);
	const res = await fetch(service, {
		method: 'put',
		body,
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});
	if (res.ok) {
		const data = await res.json() as R;
		return data;
	}
	throw new Error(res.statusText);
}
