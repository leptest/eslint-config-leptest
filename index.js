const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const compat = require('eslint-plugin-compat');
const globals = require('globals');

module.exports = [
	js.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	react.configs.flat.recommended,
	react.configs.flat['jsx-runtime'],
	reactHooks.configs.flat['recommended-latest'],
	jsxA11y.flatConfigs.recommended,
	importPlugin.flatConfigs.recommended,
	compat.configs['flat/recommended'],
	{
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...globals.browser,
			},
		},
		settings: {
			react: {
				version: '18',
			},
		},
		rules: {
			semi: [2, 'always'],
			'no-extra-semi': 2,
			'no-tabs': 0,
			'react/jsx-indent': [2, 'tab'],
			'react/jsx-indent-props': [2, 'tab'],
			indent: [2, 'tab',
				{
					SwitchCase: 1
				}
			],
			'brace-style': [
				2,
				'stroustrup',
				{
					allowSingleLine: false
				}
			],
			'react/jsx-filename-extension': [1, { allow: 'as-needed' }],
			'react/prop-types': 0,
			'jsx-a11y/label-has-associated-control': 2,
			'react/jsx-one-expression-per-line': 0,
			'no-console': 2,
			'max-len': [2, {
				code: 120,
				ignoreTrailingComments: true,
				ignoreComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				tabWidth: 1
			}],
			'linebreak-style': [2, 'windows'],
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function'
				}
			],
			'react/jsx-no-useless-fragment': 2,
			'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
			'comma-dangle': [2, 'only-multiline'],
			'space-before-function-paren': [2, 'never'],
			'multiline-ternary': [2, 'never']
		}
	}
];
