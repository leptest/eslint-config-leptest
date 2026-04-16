// =============================================================================
// GOOD TypeScript code - passes all @typescript-eslint rules
// =============================================================================

// --- consistent-type-definitions: use interface (not type alias) ---
interface User {
	name: string;
	age: number;
	email: string;
}

// --- no-empty-interface: extending another interface is allowed ---
interface AdminUser extends User {
	role: string;
}

// --- consistent-indexed-object-style: use Record<K,V> ---
interface AppConfig {
	settings: Record<string, string>;
	flags: Record<string, boolean>;
}

// --- array-type: use T[] notation (default "array" style) ---
interface DataStore {
	users: User[];
	admins: AdminUser[];
	tags: string[];
	scores: number[];
}

// --- no-duplicate-enum-values, prefer-literal-enum-member ---
enum Status {
	Active = 'active',
	Inactive = 'inactive',
	Pending = 'pending',
	Archived = 'archived',
}

enum Priority {
	Low = 0,
	Medium = 1,
	High = 2,
	Critical = 3,
}

// --- consistent-generic-constructors: specify generic on constructor side ---
const userMap = new Map<string, User>();
const tagSet = new Set<string>();
const scoreList = new Array<number>();

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
const userId = parsed.id;

// --- no-non-null-assertion: handle nullability safely ---
const findUser = (id: string): User | undefined => {
	const found = userMap.get(id);
	return found;
};

const getDisplayName = (id: string): string => {
	const user = findUser(id);
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

// --- prefer-function-type: use function type instead of callable interface ---
type Formatter = (input: string) => string;
type Comparator<T> = (a: T, b: T) => number;

// --- adjacent-overload-signatures: overloads must be grouped together ---
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: string | number): string | number {
	if (typeof value === 'string') {
		return value.toUpperCase();
	}
	return value * 2;
}

// --- unified-signatures: these cannot be unified (different return types) ---
function convert(input: string): number;
function convert(input: number): string;
function convert(input: string | number): string | number {
	if (typeof input === 'string') {
		return Number(input);
	}
	return String(input);
}

// --- no-namespace: use modules (export at top level) ---
// (We simply don't use namespace; we export directly)

// --- triple-slash-reference: avoided (use import instead) ---
// (We simply don't use /// <reference /> directives)

// --- class-literal-property-style: use readonly fields instead of getters ---
class AppInfo {
	readonly version = '1.0.0';

	readonly author = 'Team';
}

// --- no-extraneous-class: class has instance members, not static-only ---
class Calculator {
	private result = 0;

	add(value: number): Calculator {
		this.result += value;
		return this;
	}

	subtract(value: number): Calculator {
		this.result -= value;
		return this;
	}

	getResult(): number {
		return this.result;
	}
}

// --- no-useless-constructor: only add constructors that do something ---
class Logger {
	private prefix: string;

	constructor(prefix: string) {
		this.prefix = `[${prefix}]`;
	}

	format(message: string): string {
		return `${this.prefix} ${message}`;
	}
}

// --- prefer-for-of / no-restricted-syntax: use array methods instead ---
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const total = numbers.reduce((sum, n) => sum + n, 0);

// --- no-dynamic-delete: use Map or object spread to remove keys ---
const removeKey = (
	obj: Record<string, unknown>,
	key: string
): Record<string, unknown> => {
	const { [key]: _removed, ...rest } = obj;
	return rest;
};

// --- no-this-alias: use arrow functions to preserve context ---
class EventEmitter {
	private handlers: Array<() => void> = [];

	register(): void {
		this.handlers.push(() => {
			this.notify();
		});
	}

	private notify(): void {
		this.handlers.forEach((handler) => handler());
	}
}

// --- no-unsafe-declaration-merging: don't merge interface + class ---
// (Simply keep them separate or use one or the other)

// --- no-invalid-void-type: void only in return types ---
const runTask = (task: () => void): void => {
	task();
};

// --- no-confusing-non-null-assertion: avoid ! after comparisons ---
const hasKey = (map: Map<string, string>, key: string): boolean => map.has(key);

// --- stroustrup brace style: else/catch on new line ---
const safeDivide = (a: number, b: number): number => {
	if (b === 0) {
		return 0;
	}
	else {
		return a / b;
	}
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

// Export everything to satisfy no-unused-vars and import/prefer-default-export
export {
	Status,
	Priority,
	userMap,
	tagSet,
	scoreList,
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
	processValue,
	convert,
	AppInfo,
	Calculator,
	Logger,
	numbers,
	doubled,
	evens,
	total,
	removeKey,
	EventEmitter,
	runTask,
	hasKey,
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
};

// Re-export types/interfaces
export type { User, AdminUser, AppConfig, DataStore, Formatter, Comparator };
