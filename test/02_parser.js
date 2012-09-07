var lisp = require('../index.js'),
    Scanner = lisp.Scanner,
    Parser = lisp.Parser,
    test = require('tap').test;

test(function (t) {
    var scanner = new Scanner('(+ 5 6)');
    var tokens = scanner.scan();
    var parser = new Parser(tokens);
    var ast = parser.parse();
    t.equivalent(ast, [[["+"],[5],[6]]]);
    t.end();
});
