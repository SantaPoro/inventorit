module.exports = api => {
	api.cache(true);

	return {
		presets: ['@babel/preset-typescript', '@babel/preset-react'],
		plugins: ['relay', '@babel/plugin-proposal-optional-chaining'],
	};
};
