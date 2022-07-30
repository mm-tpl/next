import { Radio } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItem from '../item';
import getWidth from './width';

/**
 * 性别选择
 */
export default function FormItemSex({
	value,
	required,
	label,
	disabled,
	onChange
}: {
	label?: ReactNode;
	required?: boolean;
	value: 0 | 1 | 2 | number;
	disabled?: boolean;
	onChange?(value: 0 | 1 | 2): void;
}) {
	return <FormItem required={required} label={label}><Radio.Group
		disabled={disabled}
		style={{ width: getWidth() }}
		value={value}
		onChange={onChange}
	>
		<Radio value={0} >未知</Radio>
		<Radio value={1} >男</Radio>
		<Radio value={2} >女</Radio>
	</Radio.Group>
	</FormItem>;
}
