import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => {
	return import('swagger-ui-react');
}, { ssr: false });

export default function Api({
	doc
}: {
	doc: any;
}) {
	return <>
		<SwaggerUI spec={doc} />
	</>;
}
