/*jshint node:true, laxcomma:true */
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
    this.src = this.src.replace(/^\s+/, ''); // skip ws.
    switch (this.src[0]) {
    case '+':
        this.src = this.src.substr(1);
        return ['+'];
    case '(':
        this.src = this.src.substr(1);
        return ['('];
    case ')':
        this.src = this.src.substr(1);
        return [')'];
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
            this.src = this.src.substr(m[0].length);
            return [parseInt(m[0], 10)];
        }
    }
    throw "Unknown token: " + this.src;
};

module.exports = Scanner;

}).call(this);
