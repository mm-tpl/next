import { Button, Message, Modal } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import LabelInfo from '../label/info';

/**
 * 带弹窗按钮
 */
export default function ButtonModal({
	title,
	dlgTitle = '提示',
	children,
	dlgOkText,
	icon,
	dlgCancelText,
	onOK
}: {
	/**
	 * 按钮标题
	 */
	title: ReactNode;
	/**
	 * 按钮左侧图标
	 */
	icon?: string | ReactNode;
	/**
	 * 提示框标题,默认为`提示`
	 */
	dlgTitle?: ReactNode;
	/**
	 * 提示内容
	 */
	children: ReactNode;
	/**
	 * 确定按钮文字
	 */
	dlgOkText?: string;
	/**
	 * 取消按钮文字
	 */
	dlgCancelText?: string;
	/**
	 * 确定事件
	 */
	onOK(): void;
}) {
	const [visible, setvisible] = useState(false);
	const [confirmLoading, setconfirmLoading] = useState(false);
	const elIcon = typeof icon === 'string' ? <img src={icon} /> : icon;
	return <>
		<div className="button" onClick={() => {
			setvisible(true);
		}} >
			<div className='btnLabels'>
				<span className='btnLabel'>{elIcon}</span>
				<span className='btnLabel'>{title}</span>
			</div>
		</div>

		<Modal
			title={<LabelInfo title={dlgTitle} />}
			style={{ top: 0 }}
			alignCenter={false}
			visible={visible}
			confirmLoading={confirmLoading}
			cancelText={dlgCancelText}
			okText={dlgOkText}
			onCancel={() => {
				setvisible(false);
			}}
			onOk={async () => {
				setconfirmLoading(true);
				try {
					await onOK();
					setvisible(false);
				} catch (error) {
					Message.error({
						content: (error as Error).message,
						closable: true
					});
				}
				finally {
					setconfirmLoading(false);
				}
			}}
		>
			<div className='form'>
				{children}
			</div>
		</Modal>
		<style jsx>{`
.btnLabels{
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
}
.btnLabel{
display: flex;
align-items: center;
}
.form{
overflow-x: hidden;
overflow-y: auto;
max-height: 70vh;
}

.button {
padding: 0.5rem;
cursor: pointer;
font:normal 400 14px normal;
color:#3F6FF6;
}
`}</style>
	</>;
}
