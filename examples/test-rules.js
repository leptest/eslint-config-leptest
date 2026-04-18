#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const eslint = (dir) => {
	try {
		const result = execSync(
			`npx eslint ${dir} -f json`,
			{ cwd: root, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
		);
		return JSON.parse(result);
	}
	catch(e) {
		return JSON.parse(e.stdout);
	}
};

const countProblems = (results) => {
	let errors = 0;
	let warnings = 0;
	const rules = new Set();
	results.forEach((file) => {
		file.messages.forEach((msg) => {
			if (msg.severity === 2) {
				errors += 1;
			}
			else {
				warnings += 1;
			}
			if (msg.ruleId) {
				rules.add(msg.ruleId);
			}
		});
	});
	return { errors, warnings, rules: [...rules].sort() };
};

// Run on good examples
const goodResults = eslint('examples/good', 'good');
const goodStats = countProblems(goodResults);

// Run on bad examples
const badResults = eslint('examples/bad', 'bad');
const badStats = countProblems(badResults);

// Report
console.log('=== ESLint Rule Test Results ===\n');

console.log('GOOD examples (should have 0 errors):');
if (goodStats.errors === 0 && goodStats.warnings === 0) {
	console.log('  PASS - 0 errors, 0 warnings\n');
}
else {
	console.log(`  FAIL - ${goodStats.errors} errors, ${goodStats.warnings} warnings`);
	goodResults.forEach((file) => {
		const relative = path.relative(root, file.filePath);
		file.messages.forEach((msg) => {
			console.log(`    ${relative}:${msg.line} ${msg.ruleId} - ${msg.message}`);
		});
	});
	console.log('');
}

console.log('BAD examples (should trigger errors):');
console.log(`  ${badStats.errors} errors, ${badStats.warnings} warnings`);
console.log(`  ${badStats.rules.length} unique rules triggered:\n`);

badStats.rules.forEach((rule) => {
	console.log(`    ${rule}`);
});

console.log('');

// Exit code
const passed = goodStats.errors === 0 && goodStats.warnings === 0 && badStats.errors > 0;
if (passed) {
	console.log('RESULT: PASS');
}
else {
	console.log('RESULT: FAIL');
	if (goodStats.errors > 0 || goodStats.warnings > 0) {
		console.log('  - Good examples have lint errors (they should be clean)');
	}
	if (badStats.errors === 0) {
		console.log('  - Bad examples produced no errors (they should trigger rules)');
	}
}

process.exit(passed ? 0 : 1);
