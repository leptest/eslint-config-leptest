import config from './index.js';

export default [
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
	},
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
