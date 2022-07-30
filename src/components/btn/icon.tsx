import { ReactNode } from 'react';

/**
 * 图标按钮
 */
export default function ButtonIcon(
	{
		title,
		icon,
		onClick
	}: {
		title: ReactNode;
		icon: string;
		onClick(): void
	}) {
	return <>
		<div className='btnv' onClick={onClick}>
			<img className='btnimg' src={icon} />
			<span className='btnadd'>{title}</span>
		</div>
		<style jsx>{`
.btnv{
cursor: pointer;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: #FFFFFF;
margin-left: 1.25rem;
padding: 0.2rem 0.5rem;
border-radius: 0.3125rem;
border: 0.0625rem solid #3F6FF6;
}
.btnimg{
height: 0.875rem;
 width: 0.875rem;
margin-right: 0.5rem;
}
.btnadd{
font-size: 0.875rem;
color: #3F6FF6;
}
`}</style>
	</>;
}
