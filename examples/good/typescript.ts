// =============================================================================
// GOOD TypeScript code - passes all @typescript-eslint and core ESLint rules
// =============================================================================

// --- consistent-type-definitions: use interface (not type alias for objects) ---
interface User {
	name: string;
	age: number;
	email: string;
}

// --- no-empty-interface: extending another interface is allowed ---
interface AdminUser extends User {
	role: string;
	permissions: string[];
}

// --- consistent-indexed-object-style: use Record<K,V> ---
interface AppConfig {
	settings: Record<string, string>;
	flags: Record<string, boolean>;
}

// --- array-type: use T[] notation (not Array<T>) ---
interface DataStore {
	users: User[];
	admins: AdminUser[];
	tags: string[];
	scores: number[];
}

// --- prefer-function-type: use function type instead of callable interface ---
type Formatter = (input: string) => string;
type Comparator<T> = (a: T, b: T) => number;

// --- no-duplicate-enum-values, prefer-literal-enum-member ---
// --- export enums directly ---
/* eslint-disable no-shadow, no-unused-vars */
export enum Status {
	Active = 'active',
	Inactive = 'inactive',
	Pending = 'pending',
	Archived = 'archived',
}

export enum Priority {
	Low = 0,
	Medium = 1,
	High = 2,
	Critical = 3,
}
/* eslint-enable no-shadow, no-unused-vars */

// --- consistent-generic-constructors: specify generic on constructor side ---
const userMap = new Map<string, User>();
const tagSet = new Set<string>();

// --- no-explicit-any: use proper types (unknown, generics, etc.) ---
const parseJson = (raw: string): unknown => JSON.parse(raw);

// --- no-inferrable-types: do NOT annotate obvious types ---
const appName = 'MyApp';
const maxRetries = 3;
const isEnabled = true;

// --- prefer-as-const: use `as const` for literal assertions ---
const CONFIG_KEY = 'main' as const;
const VERSION = 1 as const;

// --- consistent-type-assertions: use `as` expressions ---
const rawData: unknown = parseJson('{"id": 1}');
const parsed = rawData as Record<string, number>;

// --- no-non-null-assertion: handle nullability safely ---
const findUser = (uid: string): User | undefined => {
	const found = userMap.get(uid);
	return found;
};

// --- no-else-return: no else block after return ---
const getDisplayName = (uid: string): string => {
	const user = findUser(uid);
	if (user) {
		return user.name;
	}
	return 'Unknown';
};

// --- no-unnecessary-type-constraint: no `extends any` or `extends unknown` ---
const identity = <T>(value: T): T => value;
const wrapInArray = <T>(item: T): T[] => [item];

// --- generics with constraints (proper, non-trivial) ---
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

// --- no-namespace: we simply don't use namespaces ---
// --- triple-slash-reference: we use imports, not /// <reference /> ---

// --- class-literal-property-style: use readonly fields instead of getters ---
// --- no-extraneous-class: class has instance members ---
// --- no-useless-constructor: constructor does meaningful work ---
// --- max-classes-per-file: only one class in this file ---
class Calculator {
	readonly precision = 2;

	private result = 0;

	constructor(initial: number) {
		this.result = initial;
	}

	add(value: number): Calculator {
		this.result += value;
		return this;
	}

	subtract(value: number): Calculator {
		this.result -= value;
		return this;
	}

	getResult(): number {
		return Number(this.result.toFixed(this.precision));
	}

	format(formatter: Formatter): string {
		return formatter(String(this.result));
	}

	compare(other: Calculator, comparator: Comparator<number>): number {
		return comparator(this.getResult(), other.getResult());
	}
}

// --- no-this-alias: use arrow functions instead of aliasing `this` ---
const createCounter = () => {
	let count = 0;
	return {
		increment: () => {
			count += 1;
			return count;
		},
		getCount: () => count,
	};
};

