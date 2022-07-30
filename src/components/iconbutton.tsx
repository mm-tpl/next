import { MouseEventHandler } from 'react';

export default function IconButton({ img, label, onClick, title }: { img: string; label?: string; onClick?: MouseEventHandler<HTMLSpanElement>; title?: string; }) {
	return <>
		<span className='gpicon' onClick={onClick}>
			{img && <img className='icon' title={title} src={img} />}
			{label && <span>{label}</span>}
		</span>
		<style jsx>{`
.gpicon{
display: flex;
justify-content: flex-start;
flex-direction: row;
align-items: center;
cursor: pointer;
}
.icon{
	width: 1rem;
	height: 1rem;
}
span{
	color: #333333;
	font-size: 13px;
	padding: 0 0 0 0.5rem;
	transition: all 600ms;
}
span:hover{
	color: #1890ff;
}
`}</style>
	</>;
}
