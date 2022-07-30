import { Input } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItem from '../item';
import getWidth from './width';
/**
 * 文本框
 */
export default function FormItemText({
	value,
	required,
	label
}: {
	label?: ReactNode;
	required?: boolean;
	value: string;
}) {
	return <FormItem required={required} label={label}><div className='text'><p>{value}</p></div>
		<style jsx>{`
.text{
font-family: 'Microsoft YaHei UI';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 22px;
color: #3E4D5C;
text-align: left;
}
`}</style>
	</FormItem>;
}
