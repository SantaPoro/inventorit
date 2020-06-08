import DotenvWebpack from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /(node_modules)/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' }), new DotenvWebpack()],
};

export default config;
