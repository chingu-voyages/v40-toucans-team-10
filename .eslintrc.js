module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'google',
		'airbnb-base',
		'plugin:@wordpress/eslint-plugin/recommended',
	],
	plugins: ['prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		'no-console': 'off',
		'no-plusplus': 'off',
		'no-use-before-define': 'off',
	},
};
