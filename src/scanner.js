/*jshint node:true, laxcomma:true, loopfunc:true */
(function () {

"use strict";

var assert = require('assert');

var TOKENS = {
     TOKEN_LPAREN: 1
   , TOKEN_RPAREN: 2
   , TOKEN_NUMBER: 3
   , TOKEN_ADD:    4
};

function Scanner(src) {
    this.src = src;
    this.lineno = 1;
    this.col    = 1;
}
Object.keys(TOKENS).forEach(function (key) {
    Scanner[key] = TOKENS[key];
});
Scanner.prototype.scan = function () {
    var tokens = [];
    while (this.src.length > 0) {
        var token = this._scan();
        if (token) {
            tokens.push(token);
        } else {
            break;
        }
    }
    return tokens;
};

Scanner.prototype._scan = function () {
    this._skipWS();
    if (this.src.length===0) { return; }

    switch (this.src[0]) {
    case '(':
    case ')':
    case '+':
    case '*':
    case '-':
    case '/':
        var c = this.src[0];
        this.src = this.src.substr(1);
        return [c, this.lineno, this.col, this.lineno, ++(this.col)];
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
        var m = this.src.match(/^(0|[1-9][0-9]*(\.[0-9]+)?)/);
        if (m) {
            var startCol = this.col;
            this.col += m[0].length;
            this.src = this.src.substr(m[0].length);
            return [parseInt(m[0], 10), this.lineno, startCol, this.lineno, this.col];
        }
    }
    throw "Unknown token: " + JSON.stringify(this.src);
};
Scanner.prototype._skipWS = function () {
    var replaced = true;
    while (replaced) {
        replaced = false;
        this.src = this.src.replace(/^[ ]+/, (function (a) {
            replaced = true;
            this.col += a.length;
            return '';
        }).bind(this));
        this.src = this.src.replace(/^\n/, (function () {
            replaced = true;
            this.lineno++;
            this.col = 1;
            return '';
        }).bind(this));
    }
};

module.exports = Scanner;

}).call(this);
