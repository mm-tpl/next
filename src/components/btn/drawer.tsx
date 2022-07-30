import { Drawer, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import FormButton from '../table/btn';
import FormColumn from '../form/column';

/**
 * 带有右侧抽屉框的按钮
 */
export default function ButtonDrawer({
	title,
	dlgTitle,
	dlgContent,
	onOK
}: {
	title: ReactNode;
	dlgTitle: ReactNode;
	dlgContent: ReactNode;
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
			<FormColumn>
				{dlgContent}
			</FormColumn>
		</Drawer>
	</>;
}
