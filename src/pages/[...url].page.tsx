import { NextPage, PageConfig } from 'next';
import Head from 'next/head';

interface IProps {
}

function C001() {
	return <>
		<div className='d1'><div><h1>404</h1><div className='d2'><h2>This page could not be found</h2></div></div>
		</div>
		<style jsx>{`
			.d1{
				color:#000;
				background:#fff;
				font-family:-apple-system, BlinkMacSystemFont, Roboto, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Avenir, &quot;Helvetica Neue&quot;, &quot;Lucida Grande&quot;, sans-serif;
				height:100vh;
				text-align:center;
				display:flex;
				flex-direction:column;
				align-items:center;
				justify-content:center
			}
			h1{
				display:inline-block;
				border-right:1px solid rgba(0, 0, 0,.3);
				margin:0;
				margin-right:20px;
				padding:10px 23px 10px 0;
				font-size:24px;
				font-weight:500;
				vertical-align:top
			}
			.d2{
				display:inline-block;
				text-align:left;
				line-height:49px;
				height:49px;
				vertical-align:middle
			}
			h2{
				font-size:14px;
				font-weight:normal;
				line-height:inherit;
				margin:0;
				padding:0
			}
		`}</style>
		<style global jsx>{`
		body {margin: 0 }
		`}</style>
	</>;
}

/**
 * 404
 */
const pg000: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>404</title>
			</Head>
			<C001 />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default pg000;
