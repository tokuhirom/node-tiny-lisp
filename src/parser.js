/*jshint node:true, laxcomma:true */
(function () {
"use strict";

var Scanner = require('./scanner.js');
var TK_TAG = 0;

function Parser(tokens) {
    this.tokens = tokens;
}
Parser.prototype.parse = function () {
    return this.parseSexps();
};
Parser.prototype.lookToken = function () {
    return this.tokens[0];
};
Parser.prototype.getToken = function () {
    return this.tokens.shift();
};
Parser.prototype.parseSexps = function () {
    var ret = [];
    while (this.tokens.length > 0) {
        var sexp = this.parseSexp();
        ret.push(sexp);
    }
    return ret;
};
Parser.prototype.parseSexp = function () {
    var token = this.getToken();
    if (token[TK_TAG] !== '(') {
        throw 'left paren is expected';
    }

    var ret = [];
    while (this.tokens.length > 0) {
        if (this.lookToken()[TK_TAG] === ')') {
            this.getToken();
            return ret;
        } else if (this.lookToken()[TK_TAG] === '(') {
            ret.push(this.parseSexp());
        } else {
            ret.push(this.parseAtom());
        }
    }
    throw 'Unbalanced parens in S-expression.';
};
Parser.prototype.parseAtom = function () {
    return this.getToken();
};

module.exports = Parser;

}).call(this);