// --- prefer-for-of / no-restricted-syntax: use array methods instead of loops ---
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const total = numbers.reduce((sum, n) => sum + n, 0);

// --- no-invalid-void-type: void only in return types ---
const runTask = (task: () => void): void => {
	task();
};

// --- no-confusing-non-null-assertion: use proper boolean checks ---
const hasKey = (map: Map<string, string>, key: string): boolean => map.has(key);

// --- no-dynamic-delete: use Map instead of object with dynamic delete ---
const createRegistry = () => {
	const registry = new Map<string, string>();
	return {
		add: (key: string, value: string) => {
			registry.set(key, value);
		},
		remove: (key: string) => {
			registry.delete(key);
		},
		get: (key: string) => registry.get(key),
	};
};

// --- safeDivide: no-else-return ---
const safeDivide = (a: number, b: number): number => {
	if (b === 0) {
		return 0;
	}
	return a / b;
};

// --- no-loss-of-precision: use safe numbers ---
const safeInt = 9007199254740991;
const safeFloat = 1.5;

// --- eqeqeq: always use strict equality ---
const isZero = (val: number): boolean => val === 0;

// --- prefer-const, prefer-destructuring, prefer-template ---
const user: User = { name: 'Alice', age: 30, email: 'alice@example.com' };
const { name, age } = user;
const greeting = `Hello, ${name}! You are ${age} years old.`;

// --- multiline-ternary: never (single line only) ---
const label = age >= 18 ? 'adult' : 'minor';

// --- comma-dangle: only-multiline ---
const config: AppConfig = {
	settings: {
		theme: 'dark',
		language: 'en',
	},
	flags: {
		beta: true,
		debug: false,
	},
};

// --- Use generics and identity to demonstrate them ---
const wrappedName = identity(name);
const wrappedNumbers = wrapInArray(total);
const themeValue = getProperty(config.settings, 'theme');

// --- Use enum values so they are referenced ---
const currentStatus = Status.Active;
const fallbackStatus = Status.Pending;
const topPriority = Priority.Critical;
const lowPriority = Priority.Low;

// --- Use remaining utilities ---
const parsed2 = parseJson('{"ok":true}');
const { id: userId } = parsed;
const found = findUser('abc');
const displayName = getDisplayName('abc');
const calc = new Calculator(10);
const divResult = safeDivide(10, 3);
const zeroCheck = isZero(0);
const keyCheck = hasKey(new Map<string, string>(), 'test');
const counterObj = createCounter();
const counterVal = counterObj.increment();
const registry = createRegistry();
const taskResult = runTask(() => {
	identity(1);
});

// --- DataStore usage ---
const store: DataStore = {
	users: [user],
	admins: [{
		name: 'Bob',
		age: 40,
		email: 'bob@example.com',
		role: 'admin',
		permissions: ['read', 'write'],
	}],
	tags: ['ts', 'eslint'],
	scores: doubled,
};

// Export everything to satisfy no-unused-vars
export {
	userMap,
	tagSet,
	parseJson,
	appName,
	maxRetries,
	isEnabled,
	CONFIG_KEY,
	VERSION,
	rawData,
	parsed,
	userId,
	findUser,
	getDisplayName,
	identity,
	wrapInArray,
	getProperty,
	Calculator,
	createCounter,
	numbers,
	doubled,
	evens,
	total,
	runTask,
	hasKey,
	createRegistry,
	safeDivide,
	safeInt,
	safeFloat,
	isZero,
	user,
	name,
	age,
	greeting,
	label,
	config,
	wrappedName,
	wrappedNumbers,
	themeValue,
	currentStatus,
	fallbackStatus,
	topPriority,
	lowPriority,
	parsed2,
	found,
	displayName,
	calc,
	divResult,
	zeroCheck,
	keyCheck,
	counterObj,
	counterVal,
	registry,
	taskResult,
	store,
};

// Re-export types/interfaces
export type {
	User, AdminUser, AppConfig, DataStore, Formatter, Comparator,
};
