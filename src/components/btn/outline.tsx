import { Button as ButtonBase, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';

/**
 * 带外边框的按钮
 */
export default function ButtonOutline({
	title,
	onClick,
}: {
	title?: ReactNode;
	onClick?(): void;
}) {
	const [loading, setloading] = useState(false);
	return <ButtonBase
		loading={loading}
		type='outline'
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
