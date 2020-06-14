import {
	cacheMiddleware,
	errorMiddleware,
	loggerMiddleware,
	perfMiddleware,
	progressMiddleware,
	RelayNetworkLayer,
	retryMiddleware,
	uploadMiddleware,
	urlMiddleware,
} from 'react-relay-network-modern';
import { Environment, RecordSource, Store } from 'relay-runtime';

const __DEV__ = process.env.NODE_ENV === 'development';

const source = new RecordSource();
const store = new Store(source);

const network = new RelayNetworkLayer([
	cacheMiddleware({
		size: 100, // max 100 requests
		ttl: 15 * 60 * 1000, // 15 minutes
	}),
	urlMiddleware({
		url: () => Promise.resolve(String(process.env.GRAPHQL_API_ENDPOINT)),
	}),
	__DEV__ ? loggerMiddleware() : null,
	__DEV__ ? errorMiddleware() : null,
	__DEV__ ? perfMiddleware() : null,
	retryMiddleware({
		fetchTimeout: 15 * 1000,
		retryDelays: attempt => Math.pow(2, attempt + 4) * 100,
		beforeRetry: ({ abort, attempt }) => {
			if (attempt > 10) {
				abort();
			}
		},
		statusCodes: [500, 503, 504],
	}),
	progressMiddleware({
		onProgress: (current, total) => {
			console.log('Downloaded: ' + current + ' B, total: ' + total + ' B');
		},
	}),
	uploadMiddleware(),
	next => async req => {
		req.fetchOpts.credentials = 'same-origin';

		console.log('RelayRequest', req);
		const res = await next(req);
		console.log('RelayResponse', res);

		return res;
	},
]);

const relayEnvironment = new Environment({ network, store });

export default relayEnvironment;
