import { ReactNode } from 'react';
import FormItemInput from './item/input';
import FormItemPhoneNo from './item/phoneno';
import FormItemEmail from './item/email';
import FormItemAvatar from './item/avatar';
import FormItemPassword from './item/password';
import FormItemSelect from './item/select';
import FormItemText from './item/text';
import FormItemTextArea from './item/textarea';
import FormItemSex from './item/sex';
import FormItemRadio from './item/radio';

/**
 * 表单项
 */
export default function FormItem({
	children,
	required,
	label,
	labelAlign = 'right'
}: {
	label?: ReactNode;
	labelAlign?: 'left' | 'right' | 'center';
	required?: boolean;
	children: ReactNode;
}) {
	const labelClassName = required ? 'required label' : 'label';
	return <div className='container'>
		{label && <span className={labelClassName}>{label}</span>}
		<span>{children}</span>
		<style jsx>{`
.required::before{
content: '*';
color: #f00;
margin-right: .25rem;
}
.label{
color: #86909C;
font-size: 14px;
white-space:nowrap;
flex-grow: 1;
flex-shrink: 0;
text-align: ${labelAlign};
}
.label::after{
content: ':';
color: #86909C;
padding: 0 .5rem;
}
.container{
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin: 1rem;
}
`}</style>
	</div>;
}

/**
 * 输入框
 */
FormItem.Input = FormItemInput;
/**
 * 手机号
 */
FormItem.PhoneNo = FormItemPhoneNo;
/**
 * 邮箱
 */
FormItem.Email = FormItemEmail;
/**
 * 头像
 */
FormItem.Avatar = FormItemAvatar;
/**
 * 密码框
 */
FormItem.Password = FormItemPassword;
/**
 * 下拉选择框
 */
FormItem.Select = FormItemSelect;
/**
 * 文本框
 */
FormItem.Text = FormItemText;
/**
 * 多行输入框
 */
FormItem.TextArea = FormItemTextArea;
/**
 * 性别选择
 */
FormItem.Sex = FormItemSex;
/**
 * 单选框
 */
FormItem.Radio = FormItemRadio;
