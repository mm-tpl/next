import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

interface IProps {
}

const pg001: NextPage<IProps> = ({ }) => {
	return (
		<>
			Home
		</>
	)
}

pg001.getInitialProps = async (context) => {
	return {
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	// ...
}

export const getStaticPaths: GetStaticPaths = async () => {
	// ...
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	// ...
}

export default pg001;
