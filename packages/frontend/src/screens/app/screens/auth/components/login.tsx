import React from 'react';

import gitHubAuthUri from '../utils/github-auth-uri';
import googleAuthUri from '../utils/google-auth-uri';

const Login = () => {
	return (
		<>
			<ul>
				<li>
					<a href={gitHubAuthUri}>Login with GitHub</a>
				</li>
				<li>
					<a href={googleAuthUri}>Login with Google</a>
				</li>
			</ul>
		</>
	);
};

export default Login;
