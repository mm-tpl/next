
import Link from '../../components/link';
import res from '../../atoms/res';

/**
 * 下载组件
 */
export default function DownloadTemplate() {
	return <>
		<Link href={res['/tpl/dbtemplate.xlsx']}>
			<h1>下载模板</h1>
		</Link>
		<style jsx>{`
a{
color: red;
text-decoration: underline;
}
`}</style>
	</>;
}
