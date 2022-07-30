import AsyncLock from 'async-lock';

const lock = new AsyncLock({
	timeout: 5000,
	maxOccupationTime: 3000,
	maxPending: 1000
});
const key = '01factory';

/**
 * 加锁异步操作。
 * 确保前一次操作完成（或3秒超时）后才能进行后一次操作，后一次操作排队执行。
 */
export default function queue<T>(cb: () => T | Promise<T>) {
	return new Promise<T>((res, rej) => {
		lock.acquire(key, async () => {
			try {
				const ret = await cb();
				res(ret);
			} catch (error) {
				rej(error);
			}
		}, (err) => {
			if (err) {
				rej(err);
			}
		});
	});
}
