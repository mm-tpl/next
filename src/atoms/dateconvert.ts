/**
 * 日期转换展示
 * @param type 0=yyyy-mm-dd 1=yyyy-mm-dd hh:mm:ss 2=yyyy年mm月dd日hh:mm:ss 2=yyyy年mm月dd日hh:mm
 */
export default function dt2str(time: number | string, type = 1) {
	if (!time || Number(time) <= 0) {
		return '';
	}
	const dt = new Date(Number(time));
	const year = dt.getFullYear().toString().padStart(4, '0');
	const month = (dt.getMonth() + 1).toString().padStart(2, '0');
	const date = dt.getDate().toString().padStart(2, '0');
	const hours = dt.getHours().toString().padStart(2, '0');
	const minutes = dt.getMinutes().toString().padStart(2, '0');
	const seconds = dt.getSeconds().toString().padStart(2, '0');
	switch (type) {
		case 0:
			return `${year}-${month}-${date}`;
		case 2:
			return `${year}年${month}月${date}日${hours}:${minutes}:${seconds}`;
		case 3:
			return `${year}-${month}-${date} ${hours}:${minutes}`;
		case 4:
			return `${year}年${month}月${date}日${hours}时${minutes}分`;
		case 5:
			return `${year}-${month}-${date} ${hours}:${minutes}`;
		case 1:
		default:
			return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
	}
};
