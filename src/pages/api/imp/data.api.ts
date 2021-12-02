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

/**
 * @openapi
 * /api/imp/data:
 *   put:
 *     summary: Excel数据导入
 *     description: 将Excel数据导入数据库，生成数据库表结构
 *     tags:
 *       - 01factory
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: true上传成功
 *       500:
 *         description: false上传失败
 *     requestBody:
 *       description: 要上传的文件
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 */
handler.put(async (req, res) => {
	try {
		if (process.env.NODE_ENV === 'production') {
			logger.error('Someone is trying to hack us.');
			res.status(500).json(false);
			return;
		}
		// 解析文件
		const [file] = await an41(req);
		const wb = new Workbook();
		await wb.xlsx.readFile(file.path);
		await fs.rm(file.path);

		if (wb.worksheets.length === 0) {
			res.status(500).statusMessage = decodeURIComponent('无法获取表数据');
			res.end();
			return;
		}

		const db = an49();
		const haserror = await db.transaction<boolean>(async (trs) => {
			const ps = wb.worksheets.map(async (ws) => {
				const sheetname = ws.name.trim();
				logger.debug('正在导入表...', sheetname);
				const ret = await importtable(ws, sheetname, trs);
				if (ret) {
					const { mapfields, tablename } = ret;
					const flag = await importdata(ws, tablename, mapfields, sheetname, trs);
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
	const tablename = getworksheetcelltext(ws, 'B1').toLowerCase();
	logger.debug('正在导入表结构...', tablename, sheetname);
	const tablealias = sheetname;
	logger.debug('正在导入表结构alias...', tablename, tablealias);
	const rowfields = ws.getRow(3);
	const rowfieldsalias = ws.getRow(2);
	const rowfieldstype = ws.getRow(4);
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
	const rowheader = ws.getRow(3);
	let columnindex = 0;
	const mapfields = new Map<string, number>();
	const column_size = ws.actualColumnCount + 10;
	while (++columnindex <= column_size) {
		const value1 = getrowcelltext(rowheader, columnindex);
		if (value1) {
			const fieldname = value1.toLowerCase();
			const fieldinfo = fieldsinfo.get(fieldname);
			if (fieldinfo) {
				mapfields.set(fieldname, columnindex);
			}
		}
	}
	const tb = db(tablename);
	const fields = Array.from(mapfields.keys());
	let rowindex = 4;	// skip 4 rows
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
