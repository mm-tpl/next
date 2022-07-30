import { Input } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItem from '../item';
import getWidth from './width';

/**
 * 密码框
 */
export default function FormItemPassword({
	value,
	placeholder,
	required,
	label,
	disabled,
	onChange
}: {
	label?: ReactNode;
	required?: boolean;
	value: string;
	placeholder?: string;
	disabled?: boolean;
	onChange?(value: string): void;
}) {
	return <FormItem required={required} label={label}><Input.Password
		allowClear
		disabled={disabled}
		placeholder={placeholder}
		style={{ width: getWidth() }}
		value={value}
		maxLength={20}
		onChange={onChange}
	/>
	</FormItem>;
}
