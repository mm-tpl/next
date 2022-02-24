import fs from 'fs/promises';
import an41 from '@mmstudio/an000041';
import '@mmstudio/an000042';
import an43 from '@mmstudio/an000043';
import an48 from '@mmstudio/an000048';
import mmconf from '@mmstudio/config';
import anylogger from 'anylogger';
import { CanvasRenderingContext2D, createCanvas, loadImage } from 'canvas';
import { ExifData, ExifImage } from 'exif';
import { NextApiRequest, PageConfig } from 'next';

const tianditu = mmconf.tianditu as {
	appkey: string;
};

const logger = anylogger('pages/api/file/watermark.api');

export type Result = {
	ok: true;
	fileid: string;
} | {
	ok: false;
	message: string;
};


export type Fields = {
	x: [string];
	y: [string];
	tm: [string];	// 时间 bigint
}

/**
 * 图片添加水印
 */
const handler = an48<Result>();

handler.put(async (req, res) => {
	try {
		//logger.debug('msg body:', req.body);
		// 解析并保存文件
		const [file] = await upload(req);
		res.status(200).json({ ok: true, fileid: file.id });
	} catch (error) {
		logger.error(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
}).post(async (req, res) => {
	try {
		//logger.debug('msg body:', req.body);
		// 解析并保存文件
		const [file] = await upload(req);
		res.status(200).json({ ok: true, fileid: file.id });
	} catch (error) {
		logger.error(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

async function upload(req: NextApiRequest) {
	logger.debug('start uploading files');
	const files = await an41<Fields>(req);
	logger.debug('files:', files);
	// const info = await getimginfo('/01factory/test.jpg');
	// logger.debug('iiiii', info);
	const converted = await Promise.all(files.map(async (file) => {
		const info = await getimginfo(file.path, file.fields);
		const img = await loadImage(file.path);
		const canvas = createCanvas(img.width, img.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, img.width, img.height);

		const x = 50;
		const height = 200;
		// font 1. WenQuanYi Micro Hei 2. WenQuanYi Micro Hei Mono 3. WenQuanYi Zen Hei 4. WenQuanYi Zen Hei Mono 5. WenQuanYi Zen Hei Sharp
		ctx.fillStyle = '#fff';
		ctx.font = '150px WenQuanYi Micro Hei Mono';
		function getmaxtextlen(ctx: CanvasRenderingContext2D, maxwidth: number, borderwidth: number) {
			const width = maxwidth - borderwidth * 2;
			if (maxwidth < width) {
				return 0;	// 图片过小
			}
			let txt = '道';
			while (ctx.measureText(txt).width < width) {
				txt += '道';
			}
			return txt.length;
		}
		function drawtext(ctx: CanvasRenderingContext2D, imagewidth: number, borderwidth: number, text: string, startx: number, starty: number, lineheight: number) {
			const len = getmaxtextlen(ctx, imagewidth, borderwidth);
			if (len <= 0) {
				return starty;
			}
			const lines = (text.length / len) + ((text.length % len) ? 1 : 0);
			let left = '';
			let right = text;
			let y = starty - lines * lineheight;
			do {
				left = right.substring(0, len);
				right = right.substring(len);
				ctx.fillText(left, startx, y);
				y += lineheight;
			} while (left.length > 0);
			return lines;
		}
		const lines = drawtext(ctx, img.width, 50, info.position, x, img.height, height);
		const yy = img.height - lines * height;
		// ctx.fillText(info.position, x, img.height - height);
		ctx.fillText(info.date, x, yy - height);
		ctx.fillText(info.time, x, yy - height * 2);

		const buf = canvas.toBuffer();
		await fs.writeFile(file.path, buf);
		// Draw line under text
		// ctx.strokeStyle = 'rgba(0,0,0,0.5)';
		// ctx.beginPath();
		// ctx.lineTo(50, 102);
		// ctx.lineTo(50 + text.width, 102);
		// ctx.stroke();

		return {
			...file,
			meta: {}
		};
	}));
	const uploaded = await an43(converted);
	logger.info('upload all!');
	return uploaded;
}

function getimgexif(image: string) {
	return new Promise<ExifData>((resolve, reject) => {
		try {
			new ExifImage({ image }, ((error, exifData) => {
				if (error) {
					logger.warn(error);
					reject(error);
				}
				else {
					logger.warn(exifData);
					resolve(exifData);
				}
			}));
		} catch (error) {
			logger.warn(error);
			reject(error);
		}
	});
}

interface IPosition {
	result: {
		formatted_address: string;
		location: {
			lon: number;
			lat: number;
		};
		addressComponent: {
			address: string;
			city: string;
			road: string;
			poi_position: string;
			address_position: string;
			road_distance: number;
			poi: string;
			poi_distance: string;
			address_distance: number;
		};
	};
	msg: 'ok';
	status: '0';
}

/**
 * 使用天地图逆地理编码搜索位置
 * @see <http://lbs.tianditu.gov.cn/server/geocoding.html>
 * @param x 经度
 * @param y 纬度
 */
async function getposition(x: number, y: number) {
	logger.debug('x', x, 'y', y);
	if (!x && !y) {
		return '未知';
	}
	const appid = tianditu.appkey;
	const ret = await fetch(`https://api.tianditu.gov.cn/geocoder?postStr={'lon':${x},'lat':${y},'ver':1}&type=geocode&tk=${appid}`);
	const pos = await ret.json() as IPosition;
	logger.debug('position', pos);
	if (pos.status !== '0') {
		throw new Error(pos.msg);
	}
	return pos.result.formatted_address;
}

function getfield(fields: Fields, fieldname: keyof Fields, default_value: number) {
	const values = fields[fieldname];
	if (values && values.length > 0) {
		return Number(values[0]);
	}
	return default_value;
}

async function getimginfo(image: string, fields: Fields) {
	const x = getfield(fields, 'x', 0);
	const y = getfield(fields, 'y', 0);
	const tm = getfield(fields, 'tm', Date.now());
	try {
		const exif = await getimgexif(image);
		const gpsx = x || exif.gps.GPSAltitude || 0;
		const gpsy = y || exif.gps.GPSAltitude || 0;
		const position = await getposition(gpsx, gpsy);
		const dtimgcreate = new Date(exif.exif.CreateDate || tm);
		const date = dtimgcreate.toLocaleDateString('zh-CN');
		const time = dtimgcreate.toLocaleTimeString('zh-CN');
		return {
			position,
			date,
			time
		};
	} catch (error) {
		logger.warn('无法获取到详细位置', error);
		const position = await getposition(x, y);
		const dtimgcreate = new Date(tm);
		const date = dtimgcreate.toLocaleDateString('zh-CN');
		const time = dtimgcreate.toLocaleTimeString('zh-CN');
		return {
			position,
			date,
			time
		};
	}
}

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;
