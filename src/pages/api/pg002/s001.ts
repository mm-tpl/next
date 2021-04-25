import { promises as fs } from 'fs';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import an41 from '@mmstudio/an000041';
import { Row, Workbook, Worksheet } from 'exceljs';

const logger = anylogger('pages/api/pg002/s001');

export type Result = boolean;

/**
 * 解析数据定义Excel并在数据库创建表,同时导入数据
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	// 解析文件
	const [file] = await an41(req);
	const wb = new Workbook();
	await wb.xlsx.readFile(file.path);
	await fs.rm(file.path);
	const [settable, setdata] = wb.worksheets.reduce(([table, data], ws) => {
		const name = ws.name.trim();
		logger.debug('worksheet name:', ws.name);
		const arr = /(.*)-基础数据/.exec(name);
		if (arr) {
			const tablename = arr[1];
			data.set(tablename, ws);
		} else {
			table.set(name, ws);
		}
		return [table, data];
	}, [new Map<string, Worksheet>(), new Map<string, Worksheet>()]);

	if (settable.size === 0) {
		res.status(500).statusMessage = decodeURIComponent('无法获取表结构');
		res.end();
		return;
	}

	if (setdata.size === 0) {
		res.status(500).statusMessage = decodeURIComponent('无法获取表数据');
		res.end();
		return;
	}

	const tables = Array.from(settable.keys());
	const ps = tables.map(async (tablename) => {
		logger.debug('正在导入表...', tablename);
		const wstable = settable.get(tablename);
		const wsdata = setdata.get(tablename);
		const ret = await importtable(wstable);
		if (ret) {
			const { mapfields, tablename } = ret;
			const flag = await importdata(wsdata, tablename, mapfields);
			logger.debug('成功导入表', tablename);
			return flag;
		}
		logger.error('导入表失败', tablename);
		return false;
	});
	const results = await Promise.all(ps);

	const haserror = results.some((flag) => {
		return !flag;
	});
	if (haserror) {
		res.status(500).json(false);
	} else {
		res.status(200).json(true);
	}
});

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;

function getworksheetcelltext(ws: Worksheet, cellname: string) {
	return ws.getCell(cellname).value?.toString().trim();
}

function getrowcelltext(row: Row, columnindex: number) {
	return row.getCell(columnindex).value?.toString().trim();
}

type filedtype = 'smallint' | 'int' | 'interger' | 'long' | 'bigint' | 'float' | 'double' | 'date' | 'datetime' | 'timestamp' | 'text' | 'varchar';

interface IFieldinfo {
	alias: string;
	type: filedtype;
}

type Filedsinfo = Map<string, IFieldinfo>;

async function importtable(ws: Worksheet) {
	const tablename = getworksheetcelltext(ws, 'D1').toLowerCase();
	logger.debug('正在导入表结构...', tablename);
	const tablealias = getworksheetcelltext(ws, 'B1');
	logger.debug('正在导入表结构alias...', tablealias);
	const rowfields = ws.getRow(4);
	const rowfieldsalias = ws.getRow(3);
	const rowfieldstype = ws.getRow(5);
	let idx = 1;	// 跳过第一列
	const mapfields = new Map<string, IFieldinfo>();
	while (++idx <= ws.columnCount) {
		const value = getrowcelltext(rowfields, idx);
		if (value) {
			const fieldname = value.toLowerCase();
			logger.debug('字段名', fieldname);
			const alias = getrowcelltext(rowfieldsalias, idx);
			const type = getrowcelltext(rowfieldstype, idx) as filedtype;
			mapfields.set(fieldname, {
				alias,
				type
			});
		}
	}
	const fields = Array.from(mapfields.keys());
	if (fields.length === 0) {
		logger.error('无法获取到表字段,中止导入', tablename);
		return null;
	}
	const db = an49();
	// db.schema.hasTable(tablename);
	await db.schema.dropTableIfExists(tablename);
	await db.schema.createTable(tablename, (builder) => {
		builder.comment(tablealias);
		fields.forEach((field) => {
			const { alias, type } = mapfields.get(field);
			switch (type) {
				case 'int':
				case 'interger':
					builder.integer(field).comment(alias);
					break;
				case 'long':
				case 'bigint':
					builder.bigInteger(field).comment(alias);
					break;
				case 'float':
					builder.float(field).comment(alias);
					break;
				case 'double':
					builder.double(field).comment(alias);
					break;
				case 'date':
				case 'datetime':
				case 'timestamp':
					builder.bigInteger(field).comment(alias);
					break;
				case 'smallint':
					builder.integer(field).comment(alias);	// todo
					break;
				case 'text':
				case 'varchar':
				default:
					builder.text(field).comment(alias);
					break;
			}
		});
	});
	logger.debug('成功导入表结构', tablename);
	return {
		tablename,
		mapfields
	};
}

async function importdata(ws: Worksheet, tablename: string, fieldsinfo: Filedsinfo) {
	logger.debug('正在导入表数据...', tablename);
	if (!ws) {
		logger.error('导入表数据失败:缺数据页', tablename);
		return false;
	}
	const rowheader = ws.getRow(1);
	let columnindex = 0;
	const mapfields = new Map<string, number>();
	while (++columnindex <= ws.columnCount) {
		const value = getrowcelltext(rowheader, columnindex);
		if (value) {
			const fieldname = value.toLowerCase();
			const fieldinfo = fieldsinfo.get(fieldname);
			if (fieldinfo) {
				mapfields.set(fieldname, columnindex);
			}
		}
	}
	const db = an49();
	const tb = db(tablename);
	const fields = Array.from(mapfields.keys());
	let rowindex = 2;	// skip 2 rows
	const datas = [];
	while (++rowindex <= ws.rowCount) {
		const row = ws.getRow(rowindex);
		if (row && row.hasValues) {
			const data = fields.reduce((data, field) => {
				const value = getrowcelltext(row, mapfields.get(field));
				const fieldinfo = fieldsinfo.get(field);
				if (fieldinfo.type === 'date'
					|| fieldinfo.type === 'datetime'
					|| fieldinfo.type === 'timestamp') {
					data[field] = new Date(value).getTime();
				} else {
					data[field] = value;
				}
				return data;
			}, {} as Record<string, string | number>);
			datas.push(data);
		}
	}
	try {
		await tb.insert(datas);
		logger.debug('成功导入表数据', tablename);
		return true;
	} catch (error) {
		logger.error('失败', tablename, datas);
		logger.error(error);
		return false;
	}
}

// function isdata(ws: Worksheet) {
// 	return ws.name.trim().endsWith('-基础数据');
// 	// const a1 = ws.getCell('A1').value;
// 	// return a1.toString().trim() === '表名注释';
// }