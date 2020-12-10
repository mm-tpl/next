import { NextPage, GetStaticProps } from 'next';
import useSWR, { mutate } from 'swr'

interface IProps {
	name: string;
}

const pg001: NextPage<IProps> = (context) => {
	const { data } = useSWR<{ time: string; }>('api/s001');
	// const { data } = useSWR<{ time: string; }>('api/s001', { refreshInterval: 3000 });
	function update() {
		mutate('api/s001');
	}
	return (
		<>
			<div>
				Hello {context.name} !
			</div>
			<br />
			<input type="button" value="update" onClick={update} />
			<br />
			<div>
				系统已启动: {data?.time}
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
	return {
		props: {
			name: 'mmstudio'
		}
	}
}

export default pg001;
