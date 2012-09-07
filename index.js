/*jshint evil:true, node: true */
"use strict";

var Scanner        = require('./src/scanner.js');
var Parser         = require('./src/parser.js');
var JSASTConverter = require('./src/js-ast-converter.js');
var Generator      = require('./src/generator.js');

function evaluate(src) {
    var scanner = new Scanner(src);
    var tokens = scanner.scan();
    var parser = new Parser(tokens);
    var ast = parser.parse();
    var converter = new JSASTConverter(ast);
    var jsast = converter.translate();
    var generator = new Generator(jsast);
    var jssrc = generator.generate();
    // console.log(jssrc);
    return eval(jssrc);
}

module.exports = {
    Scanner: Scanner,
    Parser: Parser,
    JSASTConverter: JSASTConverter,
    Generator: Generator,
    evaluate: evaluate
};

