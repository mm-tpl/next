import { NextPage } from 'next';
import router from 'next/router';
import { useEffect } from 'react';

interface IProps {
}

const pg001: NextPage<IProps> = ({ }) => {
	useEffect(() => {
		router.replace('pg001');
	}, []);
	return (
		<>
		</>
	)
}

export default pg001;
