import { Drawer, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import res from '../../atoms/res';
import Btnicon from './icon';
import FormColumn from '../form/column';

/**
 * 新增按钮
 */
export default function ButtonAdd({
	title = '新 增',
	dlgTitle,
	children,
	onOK
}: {
	title?: ReactNode;
	dlgTitle: ReactNode;
	children: ReactNode;
	onOK?(): void;
}) {
	const [visible, setvisible] = useState(false);
	const [buzy, setbuzy] = useState(false);
	return <>
		<Btnicon title={title} icon={res['/images/add.png']} onClick={() => {
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
			<FormColumn>
				{children}
			</FormColumn>
		</Drawer>
	</>;
}
