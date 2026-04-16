#!/usr/bin/env node

/**
 * Prints the fully resolved ESLint configuration.
 *
 * Usage:
 *   node show-config.js              # pretty-print to stdout
 *   node show-config.js --json       # raw JSON to stdout
 *   node show-config.js [file]       # resolve config for a specific file
 *
 * If no file is given, resolves the config as it would apply to a .js file
 * in the project root (the file does not need to exist).
 */

const { ESLint } = require('eslint');
const path = require('path');

const args = process.argv.slice(2);
const jsonFlag = args.includes('--json');
const filePath = args.find((a) => a !== '--json') || 'file.js';
const resolvedPath = path.resolve(filePath);

(async () => {
	const eslint = new ESLint();
	const config = await eslint.calculateConfigForFile(resolvedPath);

	if (jsonFlag) {
		process.stdout.write(JSON.stringify(config, null, 2));
		process.stdout.write('\n');
		return;
	}

	// ── Summary ──────────────────────────────────────────────
	const ruleEntries = Object.entries(config.rules);
	const severity = (v) => (Array.isArray(v) ? v[0] : v);
	const errors = ruleEntries.filter(([, v]) => severity(v) === 2 || severity(v) === 'error');
	const warnings = ruleEntries.filter(([, v]) => severity(v) === 1 || severity(v) === 'warn');
	const off = ruleEntries.filter(([, v]) => severity(v) === 0 || severity(v) === 'off');

	console.log('╔══════════════════════════════════════════════════════════════╗');
	console.log('║           Resolved ESLint Configuration                     ║');
	console.log('╚══════════════════════════════════════════════════════════════╝');
	if (filePath !== 'file.js') {
		console.log(`\nFile: ${resolvedPath}\n`);
	}
	console.log('');

	// Parser
	console.log('── Parser ──────────────────────────────────────────────────────');
	console.log(`  ${config.parser || '(default)'}`);

	// Parser Options
	if (config.parserOptions) {
		console.log('\n── Parser Options ──────────────────────────────────────────────');
		console.log(fmt(config.parserOptions));
	}

	// Env
	if (config.env) {
		console.log('\n── Environments ────────────────────────────────────────────────');
		console.log(`  ${Object.keys(config.env).join(', ')}`);
	}

	// Globals
	if (config.globals && Object.keys(config.globals).length) {
		console.log('\n── Globals ─────────────────────────────────────────────────────');
		console.log(fmt(config.globals));
	}

	// Plugins
	if (config.plugins) {
		console.log('\n── Plugins ─────────────────────────────────────────────────────');
		config.plugins.forEach((p) => console.log(`  • ${p}`));
	}

	// Settings
	if (config.settings && Object.keys(config.settings).length) {
		console.log('\n── Settings ────────────────────────────────────────────────────');
		console.log(fmt(config.settings));
	}

	// Rules summary
	console.log('\n── Rules Summary ───────────────────────────────────────────────');
	console.log(`  Total: ${ruleEntries.length}  |  error: ${errors.length}  |  warn: ${warnings.length}  |  off: ${off.length}`);

	// Rules detail
	console.log('\n── Rules (error) ───────────────────────────────────────────────');
	errors.sort(byName).forEach(printRule);

	if (warnings.length) {
		console.log('\n── Rules (warn) ────────────────────────────────────────────────');
		warnings.sort(byName).forEach(printRule);
	}

	console.log('\n── Rules (off) ─────────────────────────────────────────────────');
	off.sort(byName).forEach(([name]) => console.log(`  ${name}`));
})();

function fmt(obj) {
	return JSON.stringify(obj, null, 2)
		.split('\n')
		.map((l) => `  ${l}`)
		.join('\n');
}

function byName([a], [b]) {
	return a.localeCompare(b);
}

function printRule([name, value]) {
	const opts = Array.isArray(value) ? value.slice(1) : [];
	if (opts.length === 0) {
		console.log(`  ${name}`);
	}
	else {
		const optsStr = opts.map((o) => JSON.stringify(o)).join(', ');
		console.log(`  ${name}: ${optsStr}`);
	}
}
