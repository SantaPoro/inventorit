import React, { useCallback, useContext, useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';

import { GitHubLoginMutation, GitHubLoginMutationVariables } from './__generated__/GitHubLoginMutation';
import { GoogleLoginMutation, GoogleLoginMutationVariables } from './__generated__/GoogleLoginMutation';
import { LogoutMutation } from './__generated__/LogoutMutation';
import { ProfileQuery } from './__generated__/ProfileQuery';

interface User {
	id: string;
	name: string;
}

interface AuthContextValue {
	user: User | null;
	isAuthenticated: boolean;
	loginGitHub: (code: string) => Promise<void>;
	loginGoogle: (code: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue>({
	user: null,
	isAuthenticated: false,
	loginGitHub: () => {
		throw new Error('Not implemented');
	},
	loginGoogle: () => {
		throw new Error('Not implemented');
	},
	logout: () => {
		throw new Error('Not implemented');
	},
});

const GITHUB_LOGIN_MUTATION = gql`
	mutation GitHubLoginMutation($input: LoginGitHubInput!) {
		loginGitHub(input: $input) {
			success
		}
	}
`;

const GOOGLE_LOGIN_MUTATION = gql`
	mutation GoogleLoginMutation($input: LoginGoogleInput!) {
		loginGoogle(input: $input) {
			success
		}
	}
`;

const LOGOUT_MUTATION = gql`
	mutation LogoutMutation {
		logout {
			success
		}
	}
`;

const PROFILE_QUERY = gql`
	query ProfileQuery {
		me {
			id
			name
		}
	}
`;

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [initialised, setInitialised] = useState(false);
	const { data, loading, refetch } = useQuery<ProfileQuery>(PROFILE_QUERY);

	const [_loginGitHub] = useMutation<GitHubLoginMutation, GitHubLoginMutationVariables>(GITHUB_LOGIN_MUTATION);

	const [_loginGoogle] = useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GOOGLE_LOGIN_MUTATION);

	const [_logout] = useMutation<LogoutMutation>(LOGOUT_MUTATION);

	const loginGitHub = useCallback(
		(code: string) => {
			return _loginGitHub({ variables: { input: { code } } })
				.then(({ data }) => {
					if (!data?.loginGitHub.success) {
						throw new Error('Unsuccessful login attempt');
					}

					return refetch();
				})
				.then(({ data }) => {
					if (data) {
						setIsAuthenticated(true);
						setUser(data.me);
					}
				});
		},
		[_loginGitHub, refetch],
	);

	const loginGoogle = useCallback(
		(code: string) => {
			return _loginGoogle({ variables: { input: { code } } })
				.then(({ data }) => {
					if (!data?.loginGoogle.success) {
						throw new Error('Unsuccessful login attempt');
					}

					return refetch();
				})
				.then(({ data }) => {
					if (data) {
						setIsAuthenticated(true);
						setUser(data.me);
					}
				});
		},
		[_loginGoogle, refetch],
	);

	const logout = useCallback(() => {
		return _logout().then(({ data }) => {
			if (data?.logout.success) {
				setIsAuthenticated(false);
				setUser(null);
			}
		});
	}, [_logout]);

	if (loading && !initialised) {
		return <>Getting authentication...</>;
	}

	if (!loading && !initialised) {
		setInitialised(true);

		if (data) {
			setUser(data.me);
			setIsAuthenticated(true);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				loginGitHub,
				loginGoogle,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
