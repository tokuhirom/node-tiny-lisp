var lisp = require('../index.js'),
    test = require('tap').test;

test(function (t) {
    t.equal(lisp.evaluate('(+ 5 6)'), 11);
    t.equal(lisp.evaluate('(+ 1 2 3 4 5 6 7 8 9 10)'), 55);
    // t.equal(lisp.evaluate('(+ (+ 1 2 3 4 5) (+ 6 7 8 9 10))'), 55);
    t.end();
});
