import { AppContext, AppInitialProps, NextWebVitalsMetric } from 'next/app';
import { CssBaseline, GeistProvider } from '@geist-ui/react';
import '../../styles/globals.css';
import { SWRConfig } from 'swr';

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.log(metric);
}

function App({ Component, pageProps }: AppInitialProps & AppContext) {
	return (
		<SWRConfig
			value={{
				// refreshInterval: 10000,
				async fetcher(url: string) {
					const res = await fetch(`http://localhost:3000/${url}`);
					return res.json();
				},
			}}
		>
			<GeistProvider>
				<CssBaseline />
				<Component {...pageProps} />
			</GeistProvider>
		</SWRConfig>
	);
}

export default App;
