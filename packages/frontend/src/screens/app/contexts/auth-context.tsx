import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client';

interface User {
	id: string;
	firstName: string;
	lastName: string;
}

interface AuthContextValue {
	user: User | null;
	isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextValue>({ user: null, isAuthenticated: false });

interface ProfileQueryResult {
	me: User;
}

const PROFILE_QUERY = gql`
	query ProfileQuery {
		me {
			id
			firstName
			lastName
		}
	}
`;

export const AuthProvider: React.FC = ({ children }) => {
	const { data, error, loading } = useQuery<ProfileQueryResult>(PROFILE_QUERY);

	if (loading) {
		return <>Fetching authentication information...</>;
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !error,
				user: data ? data.me : null,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
