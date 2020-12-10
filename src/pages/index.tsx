import { NextPage } from 'next';
// import router from 'next/router';
// import { useEffect } from 'react';

interface IProps {
}

const index: NextPage<IProps> = ({ }) => {
	// useEffect(() => {
	// 	router.replace('pg001');	// not a good idea redirecting at client.
	// }, []);
	return (
		<>
		</>
	)
}

// to make build success, we must not return redirect at this page at getStaticProps
index.getInitialProps = async ({ req, res }) => {
	const url = '/pg001';
	res.statusCode = 302;
	const body = `<p>HTTP Redirect: 302. Redirecting to <a href="${url}">${url}</a></p>`;
	res.setHeader('Content-Length', Buffer.byteLength(body));
	res.setHeader('Location', url);

	if (req.method === 'HEAD') {
		res.end();
	} else {
		res.end(body);
	}
	return {};
}

export default index;
