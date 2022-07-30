import { ReactNode } from 'react';
import ButtonSave from './btn/save';
import ButtonIcon from './btn/icon';
import ButtonAdd from './btn/add';
import ButtonEdit from './btn/edit';
import ButtonPrompt from './btn/prompt';
import ButtonDrawer from './btn/drawer';
import ButtonText from './btn/text';
import ButtonMenu from './btn/menu';
import ButtonOutline from './btn/outline';

/**
 * 按钮组件
 */
function Button({
	title = '保 存',
	onClick,
}: {
	title?: ReactNode;
	onClick?(): void;
}) {
	return <ButtonSave
		title={title}
		onClick={onClick}
	/>;
}

/**
 * 表格使用的按钮，通常为只有文字显示
 */
Button.Text = ButtonText;

/**
 * 新增按钮
 */
Button.Add = ButtonAdd;

/**
 * 编辑按钮
 */
Button.Edit = ButtonEdit;

/**
 * 带提示按钮
 */
Button.Prompt = ButtonPrompt;

/**
 * 保存按钮
 */
Button.Save = ButtonSave;

/**
 * 带图标按钮
 */
Button.Icon = ButtonIcon;

/**
 * 带有右侧抽屉框的按钮
 */
Button.Drawer = ButtonDrawer;

/**
 * 带下拉菜单的按钮
 */
Button.Menu = ButtonMenu;

/**
 * 带外边框的按钮
 */
Button.Outline = ButtonOutline;

export default Button;
