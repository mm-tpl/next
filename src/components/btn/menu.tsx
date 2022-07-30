import { Dropdown, Menu } from '@arco-design/web-react';
import { ReactNode } from 'react';
import Link from '../link';

/**
 * 带下拉菜单的按钮
 */
export default function ButtonMenu({
	title,
	menus
}: {
	// 按钮的样式，设置文字，块样式等
	title: ReactNode;
	// 点击后下拉的内容
	menus: Array<{
		// 下拉后展示的内容
		title: ReactNode;
		// 点击后跳转的目标
		url: string;
	}>;
}) {
	const dropList = <Menu style={{ padding: 0, marginLeft: '45px' }}>
		{menus.map((menu) => {
			return <Menu.Item key={menu.url} style={{ padding: 0 }} ><span>
				<Link href={menu.url} >
					{menu.title}
				</Link>
			</span></Menu.Item>;
		})}
	</Menu >;
	return <Dropdown droplist={dropList} position='bl'>
		{title}
	</Dropdown>;
}
