#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.TF_CPP_MIN_LOG_LEVEL = '2';
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const quaesitor_1 = require("quaesitor");
let h = false;
let i = null;
let o = null;
for (let k = process.argv.length - 1; k >= 0; k--) {
    if (process.argv[k] === '-h') {
        h = true;
    }
    else if (process.argv[k] === '-i') {
        if (checkFile(process.argv[k + 1]) === true) {
            i = process.argv[k + 1];
        }
    }
    else if (process.argv[k] === '-o') {
        if (string(process.argv[k + 1]) === true) {
            o = process.argv[k + 1];
        }
    }
}
if ((notNULL(i) === true) && (checkPipe() === false) && (notNULL(o) === true)) {
    readFile(i, h).then((x) => {
        writeFile(o, x);
    });
}
else if ((notNULL(i) === true) && (checkPipe() === false) && (notNULL(o) === false)) {
    readFile(i, h).then((x) => {
        writeStream(x);
    });
}
else if ((notNULL(i) === false) && (checkPipe() === true) && (notNULL(o) === true)) {
    readStream(h).then((x) => {
        writeFile(o, x);
    });
}
else if ((notNULL(i) === false) && (checkPipe() === true) && (notNULL(o) === false)) {
    readStream(h).then((x) => {
        writeStream(x);
    });
}
else {
    let x = '\nA TypeScript command–line interface for QUAESITOR that finds Latin scientific\n'
        + 'names within vernacular text. Input data should be plain text. QUAESITOR reads\n'
        + 'whole files before processing, so use small files, or have a lot of RAM.\n\n'
        + 'If you use this software, please cite: Little, D.P. Submitted. Recognition of\n'
        + 'Latin scientific names using artificial neural networks. Applications in Plant\n'
        + 'Sciences.\n\n'
        + 'usage: quaesitor [ -h ] [ -i input-file.txt ] [ -o output-file ]\n'
        + 'where:\n'
        + '-h\thtml formatted output (default plain text)\n'
        + '-i\tinput file in plain text format (if not specified, stdin will be used)\n'
        + '-o\toutput file name (if not specified, stdout will be used)\n\n';
    process.stderr.write(x, 'UTF8');
}
function checkFile(file) {
    try {
        return (fs.statSync(file).isFile());
    }
    catch (error) {
        return (false);
    }
}
function checkPipe() {
    if (process.stdin.isTTY) {
        return (false);
    }
    else {
        return (true);
    }
}
function notNULL(x) {
    return (Object.prototype.toString.call(x) === '[object String]');
}
function processInput(x, h) {
    return __awaiter(this, void 0, void 0, function* () {
        const c = new quaesitor_1.Classifiers();
        const p = path.dirname(require.resolve('quaesitor/package.json')) + '/dist/assets/';
        c.bf = fs.readFileSync(p + 'bf.pbf');
        c.bedffnn = fs.readFileSync(p + 'bedffnn.pbf');
        c.ecnn = fs.readFileSync(p + 'ecnn.pbf');
        c.lcnn = fs.readFileSync(p + 'lcnn.pbf');
        c.pdffnn = fs.readFileSync(p + 'pdffnn.pbf');
        c.uedffnn = fs.readFileSync(p + 'uedffnn.pbf');
        const q = new quaesitor_1.Quaesitor();
        yield q.loadClassifiers(c);
        return (q.extractSpecies(x, h));
    });
}
function readFile(i, h) {
    return __awaiter(this, void 0, void 0, function* () {
        return (processInput(fs.readFileSync(i, 'utf8'), h));
    });
}
function readStream(h) {
    return __awaiter(this, void 0, void 0, function* () {
        return (processInput(fs.readFileSync(0, 'utf8'), h));
    });
}
function writeFile(o, x) {
    fs.writeFileSync(o, x.join('\n') + '\n', 'utf8');
}
function writeStream(x) {
    process.stdout.write(x.join('\n') + '\n', 'utf8');
}
function string(x) {
    return (Object.prototype.toString.call(x) === '[object String]');
}
//# sourceMappingURL=index.js.map