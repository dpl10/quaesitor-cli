#!/usr/bin/env node
process.env.TF_CPP_MIN_LOG_LEVEL = '2';
/* imports from node_modules */
import * as fs from 'fs';
import * as path from 'path';
import { Classifiers, Quaesitor } from 'quaesitor';
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
	let x	=	'\nA TypeScript command–line interface for QUAESITOR that finds Latin scientific\n'
			+	'names within vernacular text. Input data should be plain text. QUAESITOR reads\n'
			+	'whole files before processing, so use small files, or have a lot of RAM.\n\n'
			+	'If you use this software, please cite: Little, D.P. 2020. Recognition of\n'
			+	'Latin scientific names using artificial neural networks. Applications in Plant\n'
			+	'Sciences 8(7): e11378 (https://doi.org/10.1002/aps3.11378).\n\n'
			+	'usage: quaesitor [ -h ] [ -i input-file.txt ] [ -o output-file ]\n'
			+	'where:\n'
			+	'-h\thtml formatted output (default plain text)\n'
			+	'-i\tinput file in plain text format (if not specified, stdin will be used)\n'
			+	'-o\toutput file name (if not specified, stdout will be used)\n\n';
	process.stderr.write(x, 'utf8');
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
	const c = new Classifiers();
	const p = path.dirname(require.resolve('quaesitor/package.json')) + '/dist/assets/';
	c.bf = fs.readFileSync(p + 'bf.pbf');
	c.bedffnn = fs.readFileSync(p + 'bedffnn.pbf');
	c.ecnn = fs.readFileSync(p + 'ecnn.pbf');
	c.lcnn = fs.readFileSync(p + 'lcnn.pbf');
	c.pdffnn = fs.readFileSync(p + 'pdffnn.pbf');
	c.uedffnn = fs.readFileSync(p + 'uedffnn.pbf');
	const q = new Quaesitor();
	await q.loadClassifiers(c);
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
