import { ReactNode } from 'react';
import res from '../../atoms/res';

/**
 * 居中的提示信息
 */
export default function LabelInfo({
	title
}: {
	title: ReactNode;
}) {
	return <>
		<div className='v'>
			<span className='t'>{title}</span>
			<style jsx>{`
.v{
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}
.t{
color: #000000;
font-family: 'Microsoft YaHei';
font-weight: 700;
font-size: 16px;
line-height: 24px;
}
			`}</style>
		</div>
	</>;
}
