module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'compat'],
	extends: [
		'airbnb',
		'airbnb/hooks',
		'eslint:recommended',
		'plugin:@typescript-eslint/strict',
		'plugin:@typescript-eslint/stylistic',
		'standard',
		'plugin:compat/recommended',
	],
	root: true,
	env: {
		browser: true,
	},
	settings: {
		react: {
			version: '18',
		},
	},
	globals: {},
	rules: {
		semi: [2, 'always'],
		'no-extra-semi': 2,
		'no-tabs': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		indent: ['error', 'tab'],

		'react/jsx-filename-extension': [1, { allow: 'as-needed' }],
		'react/prop-types': 0,
		'jsx-a11y/label-has-associated-control': 0,
		'react/jsx-one-expression-per-line': 0,
		'no-console': 0,
		'max-len': 0,
		'linebreak-style': [2, 'windows'],
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],

		'react/jsx-no-useless-fragment': 0,
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'comma-dangle': [1, 'only-multiline'],
	},
};
