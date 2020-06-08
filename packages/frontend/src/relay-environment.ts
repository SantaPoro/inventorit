import { Environment, Network, RecordSource, RequestParameters, Store, Variables } from 'relay-runtime';

function fetchQuery(request: RequestParameters, variables: Variables) {
	return fetch('/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: request.text,
			variables,
		}),
		credentials: 'include',
	}).then(response => {
		return response.json();
	});
}

const environment = new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource()),
});

export default environment;
