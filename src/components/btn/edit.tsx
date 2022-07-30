import { Drawer, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import FormButton from '../table/btn';
import Form from '../form';

/**
 * 编辑按钮
 */
export default function ButtonEdit({
	title = '编 辑',
	dlgTitle = '编 辑',
	children,
	onOK
}: {
	title?: ReactNode;
	dlgTitle?: ReactNode;
	children: ReactNode;
	onOK?(): void;
}) {
	const [visible, setvisible] = useState(false);
	const [buzy, setbuzy] = useState(false);
	return <>
		<FormButton title={title} onClick={() => {
			setvisible(true);
		}} />
		<Drawer
			title={dlgTitle}
			width='36rem'
			closable={false}
			visible={visible}
			onOk={async () => {
				setbuzy(true);
				try {
					onOK && await onOK();
					setvisible(false);
				} catch (error) {
					Message.error({
						content: (error as Error).message,
						closable: true
					});
				}
				finally {
					setbuzy(false);
				}
			}}
			onCancel={() => {
				setvisible(false);
			}}
			confirmLoading={buzy}
		>
			<Form>
				{children}
			</Form>
		</Drawer>
	</>;
}
