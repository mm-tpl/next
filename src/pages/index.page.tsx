import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import pages from '../atoms/pages';
import Link from '../components/link';

interface IProps {
	pages: string[];
}

/**
 * 01微工厂
 */
const Page: NextPage<IProps> = ({ pages }) => {
	return (
		<>
			<Head>
				<title>01微工厂</title>
			</Head>
			<Pages pages={pages} />
		</>
	);
};

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const all = (() => {
		if (process.env.NODE_ENV === 'development') {
			return Object.keys(pages);
		}
		return [];
	})();
	return {
		props: {
			pages: all
		}
	};
};


export const config: PageConfig = {
	amp: false
};

export default Page;

function Pages({
	pages
}: {
	pages: string[];
}) {
	return <div className='pages'>{pages.map((page) => {
		return <Link key={page} style={{ width: '100%' }} href={page}><span className='page'>{page}</span></Link>;
	})}
		<style jsx>{`
.page:hover{
background-color: #faebd7;
}
.pages{
display: flex;
flex-direction: column;
padding: 2rem;
}
`}</style>
	</div>;
}
