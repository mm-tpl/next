import { Button } from '@arco-design/web-react';
import { ReactNode } from 'react';

/**
 * 表格使用的按钮，通常为只有文字显示
 */
export default function ButtonText(
	{
		title,
		onClick,
	}: {
		title: ReactNode;
		onClick?(): void;
	}) {
	return <>
		<div className="button" onClick={onClick}> {title}</div>
		<style jsx>{`
.button {
padding: 0.5rem;
cursor: pointer;
font:normal 400 14px normal;
color:#3F6FF6;
}
		`}</style>
	</>;

}
