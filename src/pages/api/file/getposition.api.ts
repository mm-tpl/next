import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an48 from '@mmstudio/an000048';
import mmconf from '@mmstudio/config';

const logger = anylogger('pages/api/file/getposition.api');

const tianditu = mmconf.tianditu as {
	appkey: string;
};

export type Data = {
	result: {
		formatted_address: string;
		location: {
			lon: number;
			lat: number;
		};
		addressComponent: {
			address: string;
			city: string;
			county_code: string;
			nation: string;
			poi_position: string;
			county: string;
			city_code: string;
			address_position: string;
			poi: string;
			province_code: string;
			province: string;
			road: string;
			road_distance: number;
			poi_distance: number;
			address_distance: number;
		};
	};
	msg: 'ok';
	status: '0';
};

export type Result = {
	ok: boolean;
	data: Data;
};

export type Message = {
	/**
	 * 经度
	 */
	x: number;
	/**
	 * 纬度
	 */
	y: number
}

/**
 * 根据经纬度获取位置
 */
const handler = an48<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const { x, y } = req.body as Message;
		if (!x && !y) {
			res.status(200).json({
				ok: false,
				data: {} as Data
			});
			return;
		}
		const appid = tianditu.appkey;
		const ret = await fetch(`https://api.tianditu.gov.cn/geocoder?postStr={'lon':${x},'lat':${y},'ver':1}&type=geocode&tk=${appid}`);
		const data = await ret.json() as Data;
		if (data.status === '0') {
			res.status(200).json({
				ok: true,
				data
			});
		}
		else {
			res.status(200).json({
				ok: false,
				data: {} as Data
			});
		}
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, data: {} as Data });
	}
});

export const config = {} as PageConfig;

export default handler;
