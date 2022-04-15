import { AppContext, AppInitialProps, NextWebVitalsMetric } from 'next/app';
import '@arco-design/web-react/dist/css/arco.css';
import '../../styles/globals.css';
import anylogger from 'anylogger';

const logger = anylogger('app');

export function reportWebVitals(metric: NextWebVitalsMetric) {
	logger.info(metric);
}

function App({ Component, pageProps }: AppInitialProps & AppContext) {
	return <Component {...pageProps} />;
}

export default App;
