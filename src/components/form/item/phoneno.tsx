import { Input } from '@arco-design/web-react';
import FormItem from '../item';
import getWidth from './width';

/**
 * 手机号
 */
export default function FormItemPhoneNo({
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
	return <FormItem required={required} label='手机号'><Input
		allowClear
		disabled={disabled}
		placeholder='请输入手机号'
		style={{ width: getWidth() }}
		value={value}
		maxLength={11}
		onChange={(v) => {
			if (v) {
				const temp = parseInt(v);
				// todo 这里的逻辑可能有问题
				if (temp && temp > 0 && temp < 19999999999) {
					onChange(v.toString());
				}
			} else {
				onChange('');
			}
		}}
	/>
	</FormItem>;
}
