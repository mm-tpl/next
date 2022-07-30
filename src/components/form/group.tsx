import { ReactNode } from 'react';
import FormColumn from './column';

/**
 * 表单的分组容器
 */
export default function FormGroup({
	title,
	icon,
	children
}: {
	title: ReactNode;
	children: ReactNode;
	icon?: string | ReactNode;
}) {
	const elIcon = typeof icon === 'string' ? <img src={icon} /> : icon;
	return <>
		<FormColumn childrenMargin='0'>
			<div className='groupTitle'>
				<div className='label'>{title}</div>
				{elIcon}
			</div>
			<FormColumn>
				{children}
			</FormColumn>
		</FormColumn>
		<style jsx>{`
			.groupTitle{
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
}
.label::before{
content: ' ';
color: #f00;
display: inline-block;
width: 7px;
height: 18px;
background: #165DFF;
margin-right: 0.5rem;
}
.label{
margin: 0 0.5rem;
font-size: 1rem;
font-weight: bold;
color: #1D2129;
}
`}</style>
	</>;
}
