import { GeistProvider, CssBaseline } from '@geist-ui/react';
import '../../styles/globals.css';

export function reportWebVitals(metric) {
	console.log(metric)
}

function App({ Component, pageProps }) {
	return (
		<GeistProvider>
			<CssBaseline />
			<Component {...pageProps} />
		</GeistProvider>
	)
}

export default App
