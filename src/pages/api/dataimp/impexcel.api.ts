import { promises as fs } from 'fs';
import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import an41 from '@mmstudio/an000041';
import { Cell, CellErrorValue, CellFormulaValue, CellHyperlinkValue, CellRichTextValue, Row, ValueType, Workbook, Worksheet } from 'exceljs';
import { Knex } from 'knex';
import an48 from '@mmstudio/an000048';

const logger = anylogger('pages/api/dataimp/impexcel.api');

export type Result = boolean;

/**
 * 解析数据定义Excel并在数据库创建表,同时导入数据
 */
const handler = an48<Result>();

handler.put(async (req, res) => {
	try {
		// 解析文件
		const [file] = await an41(req);
		const wb = new Workbook();
		await wb.xlsx.readFile(file.path);
		await fs.rm(file.path);
		const [settable, setdata] = wb.worksheets.reduce(([table, data], ws) => {
			const name = ws.name.trim().replace(/表$/, '');
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

		const db = an49();
		const tables = Array.from(settable.keys());
		const haserror = await db.transaction<boolean>(async (trs) => {
			const ps = tables.map(async (sheetname) => {
				logger.debug('正在导入表...', sheetname);
				const wstable = settable.get(sheetname);
				const wsdata = setdata.get(sheetname);
				const ret = await importtable(wstable, sheetname, trs);
				if (ret) {
					const { mapfields, tablename } = ret;
					const flag = await importdata(wsdata, tablename, mapfields, sheetname, trs);
					logger.debug('成功导入表', tablename, sheetname);
					return flag;
				}
				logger.error('导入表失败', sheetname);
				return false;
			});
			const results = await Promise.all(ps);
			const haserror = results.some((flag) => {
				return !flag;
			});
			if (haserror) {
				await trs.rollback();
			} else {
				await trs.commit();
			}
			return haserror;
		});

		if (haserror) {
			res.status(500).json(false);
		} else {
			res.status(200).json(true);
		}
	} catch (e) {
		logger.error('Error while importing excel', e);
		res.status(500).json(false);
	}
});

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;

function getcellvaluestr(cell: Cell) {
	const value = cell.value;
	switch (cell.type) {
		case ValueType.Boolean:
		case ValueType.Date:
		case ValueType.Number:
			return value?.toString().trim();
		case ValueType.Error:
			return (value as CellErrorValue).error as string;
		case ValueType.Formula:
			return ((value as CellFormulaValue).result as string).trim();
		case ValueType.Hyperlink:
			return (value as CellHyperlinkValue).text.toString().trim();
		case ValueType.Null:
			return '';
		case ValueType.RichText:
			return (value as CellRichTextValue).richText.map((v) => {
				return v.text.toString();
			}).join('').trim();
		case ValueType.Merge:
		case ValueType.SharedString:
		case ValueType.String:
		default:
			return value?.toString().trim();
	}
}

function getworksheetcelltext(ws: Worksheet, cellname: string) {
	return getcellvaluestr(ws.getCell(cellname));
}

function getrowcelltext(row: Row, columnindex: number) {
	return getcellvaluestr(row.getCell(columnindex));
}

type filedtype = 'smallint' | 'int' | 'interger' | 'long' | 'bigint' | 'float' | 'double' | 'date' | 'datetime' | 'timestamp' | 'text' | 'varchar';

interface IFieldinfo {
	alias: string;
	type: filedtype;
}

type Filedsinfo = Map<string, IFieldinfo>;

async function importtable(ws: Worksheet, sheetname: string, db: Knex.Transaction<unknown, unknown>) {
	const tablename = getworksheetcelltext(ws, 'D1').toLowerCase();
	logger.debug('正在导入表结构...', tablename, sheetname);
	const tablealias = getworksheetcelltext(ws, 'B1');
	logger.debug('正在导入表结构alias...', tablename, tablealias);
	const rowfields = ws.getRow(4);
	const rowfieldsalias = ws.getRow(3);
	const rowfieldstype = ws.getRow(5);
	let idx = 1;	// 跳过第一列
	const mapfields = new Map<string, IFieldinfo>();
	const column_size = ws.actualColumnCount + 10;
	while (++idx <= column_size) {
		const value = getrowcelltext(rowfields, idx);
		if (value) {
			const fieldname = value.toLowerCase();
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
		logger.error('无法获取到表字段,中止导入', tablename, sheetname);
		return null;
	}
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
	logger.debug('成功导入表结构', tablename, sheetname);
	return {
		tablename,
		mapfields
	};
}

async function importdata(ws: Worksheet, tablename: string, fieldsinfo: Filedsinfo, sheetname: string, db: Knex.Transaction<unknown, unknown>) {
	logger.debug('正在导入表数据...', tablename, sheetname);
	if (!ws) {
		logger.error('导入表数据失败:缺数据页', tablename, sheetname);
		return false;
	}
	const rowheader1 = ws.getRow(1);
	const rowheader2 = ws.getRow(2);
	let columnindex = 0;
	const mapfields = new Map<string, number>();
	const column_size = ws.actualColumnCount + 10;
	while (++columnindex <= column_size) {
		const value1 = getrowcelltext(rowheader1, columnindex);
		if (value1) {
			const fieldname = value1.toLowerCase();
			const fieldinfo = fieldsinfo.get(fieldname);
			if (fieldinfo) {
				mapfields.set(fieldname, columnindex);
			}
		}
		const value2 = getrowcelltext(rowheader2, columnindex);
		if (value2) {
			const fieldname = value2.toLowerCase();
			const fieldinfo = fieldsinfo.get(fieldname);
			if (fieldinfo) {
				mapfields.set(fieldname, columnindex);
			}
		}
	}
	const tb = db(tablename);
	const fields = Array.from(mapfields.keys());
	let rowindex = 2;	// skip 2 rows
	const datas = [];
	const now = Date.now();
	const rowsize = ws.actualRowCount + 10;
	while (++rowindex <= rowsize) {
		const row = ws.getRow(rowindex);
		if (row && row.hasValues) {
			const data = fields.reduce((data, field) => {
				const value = getrowcelltext(row, mapfields.get(field));
				const fieldinfo = fieldsinfo.get(field);
				if (fieldinfo.type === 'date'
					|| fieldinfo.type === 'datetime'
					|| fieldinfo.type === 'timestamp') {
					const tm = new Date(value).getTime();
					if (isNaN(tm)) {
						data[field] = now;
					} else {
						data[field] = tm;
					}
				} else if (fieldinfo.type === 'float'
					|| fieldinfo.type === 'double') {
					data[field] = Number(value);
				} else if (fieldinfo.type === 'int'
					|| fieldinfo.type === 'interger'
					|| fieldinfo.type === 'smallint') {
					data[field] = Number(value);
				} else {
					data[field] = value;
				}
				return data;
			}, {} as Record<string, string | number>);
			if (Object.keys(data).length > 0) {
				datas.push(data);
			}
		}
	}
	try {
		if (datas.length > 0) {
			await tb.insert(datas);
		}
		logger.debug('成功导入表数据', tablename, sheetname);
		return true;
	} catch (error) {
		logger.error('失败', tablename, sheetname, datas);
		logger.error(error);
		return false;
	}
}

// function isdata(ws: Worksheet) {
// 	return ws.name.trim().endsWith('-基础数据');
// 	// const a1 = ws.getCell('A1').value;
// 	// return a1.toString().trim() === '表名注释';
// }
