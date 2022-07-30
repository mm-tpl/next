import { Input } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItem from '../item';
import getWidth from './width';

/**
 * 输入框
 */
export default function FormItemInput({
	value,
	placeholder,
	maxLength,
	required,
	label,
	disabled,
	onChange
}: {
	label?: ReactNode;
	required?: boolean;
	value: string;
	placeholder?: string;
	maxLength?: number | {
		length: number;
		errorOnly?: boolean;
	};
	disabled?: boolean;
	onChange?(value: string): void;
}) {
	return <FormItem required={required} label={label}><Input
		allowClear
		disabled={disabled}
		placeholder={placeholder}
		style={{ width: getWidth() }}
		value={value}
		maxLength={maxLength}
		onChange={onChange}
	/>
	</FormItem>;
}
