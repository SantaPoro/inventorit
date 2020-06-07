module.exports = {
	src: './src',
	schema: '../backend/src/__generated__/schema.gql',
	exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
	extensions: ['ts', 'tsx'],
	language: 'typescript',
};
