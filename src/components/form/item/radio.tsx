import { Radio } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItem from '../item';
import getWidth from './width';

/**
 * 单选框
 */
export default function FormItemRadio<T>({
	value,
	required,
	label,
	options,
	disabled,
	onChange
}: {
	label?: ReactNode;
	required?: boolean;
	value: T;
	options: Array<{
		label: string;
		value: T;
	}>;
	disabled?: boolean;
	onChange?(value: T): void;
}) {
	return <FormItem required={required} label={label}><Radio.Group
		disabled={disabled}
		style={{ width: getWidth() }}
		value={value}
		onChange={onChange}
	>
		{options.map((option) => {
			return <Radio key={JSON.stringify(option.value)} value={option.value} >{option.label}</Radio>;
		})}
	</Radio.Group>
	</FormItem>;
}
