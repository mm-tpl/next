import { ReactNode } from 'react';

/**
 * 列容器
 */
export default function LayoutColumn({
	childrenMargin = '1rem',
	children
}: {
	/**
	 * 子元素的margin值
	 */
	childrenMargin?: string;
	children: ReactNode;
}) {
	return <div className='column'>
		{children}
		<style jsx>{`
.column{
display: flex;
flex-direction: column;
justify-content: flex-start;
flex-wrap: wrap;
}
.column:nth-child(odd),.column:nth-child(even){
margin: ${childrenMargin};
}
`}</style>
	</div>;
}
