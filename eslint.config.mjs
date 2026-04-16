import globals from 'globals';
import config from './index.js';

export default [
	{
		files: ['**/*.{js,jsx,ts,tsx,mjs}'],
	},
	...config,
	{
		ignores: [
			'**/*.min.js',
			'public/**',
			'node_modules/**',
			'dist/**',
			'artifacts/**',
			'examples/test.js',
			'examples/test.ts',
		],
	},
	{
		files: ['index.js', 'show-config.js', 'examples/test-rules.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
			'no-console': 'off',
			'import/no-unresolved': 'off',
			'compat/compat': 'off',
		},
	},
	{
		files: ['eslint.config.mjs'],
		rules: {
			'import/extensions': 'off',
		},
	},
];
