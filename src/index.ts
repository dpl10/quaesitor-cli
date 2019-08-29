#!/usr/bin/env node
process.env.TF_CPP_MIN_LOG_LEVEL = '2';
/* imports from node_modules */
import * as fs from 'fs';
import * as path from 'path';
import { Model, Quaesitor } from 'quaesitor';
let h: boolean = false;
let i: string = null;
let o: string = null;
for(let k: number = process.argv.length-1; k >= 0; k--){
	if(process.argv[k] === '-h'){
		h = true;
	} else if(process.argv[k] === '-i'){
		if(checkFile(process.argv[k+1]) === true){
			i = process.argv[k+1];
		}
	} else if(process.argv[k] === '-o'){
		if(string(process.argv[k+1]) === true){
			o = process.argv[k+1];
		}
	}
}
if((notNULL(i) === true) && (checkPipe() === false) && (notNULL(o) === true)){ /* file in + file out */
	readFile(i, h).then((x: Array<string>): void => {
		writeFile(o, x);
	});
} else if((notNULL(i) === true) && (checkPipe() === false) && (notNULL(o) === false)){ /* file in + stream out */
	readFile(i, h).then((x: Array<string>): void => {
		writeStream(x);
	});
} else if((notNULL(i) === false) && (checkPipe() === true) && (notNULL(o) === true)){ /* stream in + file out */
	readStream(h).then((x: Array<string>): void => {
		writeFile(o, x);
	});
} else if((notNULL(i) === false) && (checkPipe() === true) && (notNULL(o) === false)){ /* stream in + stream out */
	readStream(h).then((x: Array<string>): void => {
		writeStream(x);
	});
} else {
	let x	=	'\nA TypeScript command–line interface for quaesitor that finds Latin scientific\n'
			+	'names within vernacular text. Input data should be plain text. Quaesitor reads\n'
			+	'whole files before processing, so use small files, or have a lot of RAM.\n\n'
			+	'If you use this software, please cite: Little, D.P. Submitted. Recognition of\n'
			+	'Latin scientific names using artificial neural networks. Applications in Plant\n'
			+	'Sciences.\n\n'
			+	'usage: quaesitor [ -h ] [ -i input-file.txt ] [ -o output-file ]\n'
			+	'where:\n'
			+	'-h\thtml formatted output (default plain text)\n'
			+	'-i\tinput file in plain text format (if not specified, stdin will be used)\n'
			+	'-o\toutput file name (if not specified, stdout will be used)\n\n';
	process.stderr.write(x, 'UTF8');
}
function checkFile(file: string): boolean {
	try {
		return(fs.statSync(file).isFile());
	} catch(error){
		return(false);
	}
}
function checkPipe(): boolean {
	if(process.stdin.isTTY){
		return(false);
	} else {
		return(true);
	}
}
function notNULL(x: any): boolean {
	return(Object.prototype.toString.call(x) === '[object String]');
}
async function processInput(x: string, h: boolean): Promise<Array<string>> {
	const m = new Model();
	const p = path.dirname(require.resolve('quaesitor/package.json')) + '/dist/assets/';
	m.ecnn = fs.readFileSync(p + 'ecnn.pbf');
	m.edffnn = fs.readFileSync(p + 'edffnn.pbf');
	m.lcnn = fs.readFileSync(p + 'lcnn.pbf');
	m.pcnn = fs.readFileSync(p + 'pcnn.pbf');
	const q = new Quaesitor();
	await q.loadNetworks(m);
	return(q.extractSpecies(x, h));
}
async function readFile(i: string, h: boolean): Promise<Array<string>> {
	return(processInput(fs.readFileSync(i, 'utf8'), h));
}
async function readStream(h: boolean): Promise<Array<string>> {
	return(processInput(fs.readFileSync(0, 'utf8'), h));
}
function writeFile(o: string, x: Array<string>): void {
	fs.writeFileSync(o, x.join('\n') + '\n', 'utf8');
}
function writeStream(x: Array<string>): void {
	process.stdout.write(x.join('\n') + '\n', 'utf8');
}
function string(x: any): boolean {
	return(Object.prototype.toString.call(x) === '[object String]');
}
