import { ReactNode } from 'react';
import FormColumn from './column';
import FormRow from './row';
import FormGroup from './group';
import FormDrawerButton from '../btn/drawer';
import FormItem from './item';
import Layout from '../layout';

/**
 * 表单
 */
export default function Form({
	children
}: {
	children?: ReactNode;
}) {
	return <Layout
		direction='column'
		justifyContent='start'
		alignItems='center'
	>{children}</Layout>;
}

/**
 * 表单的列
 */
Form.Column = FormColumn;
/**
 * 表单的行
 */
Form.Row = FormRow;
/**
 * 表单分组
 */
Form.Group = FormGroup;
/**
 * 表单项
 */
Form.Item = FormItem;
/**
 * 带抽屉按钮
 */
Form.Button = FormDrawerButton;
