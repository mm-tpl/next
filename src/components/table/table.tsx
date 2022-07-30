import { Table as BaseTable, TableProps } from '@arco-design/web-react';
import TableButton from './btn';

/**
 * 表格
 */
export default function Table<T>(props: TableProps<T> & {
	keyField: keyof T;
}) {
	return <>
		<div className="table">
			<BaseTable
				rowKey={(row) => {
					return row[props.keyField] as unknown as string;
				}}
				border
				borderCell
				stripe
				{...props}
				onChange={(pagination, sorter, filters, extra) => {
					props.onChange && props.onChange(pagination, sorter, filters, extra);
					if (typeof props.pagination === 'object') {
						props.pagination.onChange(pagination.current, pagination.pageSize);
					}
				}}
			/>
		</div>
		<style jsx>{`
.table {
background-color: #FFF;
padding: 0 1.25rem;
}
		`}</style>
	</>;
}

/**
 * 表单按钮
 */
Table.Button = TableButton;
