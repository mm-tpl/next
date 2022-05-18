import Head from 'next/head';
import Ring from './components/ring';

/**
 * 系统界面
 */
export default function Sys({
	code,
	title,
	subTitle
}: {
	code: number;
	title: string;
	subTitle: string;
}) {
	return <>
		<Head>
			<title>{code.toString()}</title>
		</Head>
		<div className='body'>
			<div className='code'>{code}</div>
			<div className='title'>{title}</div>
			<div className='subtitle'>{subTitle}</div>
		</div>
		<div className='r1'>
			<Ring
				color='#D0D0D1'
				width='30px'
				size='900px'
				angle={0}
			/>
		</div>
		<div className='r2'>
			<Ring
				color='#D0D0D1'
				width='20px'
				size='200px'
				angle={-60}
			/>
		</div>
		<div className='r2'>
			<Ring
				color='#D0D0D1'
				width='20px'
				size='200px'
				angle={-120}
			/>
		</div>
		<div className='r2'>
			<Ring
				color='#D0D0D1'
				width='20px'
				size='200px'
				angle={-200}
			/>
		</div>
		<div className='banyuan2'></div>
		<style jsx>{`
.body{
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10%;
}
.code{
height: 9.375rem;
font-size: 7.5rem;
color: #2C2C2C;
}
.title{
font-size: 3rem;
color: #2C2C2C;
}
.subtitle{
font-size: 1.5rem;
color: #000000;
}
.r1, .r2{
position: fixed;
}
.r1{
left: ${-(900 + 30 * 2) / 2 - 60}px;
bottom: ${-(900 + 30 * 2) / 2 - 200}px;;
}
.r2{
right: ${-(200 + 20 * 2) / 2}px;
top: 20%;
}
`}</style>
	</>;
}
