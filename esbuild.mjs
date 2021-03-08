#!/usr/bin/env node
/* imports from node_modules */
import esbuild from 'esbuild';
const nodeConfig = {
	bundle: true,
	banner: "process.env.TF_CPP_MIN_LOG_LEVEL = '2';", /* included in src/index.ts, but gets removed in build */
	entryPoints: [
		'src/index.ts'
	],
	external: [
		'fs',
		'@tensorflow/tfjs-node'
	],
	// format: 'esm',
	minify: false,
	outfile: 'dist/index.js',
	platform: 'node',
	sourcemap: true,
	target: [
		'es2020'
	]
};
esbuild.build(nodeConfig).catch(() => process.exit(1));
