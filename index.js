const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const stylistic = require('@stylistic/eslint-plugin');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const compat = require('eslint-plugin-compat');
const n = require('eslint-plugin-n');
const promise = require('eslint-plugin-promise');
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
		plugins: {
			'@stylistic': stylistic,
			n,
			promise,
		},
		languageOptions: {
			parser: tseslint.parser,
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: '18',
			},
			'import/resolver': {
				node: {
					extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
				},
			},
			'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
		},
		rules: {
			// ============================================
			// Best Practices (from airbnb + standard)
			// ============================================
			'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
			'array-callback-return': ['error', { allowImplicit: true }],
			'block-scoped-var': 'error',
			'consistent-return': 'error',
			curly: ['error', 'multi-line'],
			'default-case': ['error', { commentPattern: '^no default$' }],
			'default-case-last': 'error',
			'no-object-constructor': 'error',
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			'grouped-accessor-pairs': 'error',
			'guard-for-in': 'error',
			'max-classes-per-file': ['error', 1],
			'no-alert': 'warn',
			'no-caller': 'error',
			'no-constructor-return': 'error',
			'no-else-return': ['error', { allowElseIf: false }],
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-label': 'error',
			'no-implied-eval': 'error',
			'no-iterator': 'error',
			'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
			'no-lone-blocks': 'error',
			'no-multi-str': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-wrappers': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': ['error', {
				props: true,
				ignorePropertyModificationsFor: [
					'acc', 'accumulator', 'e', 'ctx', 'context',
					'req', 'request', 'res', 'response', '$scope', 'staticContext'
				]
			}],
			'no-proto': 'error',
			'no-restricted-properties': ['error',
				{ object: 'arguments', property: 'callee', message: 'arguments.callee is deprecated' },
				{ object: 'global', property: 'isFinite', message: 'Please use Number.isFinite instead' },
				{ object: 'self', property: 'isFinite', message: 'Please use Number.isFinite instead' },
				{ object: 'window', property: 'isFinite', message: 'Please use Number.isFinite instead' },
				{ object: 'global', property: 'isNaN', message: 'Please use Number.isNaN instead' },
				{ object: 'self', property: 'isNaN', message: 'Please use Number.isNaN instead' },
				{ object: 'window', property: 'isNaN', message: 'Please use Number.isNaN instead' },
				{ property: '__defineGetter__', message: 'Please use Object.defineProperty instead.' },
				{ property: '__defineSetter__', message: 'Please use Object.defineProperty instead.' },
				{ object: 'Math', property: 'pow', message: 'Use the exponentiation operator (**) instead.' }
			],
			'no-return-assign': ['error', 'except-parens'],
			'no-script-url': 'error',
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-throw-literal': 'error',
			'no-template-curly-in-string': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-useless-call': 'error',
			'no-useless-concat': 'error',
			'no-useless-return': 'error',
			'no-void': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
			radix: 'error',
			yoda: ['error', 'never'],

			// ============================================
			// ES6+ (from airbnb + standard)
			// ============================================
			'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
			'no-restricted-exports': ['error', { restrictedNamedExports: ['default', 'then'] }],
			'no-useless-computed-key': 'error',
			'no-useless-rename': 'error',
			'object-shorthand': ['warn', 'properties'],
			'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
			'prefer-destructuring': ['error', {
				VariableDeclarator: { array: false, object: true },
				AssignmentExpression: { array: true, object: false }
			}, { enforceForRenamedProperties: false }],
			'prefer-numeric-literals': 'error',
			'prefer-template': 'error',
			'symbol-description': 'error',

			// ============================================
			// Variables (from airbnb + standard)
			// ============================================
			'no-label-var': 'error',
			'no-restricted-globals': ['error',
				{ name: 'isFinite', message: 'Use Number.isFinite instead' },
				{ name: 'isNaN', message: 'Use Number.isNaN instead' },
				'addEventListener', 'blur', 'close', 'closed', 'confirm',
				'defaultStatus', 'defaultstatus', 'event', 'external', 'find',
				'focus', 'frameElement', 'frames', 'history', 'innerHeight',
				'innerWidth', 'length', 'location', 'locationbar', 'menubar',
				'moveBy', 'moveTo', 'name', 'onblur', 'onerror', 'onfocus',
				'onload', 'onresize', 'onunload', 'open', 'opener', 'opera',
				'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset',
				'parent', 'print', 'removeEventListener', 'resizeBy', 'resizeTo',
				'screen', 'screenLeft', 'screenTop', 'screenX', 'screenY',
				'scroll', 'scrollbars', 'scrollBy', 'scrollTo', 'scrollX',
				'scrollY', 'self', 'status', 'statusbar', 'stop', 'toolbar', 'top'
			],
			'no-undef-init': 'error',
			'one-var': ['error', { initialized: 'never' }],

			// TypeScript-aware replacements for base rules
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'error',
			'no-use-before-define': 'off',
			'@typescript-eslint/no-use-before-define': ['error', {
				functions: false, classes: false, variables: false
			}],
			'default-param-last': 'off',
			'@typescript-eslint/default-param-last': 'error',
			'no-loop-func': 'off',
			'@typescript-eslint/no-loop-func': 'error',
			'no-redeclare': 'off',
			'@typescript-eslint/no-redeclare': 'error',
			'no-dupe-class-members': 'off',
			'@typescript-eslint/no-dupe-class-members': 'error',

			// ============================================
			// TypeScript naming convention (from airbnb-typescript)
			// ============================================
			'@typescript-eslint/naming-convention': ['error',
				{ selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
				{ selector: 'function', format: ['camelCase', 'PascalCase'] },
				{ selector: 'typeLike', format: ['PascalCase'] }
			],

			// ============================================
			// Style (non-deprecated, from airbnb + standard)
			// ============================================
			camelcase: ['error', { allow: ['^UNSAFE_'], properties: 'never', ignoreGlobals: true }],
			'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
			'no-bitwise': 'error',
			'no-lonely-if': 'error',
			'no-multi-assign': 'error',
			'no-nested-ternary': 'error',
			'no-unneeded-ternary': ['error', { defaultAssignment: false }],
			'operator-assignment': ['error', 'always'],
			'prefer-exponentiation-operator': 'error',
			'prefer-object-spread': 'error',
			'no-restricted-syntax': ['error',
				{
					selector: 'ForInStatement',
					message: 'for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries} instead.'
				},
				{
					selector: 'LabeledStatement',
					message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain.'
				},
				{
					selector: 'WithStatement',
					message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
				}
			],

			// ============================================
			// Import rules (from airbnb + standard)
			// Override recommended preset warn→error
			// ============================================
			'import/no-duplicates': 'error',
			'import/no-named-as-default': 'error',
			'import/no-named-as-default-member': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-amd': 'error',
			'import/no-absolute-path': 'error',
			'import/no-cycle': 'error',
			'import/no-mutable-exports': 'error',
			'import/no-self-import': 'error',
			'import/no-useless-path-segments': ['error', { commonjs: true }],
			'import/no-webpack-loader-syntax': 'error',
			'import/no-named-default': 'error',
			'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
			'import/extensions': ['error', 'ignorePackages', {
				js: 'never', mjs: 'never', jsx: 'never', ts: 'never', tsx: 'never'
			}],

			// ============================================
			// React hooks (override recommended preset warn→error)
			// ============================================
			'react-hooks/exhaustive-deps': 'error',

			// ============================================
			// React rules (from airbnb, beyond recommended)
			// ============================================
			'react/jsx-boolean-value': ['error', 'never', { always: [] }],
			'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
			'react/jsx-closing-tag-location': 'error',
			'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
			'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
			'react/jsx-no-bind': ['error', {
				ignoreRefs: true,
				allowArrowFunctions: true,
				allowFunctions: false,
				allowBind: false,
				ignoreDOMComponents: true
			}],
			'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],
			'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
			'react/jsx-fragments': ['error', 'syntax'],
			'react/jsx-no-constructed-context-values': 'error',
			'react/jsx-no-script-url': 'error',
			'react/jsx-tag-spacing': ['error', {
				closingSlash: 'never',
				beforeSelfClosing: 'always',
				afterOpening: 'never',
				beforeClosing: 'never'
			}],
			'react/no-did-update-set-state': 'error',
			'react/no-will-update-set-state': 'error',
			'react/no-array-index-key': 'error',
			'react/no-unused-prop-types': 'error',
			'react/no-unused-state': 'error',
			'react/no-access-state-in-setstate': 'error',
			'react/no-this-in-sfc': 'error',
			'react/no-typos': 'error',
			'react/no-unstable-nested-components': 'error',
			'react/no-invalid-html-attribute': 'error',
			'react/self-closing-comp': 'error',
			'react/style-prop-object': 'error',
			'react/void-dom-elements-no-children': 'error',
			'react/button-has-type': ['error', { button: true, submit: true, reset: false }],
			'react/destructuring-assignment': ['error', 'always'],
			'react/sort-comp': ['error', {
				order: [
					'static-variables', 'static-methods', 'instance-variables',
					'lifecycle', '/^handle.+$/', '/^on.+$/',
					'getters', 'setters',
					'/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
					'instance-methods', 'everything-else', 'rendering'
				],
				groups: {
					lifecycle: [
						'displayName', 'propTypes', 'contextTypes', 'childContextTypes',
						'mixins', 'statics', 'defaultProps', 'constructor', 'getDefaultProps',
						'getInitialState', 'state', 'getChildContext', 'getDerivedStateFromProps',
						'componentWillMount', 'UNSAFE_componentWillMount', 'componentDidMount',
						'componentWillReceiveProps', 'UNSAFE_componentWillReceiveProps',
						'shouldComponentUpdate', 'componentWillUpdate', 'UNSAFE_componentWillUpdate',
						'getSnapshotBeforeUpdate', 'componentDidUpdate', 'componentDidCatch',
						'componentWillUnmount'
					],
					rendering: ['/^render.+$/', 'render']
				}
			}],
			'react/prefer-es6-class': ['error', 'always'],
			'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],

			// ============================================
			// N plugin rules (from standard)
			// ============================================
			'n/handle-callback-err': ['error', '^(err|error)$'],
			'n/no-callback-literal': 'error',
			'n/no-deprecated-api': 'error',
			'n/no-exports-assign': 'error',
			'n/no-new-require': 'error',
			'n/no-path-concat': 'error',
			'n/process-exit-as-throw': 'error',

			// ============================================
			// Promise plugin rules (from standard)
			// ============================================
			'promise/param-names': 'error',

			// ============================================
			// Custom overrides (original project rules)
			// Uses @stylistic for formatting rules (replacing
			// deprecated core ESLint formatting rules)
			// ============================================
			'@stylistic/semi': [2, 'always'],
			'@stylistic/no-extra-semi': 2,
			'@stylistic/no-tabs': 0,
			'react/jsx-indent': [2, 'tab'],
			'react/jsx-indent-props': [2, 'tab'],
			'@stylistic/indent': [2, 'tab', {
				SwitchCase: 1
			}],
			'@stylistic/brace-style': [
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
			'@stylistic/max-len': [2, {
				code: 120,
				ignoreTrailingComments: true,
				ignoreComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				tabWidth: 1
			}],
			'@stylistic/linebreak-style': [2, 'windows'],
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function'
				}
			],
			'react/jsx-no-useless-fragment': 2,
			'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
			'@stylistic/comma-dangle': [2, 'only-multiline'],
			'@stylistic/space-before-function-paren': [2, 'never'],
			'@stylistic/multiline-ternary': [2, 'never']
		}
	}
];
