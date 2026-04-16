// =============================================================================
// Intentionally BAD TypeScript code - violates @typescript-eslint rules
// =============================================================================

/// <reference path="some-types.d.ts" /> // @typescript-eslint/triple-slash-reference

// @typescript-eslint/no-var-requires
const lodash = require("lodash");

// @typescript-eslint/ban-ts-comment - @ts-ignore without description
// @ts-ignore
const ignored: number = "not a number";

// tslint:disable-next-line // @typescript-eslint/ban-tslint-comment

// @typescript-eslint/no-explicit-any
const anything: any = "hello";

// @typescript-eslint/no-inferrable-types
const inferrable: string = "obvious";
const inferrableNum: number = 42;
const inferrableBool: boolean = true;

// @typescript-eslint/no-unused-vars
const unusedVariable: string = "never used";
function unusedFunction(unusedParam: string): void {}

// @typescript-eslint/no-empty-interface
interface EmptyInterface {}

// @typescript-eslint/no-empty-function
function emptyFunction(): void {}
const emptyArrow = (): void => {};

// @typescript-eslint/consistent-type-definitions - use type instead of interface
type ShouldBeInterface = {
  name: string;
  age: number;
};

// @typescript-eslint/no-namespace
namespace BadNamespace {
  export const value = 1;
}

// @typescript-eslint/prefer-namespace-keyword - use module instead of namespace
module BadModule {
  export const value = 2;
}

// @typescript-eslint/no-array-constructor
const arr = new Array();
const arr2 = new Array(1, 2, 3);

// @typescript-eslint/no-extraneous-class - class with only static members
class StaticOnly {
  static readonly version = "1.0";
  static doSomething(): void {
    return;
  }
}

// @typescript-eslint/no-misused-new - new() in interface
interface BadConstructor {
  new (): BadConstructor;
}

// @typescript-eslint/no-invalid-void-type - void in union
type InvalidVoid = string | void;

// @typescript-eslint/no-duplicate-enum-values
enum DuplicateEnum {
  A = 1,
  B = 2,
  C = 1,
  D = 2,
}

// @typescript-eslint/prefer-literal-enum-member - computed enum value
const COMPUTED = 10;
enum ComputedEnum {
  A = COMPUTED,
  B = 20,
}

// @typescript-eslint/no-unnecessary-type-constraint
function unnecessaryConstraint<T extends any>(arg: T): T {
  return arg;
}

// @typescript-eslint/prefer-function-type - interface with only call signature
interface CallableOnly {
  (): string;
}

// @typescript-eslint/no-unsafe-declaration-merging - interface + class merging
interface Mergeable {
  name: string;
}
class Mergeable {
  age: number = 0;
}

// @typescript-eslint/no-non-null-assertion
const maybeNull: string | null = null;
const definitelyString = maybeNull!;

// @typescript-eslint/no-extra-non-null-assertion
const doubleAsserted = maybeNull!!;

// @typescript-eslint/no-non-null-asserted-optional-chain
const obj: { a?: { b?: string } } | null = null;
const chained = obj?.a?.b!;

// @typescript-eslint/no-non-null-asserted-nullish-coalescing
const nullishAsserted = maybeNull! ?? "default";

// @typescript-eslint/ban-types - use banned types
const badObject: Object = {};
const badString: String = "bad";
const badNumber: Number = 42;
const badBoolean: Boolean = true;
const badFunction: Function = () => {};

// @typescript-eslint/no-dynamic-delete
const dynamicObj: Record<string, unknown> = { a: 1, b: 2 };
const keyToDelete: string = "a";
delete dynamicObj[keyToDelete];

// @typescript-eslint/no-this-alias
class ThisAliaser {
  name = "aliaser";
  method(): void {
    const self = this; // @typescript-eslint/no-this-alias
    setTimeout(function () {
      console.log(self.name);
    }, 100);
  }
}

// @typescript-eslint/no-useless-constructor
class UselessConstructor {
  constructor(public name: string) {
    // intentionally empty
  }
}
class ChildUseless extends UselessConstructor {
  constructor(name: string) {
    super(name);
  }
}

