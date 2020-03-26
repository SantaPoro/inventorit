module.exports = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/naming-convention': 'error',
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
		'sort-imports': [
			'error',
			{
				ignoreCase: true,
				ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			},
		],
	},
};
