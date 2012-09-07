var lisp = require('../index.js'),
    Scanner = lisp.Scanner,
    Parser = lisp.Parser,
    JSASTConverter = lisp.JSASTConverter,
    Generator = lisp.Generator,
    test = require('tap').test;

test(function (t) {
    var scanner = new Scanner('(+ 5 6)');
    var tokens = scanner.scan();
    var parser = new Parser(tokens);
    var ast = parser.parse();
    var converter = new JSASTConverter(ast);
    var jsast = converter.translate();
    var generator = new Generator(jsast);
    var jssrc = generator.generate();
    t.equal(eval(jssrc[0]), 11);
    t.end();
});
