// const GAMMA_API_ENDPOINT = 'https://gamma.chalmers.it/api';

// app.get('/auth/callback/gamma', async (req, res) => {
// 	try {
// 		const clientId = String(process.env.GAMMA_CLIENT_ID);
// 		const clientSecret = String(process.env.GAMMA_CLIENT_SECRET);
// 		const authCode = req.query.code;
// 		const basicCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

// 		const redirectUri = String(process.env.GAMMA_REDIRECT_URI);
// 		const tokenResult = await axios.post(
// 			`${GAMMA_API_ENDPOINT}/oauth/token?grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}`,
// 			null,
// 			{
// 				headers: {
// 					Authorization: `Basic ${basicCredentials}`,
// 				},
// 			},
// 		);
// 		const userResult = await axios.get(`${GAMMA_API_ENDPOINT}/users/me`, {
// 			headers: {
// 				Authorization: `Bearer ${tokenResult.data['access_token']}`,
// 			},
// 		});
// 		const userRepository = getRepository(User);
// 		let user = await userRepository.findOne({
// 			where: {
// 				gammaId: userResult.data.id,
// 			},
// 		});
// 		if (!user) {
// 			user = await userRepository.save({
// 				firstName: userResult.data.firstName,
// 				gammaId: userResult.data.id,
// 				lastName: userResult.data.lastName,
// 			});
// 		}
// 		if (req.session) {
// 			req.session.auth = {
// 				userId: user.id,
// 				accessToken: tokenResult.data['access_token'],
// 			};
// 		}
// 		res.redirect('/');
// 	} catch (e) {
// 		res.redirect('/error');
// 	}
// });
