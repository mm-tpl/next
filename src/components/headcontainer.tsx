import { Button } from '@arco-design/web-react';
import { ReactNode } from 'react';
import Link from './link';

export default function Headcontainer({
	title,
	subtitle,
	imageurl,
	backurl,
	leftlabel,
	name,
	children,
	onSave
}: {
	title: string;
	subtitle: string;
	imageurl: string;
	backurl: string;
	leftlabel: string;
	name: string;
	children: ReactNode;
	onSave(): void;
}) {
	return <>
		<div className='mainbg'>
			<div className='head'>
				<div className='row2'>
					<img src={imageurl} alt="功能图标" style={{ marginRight: 10 }}></img>
					<Link href={backurl}><span className='title'>{title}</span></Link><span className='title'>{subtitle}</span>
				</div>
				<div>
					<Button type='primary' onClick={onSave}>保存</Button>
				</div>
			</div>
			<div className='center'>
				<div className='column'>
					<div className='namehead'>
						<span className='left'>{leftlabel}</span>
						<text className='wbk'>{name}</text>
					</div>
					<div className='row1'>
						<div className='content1'>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
		<style jsx>{`
.mainbg{
display: flex;
flex-direction: column;
height: 100vh;
background-color: #F7F8FA;
}
.row2{
display: flex;
flex-direction: row;
align-items: center;
}
.row1{
display: flex;
flex-direction: row;
}
.content1{
display: flex;
flex-direction: column;
flex-grow: 1;
flex-shrink: 1;
height: auto;
}
.head{
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
flex-grow: 0;
flex-shrink: 0;
height: 2.9375rem;
padding-right: 1.25rem;
margin-bottom: .9375rem;
}
.title{
display:flex;
font-size: 1.125rem;
color: #000;
}
.sea{
margin-right:1.5rem;
}
.sel{
margin-left:1.5rem;
}
.left{
color: #86909C;
font-weight: 290;
font-size: .875rem;
margin-left:2.375rem;
}
.namehead{
display: flex;
flex-direction: row;
align-items: center;
width: 79.0625rem;
height: 4.5rem;
background: #FFFFFF;
border-radius: .0625rem;
margin-bottom:.6875rem;
}
.column{
display: flex;
flex-direction: column;
}
.center{
display: flex;
flex-direction: row;
justify-content: center;
}

.wbk{
radius:.125rem;
color: #86909C;
font-size: .875rem;
background-color: #F2F3F5;
width: 24.0625rem;
height: 2rem;
padding: 0rem .75rem 0rem .75rem;
border-radius: 0.125rem;
margin-left: 0.875rem;
line-height: 2rem;
}
`}</style>
	</>;
}
