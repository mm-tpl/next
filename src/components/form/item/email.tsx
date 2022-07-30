import { Input } from '@arco-design/web-react';
import FormItem from '../item';
import getWidth from './width';

/**
 * 邮箱
 */
export default function FormItemEmail({
	value,
	required,
	disabled,
	onChange
}: {
	required?: boolean;
	value: string;
	disabled?: boolean;
	onChange(value: string): void;
}) {
	return <FormItem required={required} label='邮箱'><Input
		allowClear
		disabled={disabled}
		placeholder='请输入邮箱'
		style={{ width: getWidth() }}
		value={value}
		maxLength={20}
		onChange={(v) => {
			const temp = /[0-9a-zA-Z@]{1,20}/;
			if (temp.test(v)) {
				onChange(v);
			} else {
				onChange('');
			}
		}}
	/>
	</FormItem>;
}
