import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import merge from 'webpack-merge';

import common from './webpack.common';

const config = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		host: '0.0.0.0',
		port: 3000,
		proxy: {
			'/api': 'http://backend:3000',
		},
	},
	plugins: [
		new ForkTSCheckerWebpackPlugin({
			reportFiles: ['!**/__generated__/*'],
		}),
	],
});

export default config;
