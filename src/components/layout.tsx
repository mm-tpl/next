import { ReactNode } from 'react';
import LayoutColumn from './layout/column';
import LayoutRow from './layout/row';

/**
 * 页面容器组件
 */
export default function Layout({
	grow = 0,
	shrink = 0,
	wrap,
	direction,
	justifyContent,
	alignItems,
	children
}: {
	/**
	 * 子元素的增长系数
	 */
	grow?: number;
	/**
	 * 子元素的收缩系数
	 */
	shrink?: number;
	/**
	 * 空间不够时是否换行
	 */
	wrap?: boolean;
	/**
	 * 定义了浏览器之间，如何分配顺着弹性容器主轴 (或者网格行轴) 的元素之间及其周围的空间
	 */
	justifyContent: 'start' | 'end' | 'center' | 'space-between';
	/**
	 * 设置项目在其包含块中在交叉轴方向上的对齐方式。
	 */
	alignItems: 'start' | 'end' | 'center' | 'space-between';
	/**
	 * 主轴方向
	 */
	direction: 'row' | 'column';
	/**
	 * 子元素
	 */
	children: ReactNode;
}) {
	return <div className='layout'>
		{children}
		<style jsx>{`
.layout{
display: flex;
flex-direction: ${direction};
flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
flex-grow: ${grow};
flex-shrink: ${shrink};
justify-content: ${justifyContent};
align-items: ${alignItems};
}
`}</style>
	</div>;
}

/**
 * 列容器
 */
Layout.Column = LayoutColumn;
/**
 * 行容器
 */
Layout.Row = LayoutRow;
