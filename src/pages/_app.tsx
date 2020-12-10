import { GeistProvider, CssBaseline } from '@geist-ui/react';
import '../../styles/globals.css';
import { SWRConfig } from 'swr'

export function reportWebVitals(metric) {
	console.log(metric)
}

function App({ Component, pageProps }) {
	return (
		<SWRConfig
			value={{
				// refreshInterval: 10000,
				async fetcher(url: string) {
					const res = await fetch("http://localhost:3000/" + url);
					return await res.json();
				}
			}}
		>
			<GeistProvider>
				<CssBaseline />
				<Component {...pageProps} />
			</GeistProvider>
		</SWRConfig>
	)
}

export default App
