import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API || 'http://localhost/graphql';

const client = new ApolloClient({
	link: new HttpLink({
		uri: API_URL,
		fetchOptions: {
			mode: 'cors',
		},
	}),
	cache: new InMemoryCache(),
});

const REACT_API_URL = process.env.REACT_GRAPHQL_API || 'http://localhost/graphql';

export const reactApolloClient = new ApolloClient({
	link: new HttpLink({
		uri: REACT_API_URL,
		fetchOptions: {
			mode: 'cors',
		},
	}),
	cache: new InMemoryCache(),
});

export default client;
