// =============================================================================
// Intentionally BAD JavaScript code - violates import and related rules
// =============================================================================

// import/order - wrong import order (third-party should come before local)
import { readFile } from "./local-module"; // local first = wrong order

// import/no-duplicates - duplicate imports from same module
import { join } from "path";
import { resolve } from "path";

// import/no-self-import - importing self
import { something } from "./imports";

// import/extensions - using file extension on JS import
import helpers from "./helpers.js";

// import/no-webpack-loader-syntax - loader! prefix
import styles from "css-loader!./styles.css";

// import/no-named-default
import { default as DefaultExport } from "./some-module";

// import/first - imports must come first, but we put code before the next import
const earlyCode = "this should not be between imports";

// import/first - import after non-import code
import lateImport from "lodash";

// import/newline-after-import - no newline after last import
const noNewline = "should have a blank line above";

// import/no-mutable-exports - exporting mutable bindings
export let mutableExport = "can be reassigned";
export var anotherMutable = "also bad";

// import/no-amd - AMD-style require
define(["jquery"], function ($) {
  return $.fn;
});

// import/no-amd - AMD-style require([])
require(["module1", "module2"], function (mod1, mod2) {
  console.log(mod1, mod2);
});

// import/no-import-module-exports - mixing import with module.exports
module.exports = {
  earlyCode,
  noNewline,
};

// import/prefer-default-export - only named exports (no default)
export const onlyNamedExport = "should be default";

// n/no-new-require - using new with require
const instance = new require("some-module");

// n/no-path-concat - string concatenation with __dirname
const filePath = __dirname + "/file.txt";
const anotherPath = __filename + ".bak";

// promise/param-names - wrong parameter names in Promise constructor
const badPromise = new Promise(function (ok, fail) {
  ok("done");
  fail("error");
});

// More promise/param-names violations
const anotherBadPromise = new Promise((yes, no) => {
  yes("resolved");
  no("rejected");
});

// Use imported values to avoid unused import warnings
console.log(
  join,
  resolve,
  readFile,
  something,
  helpers,
  styles,
  DefaultExport,
  lateImport,
  mutableExport,
  anotherMutable,
  onlyNamedExport,
  instance,
  filePath,
  anotherPath,
  badPromise,
  anotherBadPromise,
);

// import/no-named-as-default
// (This triggers when a default export is also available as a named export
// and you import the named export as default - covered by DefaultExport above)
