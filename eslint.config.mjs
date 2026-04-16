import config from './index.js';

export default [
	...config,
	{
		ignores: [
			'**/*.min.js',
			'public/**',
			'node_modules/**',
			'dist/**',
			'artifacts/**',
		],
	},
];
