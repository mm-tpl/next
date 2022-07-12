
/**
 * 获取当前经纬度
 */
export default function getLocation() {
	return new Promise<{
		lon: number;
		lat: number;
	}>((res, rej) => {
		if (!navigator.geolocation) {
			rej('Geolocation is not supported by this browser.');
			return;
		}
		navigator.geolocation.getCurrentPosition((position) => {
			const lon = position.coords.longitude;
			const lat = position.coords.latitude;
			res({
				lat,
				lon
			});
		}, (error) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					rej('用户拒绝对获取地理位置的请求。');
					break;
				case error.POSITION_UNAVAILABLE:
					rej('位置信息是不可用的。');
					break;
				case error.TIMEOUT:
					rej('请求用户地理位置超时。');
					break;
				default:
					rej('未知错误。');
					break;
			}
		}, {
			enableHighAccuracy: false
		});
	});
}
