import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

interface Props {
}

export default class Document extends NextDocument<Props> {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await NextDocument.getInitialProps(ctx);
		return {
			...initialProps
		};
	}
	render() {
		return (
			<Html>
				<Head>
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
					<link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon-32x32.ico" ></link>
					<link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon-16x16.ico"></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
