# 组件

## 布局组件

1. [布局组件](./layout.tsx)

```tsx
<Layout>
	<Layout.Row>
		...
	</Layout.Row>
	<Layout.Row>
		<Layout.Column>
			...
		</Layout.Column>
		<Layout.Column>
			...
		</Layout.Column>
	</Layout.Row>
</Layout>
```

## 表格组件

1. [表格](./table/table.tsx)
1. [表格按钮](./table/btn.tsx)

```tsx
<Table
	data={[{
		userid:'001',
		name:'张三'
	},{
		userid:'002',
		name:'李四'
	}]}
	keyField='userid'
	loading={loading}
	pagination={{
		total: 100,
		current: 1,
		pageSize: 10,
		onChange(p) {
			// todo 分页变化
		}
	}}
	columns={[{
		title: '用户名',
		key: 'userid',
		dataIndex: 'userid',
		width: '9.6875rem'
	}, {
		title: '姓名',
		key: 'name',
		dataIndex: 'name',
		width: '156px',
		render(val, row) {
			return <span>姓名:{val}</span>;
		}
	}]}
/>
```

## 表单组件

1. [表单-容器](./form.ts)
1. [表单行-容器](./form/row.tsx)
1. [表单列-容器](./form/column.tsx)
1. [表单分组-容器](./form/group.tsx)
1. [表单项-容器](./form/item.tsx)
1. [表单项-输入框-元素](./form/item/input.tsx)
1. [表单项-密码-元素](./form/item/password.tsx)
1. [表单项-手机号-元素](./form/item/phoneno.tsx)
1. [表单项-邮箱-元素](./form/item/email.tsx)
1. [表单项-头像-元素](./form/item/avatar.tsx)
1. [表单项-下拉框-元素](./form/item/select.tsx)
1. [表单项-文本显示-元素](./form/item/text.tsx)
1. [表单项-多行文本-元素](./form/item/textarea.tsx)
1. [表单项-性别选择-元素](./form/item/sex.tsx)
1. [表单项-单选框-元素](./form/item/radio.tsx)

```tsx
<Form>
	<Form.Column>
		<Form.Row>
			<Form.Group>
				<Form.Item.Input />
				<Form.Item.Password />
			</Form.Group>
		</Form.Row>
		<Form.Row>
			<Form.Group>
				<Form.Item>
					<label>01factory</label>
				</Form.Item>
			</Form.Group>
		</Form.Row>
	</Form.Column>
</Form>
```

## 按钮组件

1. [保存](./button.tsx)
1. [保存按钮](./btn/save.tsx)
1. [带提示按钮](./btn/prompt.tsx)
1. [带图标按钮](./btn/icon.tsx)
1. [带有右侧抽屉框的按钮](./btn/drawer.tsx)
1. [带有模态框的按钮](./btn/modal.tsx)
1. [编辑按钮](./btn/edit.tsx)
1. [新增按钮](./btn/add.tsx)
1. [表格使用的按钮，通常为只有文字显示](./btn/text.tsx)
1. [带下拉菜单的按钮](./btn/menu.tsx)
1. [带外边框的按钮](./btn/outline.tsx)

```tsx
<Button title='01factory' />
<Button.Save title='01factory' />
<Button.Prompt>01factory</Button.Prompt>
<Button.Text title='01factory' />
<Button.Add>01factory</Button.Add>
<Button.Edit>01factory</Button.Edit>
<Button.Icon title='01factory' />
<Button.Drawer>01factory</Button.Drawer>
<Button.Menu />
<Button.Outline title='01factory'/>
```