// @typescript-eslint/prefer-as-const
let constAssertion = "hello" as "hello"; // @typescript-eslint/prefer-as-const

// @typescript-eslint/prefer-for-of - indexed loop that could be for-of
const items = [1, 2, 3];
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

// @typescript-eslint/unified-signatures - signatures that could be unified
function overloaded(a: string): void;
function overloaded(a: number): void;
function overloaded(a: string | number): void {
  console.log(a);
}

// @typescript-eslint/adjacent-overload-signatures - non-adjacent overloads
function adjacentBad(a: string): void;
function unrelated(): void;
function adjacentBad(a: number): void;
function adjacentBad(a: string | number): void {
  console.log(a);
}
function unrelated(): void {
  return;
}

// @typescript-eslint/array-type - inconsistent array type notation
const mixedArray1: Array<string> = [];
const mixedArray2: number[] = [];

// @typescript-eslint/consistent-generic-constructors
const map: Map<string, number> = new Map();

// @typescript-eslint/consistent-type-assertions - banned assertion style
const assertedValue = (anything as string).toUpperCase();

// @typescript-eslint/class-literal-property-style - getters for literal values
class LiteralGetter {
  get name(): string {
    return "constant";
  }
}

// @typescript-eslint/no-confusing-non-null-assertion
const confusingMap = new Map<string, string>();
const confusingCheck = confusingMap.has("key")!;

// @typescript-eslint/no-loss-of-precision
const bigNum = 9007199254740993;
const bigFloat = 5123000000000000000000000000001;

// --- New @typescript-eslint rules (ESLint 9 / typescript-eslint v8) ---

// @typescript-eslint/default-param-last
function badDefaultParam(a: string = "default", b: number): string {
  return `${a}${b}`;
}

// @typescript-eslint/naming-convention (variable must be camelCase/PascalCase/UPPER_CASE)
const snake_case_var: string = "bad";
// naming-convention (function must be camelCase/PascalCase)
function not_camel_case(): void {}
// naming-convention (type must be PascalCase)
type bad_type_name = string;

// @typescript-eslint/no-dupe-class-members
class DuplicateMembers {
  method(): void {}
  method(): void {} // duplicate
}

// @typescript-eslint/no-loop-func
const loopResults: Array<() => number> = [];
let loopIdx = 0;
while (loopIdx < 5) {
  loopResults.push(() => loopIdx); // @typescript-eslint/no-loop-func
  loopIdx += 1;
}

// @typescript-eslint/no-redeclare
let redeclared = 1;
let redeclared = 2; // @typescript-eslint/no-redeclare

// @typescript-eslint/no-shadow
const outerValue = 10;
function shadowingFunc(): number {
  const outerValue = 20; // @typescript-eslint/no-shadow
  return outerValue;
}

// @typescript-eslint/no-unused-expressions
const sideEffectStr: string = "hello";
sideEffectStr; // @typescript-eslint/no-unused-expressions

// Export to avoid module-level unused warnings
export {
  anything,
  inferrable,
  inferrableNum,
  inferrableBool,
  arr,
  arr2,
  StaticOnly,
  DuplicateEnum,
  ComputedEnum,
  unnecessaryConstraint,
  definitelyString,
  doubleAsserted,
  chained,
  nullishAsserted,
  badObject,
  badString,
  badNumber,
  badBoolean,
  badFunction,
  dynamicObj,
  ThisAliaser,
  UselessConstructor,
  ChildUseless,
  constAssertion,
  items,
  overloaded,
  adjacentBad,
  mixedArray1,
  mixedArray2,
  map,
  assertedValue,
  LiteralGetter,
  confusingCheck,
  bigNum,
  bigFloat,
  BadNamespace,
  BadModule,
  EmptyInterface,
  ShouldBeInterface,
  InvalidVoid,
  BadConstructor,
  CallableOnly,
  Mergeable,
  lodash,
  ignored,
  emptyFunction,
  emptyArrow,
  badDefaultParam,
  snake_case_var,
  not_camel_case,
  bad_type_name,
  DuplicateMembers,
  loopResults,
  redeclared,
  shadowingFunc,
};
