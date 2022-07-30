import { Button as ButtonBase, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';

/**
 * 保存按钮，带禁用效果
 */
export default function ButtonSave({
	title = '保 存',
	onClick,
}: {
	title?: ReactNode;
	onClick?(): void;
}) {
	const [loading, setloading] = useState(false);
	return <ButtonBase
		loading={loading}
		type='primary'
		onClick={async () => {
			setloading(true);
			try {
				await onClick();
			} catch (error) {
				Message.error((error as Error).message);
			} finally {
				setloading(false);
			}
		}}>{title}</ButtonBase>;
}
