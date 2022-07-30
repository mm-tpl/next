import { Select, SelectProps } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItem from '../item';
import getWidth from './width';

/**
 * 下拉选择框
 */
export default function FormItemSelect({
	label,
	required,
	...rest
}: SelectProps & {
	label?: ReactNode;
	required?: boolean;
}) {
	return <FormItem required={required} label={label}><Select
		allowClear
		style={{ width: getWidth() }}
		{...rest}
	/>
	</FormItem>;
}

FormItemSelect.Option = Select.Option;
FormItemSelect.OptGroup = Select.OptGroup;
