(function () {
var escodegen = require('escodegen'),
    esmangle = require('esmangle'),
    fs = require('fs');

var runtime = fs.readFileSync(__dirname + "/runtime.js", 'utf-8');

var passes = [
    // remove unused label
    esmangle.require('lib/pass/remove-unused-label'),

    // remove empty statement
    esmangle.require('lib/pass/remove-empty-statement'),

    // remove wasted blocks
    esmangle.require('lib/pass/remove-wasted-blocks'),

    // transform to sequence expression
    esmangle.require('lib/pass/transform-to-sequence-expression'),

    // transform branch to expression
    esmangle.require('lib/pass/transform-branch-to-expression'),

    // reduce branch jump
    esmangle.require('lib/pass/reduce-branch-jump')
];

function Generator(jsast) {
    this.jsast = jsast;
}
Generator.prototype.generate = function() {
    var optimized = esmangle.optimize(this.jsast, passes);
    var src =  escodegen.generate(esmangle.mangle(optimized));
    return runtime + src;
};

module.exports = Generator;

}).call(this);
