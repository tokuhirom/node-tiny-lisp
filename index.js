/*jshint evil:true, node: true */
"use strict";

var fs = require('fs');

var Scanner        = require('./src/scanner.js');
var Parser         = require('./src/parser.js');
var JSASTConverter = require('./src/js-ast-converter.js');
var Generator      = require('./src/generator.js');

function evaluate(src, filename) {
    var scanner = new Scanner(src);
    var tokens = scanner.scan();
    var parser = new Parser(tokens);
    var ast = parser.parse();
    var converter = new JSASTConverter(ast);
    var jsast = converter.translate();
    var generator = new Generator(jsast, filename);
    var jssrc = generator.generate();
    return eval(jssrc[0]);
}

function loadFile(filename) {
    var src = fs.readFileSync(filename, 'utf-8');
    return evaluate(src, filename);
}

module.exports = {
    Scanner: Scanner,
    Parser: Parser,
    JSASTConverter: JSASTConverter,
    Generator: Generator,
    loadFile: loadFile,
    evaluate: evaluate
};

