import { ReactNode } from 'react';

/**
 * 行容器
 */
export default function LayoutRow({
	childrenMargin,
	children
}: {
	/**
	 * 子元素的margin值
	 */
	childrenMargin?: string;
	children: ReactNode;
}) {
	return <div className='row'>
		{children}
		<style jsx>{`
.row{
display: flex;
flex-direction: row;
justify-content: flex-start;
flex-wrap: wrap;
}
.row:nth-child(odd),.row:nth-child(even){
margin: ${childrenMargin};
}
`}</style>
	</div>;
}
