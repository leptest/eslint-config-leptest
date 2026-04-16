// Core ESLint rules demonstration - valid code examples
import { EventEmitter } from 'events';

// prefer-const, destructuring, object shorthand, template literals
const APP_NAME = 'CoreDemo';
const VERSION = 2;
const config = { APP_NAME, VERSION };
const { APP_NAME: appName } = config;
const greeting = `Welcome to ${appName} v${VERSION}`;

// arrow functions, default params, rest params
const createMessage = (prefix = 'Info', ...parts) => `[${prefix}] ${parts.join(' ')}`;
const result = createMessage('Log', greeting, '- ready');

// prefer-const with let when reassignment needed
let counter = 0;
const MAX_COUNT = 10;
const counterRef = { value: counter };

// spread operator
const baseSettings = { theme: 'dark', lang: 'en' };
const userSettings = { ...baseSettings, lang: 'fr' };

// computed property keys
const dynamicKey = 'status';
const statusObj = { [dynamicKey]: 'active' };

// array destructuring, spread
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...remaining] = numbers;
const doubled = [...numbers].map((n) => n * 2);

// object destructuring in function params
const formatUser = ({ name, age }) => `${name} (${age})`;

// eqeqeq (===), no nested ternary, multiline-ternary never (single line)
const isValid = typeof appName === 'string' ? appName.length > 0 : false;

// no-plusplus in for loop afterthought is allowed
const items = [];
for (let i = 0; i < MAX_COUNT; i++) {
	items.push(i);
}

// stroustrup brace style: else on new line
if (isValid) {
	counter = 1;
}
else {
	counter = 0;
}

// switch with default, proper indentation
const getLabel = (code) => {
	switch (code) {
		case 1:
			return 'one';
		case 2:
			return 'two';
		default:
			return 'unknown';
	}
};

// class with constructor, methods, class-methods-use-this
class DataProcessor {
	constructor(data) {
		this.data = data;
		this.processed = false;
	}

	process() {
		this.processed = true;
		return this.data.map((item) => item * 2);
	}

	reset() {
		this.processed = false;
		this.data = [];
	}
}

// no for-in, no for-of: use array methods instead
const scores = [85, 92, 78, 95, 88];
const average = scores.reduce((acc, val) => acc + val, 0) / scores.length;
const highScores = scores.filter((s) => s >= 90);
const scoreLabels = scores.map((s) => `Score: ${s}`);

// Object.keys/values/entries instead of for-in
const metadata = { a: 1, b: 2, c: 3 };
const keys = Object.keys(metadata);
const mappedKeys = keys.map((key) => `${key}:${metadata[key]}`);
const doubled2 = keys.map((key) => [key, metadata[key] * 2]);

// exponentiation operator
const squared = first ** 2;
const cubed = second ** 3;

// try/catch with stroustrup braces
const safeParse = (json) => {
	try {
		return JSON.parse(json);
	}
	catch (err) {
		return null;
	}
};

// promise with proper rejection (prefer-promise-reject-errors)
const fetchData = (url) => new Promise((resolve, reject) => {
	if (typeof url === 'string') {
		resolve({ data: url });
	}
	else {
		reject(new Error('Invalid URL'));
	}
});

// async/await
const loadConfig = async(path) => {
	const data = await fetchData(path);
	return data;
};

// no-else-return (allowElseIf: false)
const classify = (value) => {
	if (value > 100) {
		return 'high';
	}
	if (value > 50) {
		return 'medium';
	}
	return 'low';
};

// radix with parseInt
const parseNum = (str) => parseInt(str, 10);

// no-useless-concat, prefer-template
const buildPath = (dir, file) => `${dir}/${file}`;

// arrow-body-style: as-needed (implicit return for simple expressions)
const double = (x) => x * 2;
const triple = (x) => x * 3;

// arrow-parens: always
const identity = (x) => x;
const wrapped = identity(42);

// object shorthand for methods
const utils = {
	double,
	triple,
	combine(a, b) {
		return a + b;
	},
};

// no-param-reassign (props: true with allowed names)
const processRequest = (req, res) => {
	res.status = 200;
	req.context = { processed: true };
	return res;
};

// symbol-description
const uniqueId = Symbol('uniqueId');

// prefer-regex-literals
const emailPattern = /^[^@]+@[^@]+$/;

// no-unneeded-ternary (defaultAssignment: false)
const hasName = Boolean(appName);

// using the imported and declared values to avoid no-unused-vars
const emitter = new EventEmitter();
const processor = new DataProcessor([1, 2, 3]);
const processed = processor.process();

export {
	result,
	counterRef,
	userSettings,
	statusObj,
	first,
	second,
	remaining,
	doubled,
	formatUser,
	isValid,
	items,
	getLabel,
	average,
	highScores,
	scoreLabels,
	keys,
	mappedKeys,
	doubled2,
	squared,
	cubed,
	safeParse,
	loadConfig,
	classify,
	parseNum,
	buildPath,
	identity,
	wrapped,
	utils,
	processRequest,
	uniqueId,
	emailPattern,
	hasName,
	emitter,
	processed,
	DataProcessor,
};

export default config;
