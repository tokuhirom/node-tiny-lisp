var lisp = require('../index.js'),
    Scanner = lisp.Scanner,
    test = require('tap').test;

test(function (t) {
    var scanner = new Scanner('(+ 2 3)');
    var tokens = scanner.scan();
    t.equivalent(
        tokens,
        [
            ['('],
            ['+'],
            [2],
            [3],
            [')']
        ]
    );
    t.end();
});
