(function () {
    /*
> JSON.stringify(require('esprima').parse('3+5'))
'{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"+","left":{"type":"Literal","value":3},"right":{"type":"Literal","value":5}}}]}'
> JSON.stringify(require('esprima').parse('3+5; 4+2'))
'{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"+","left":{"type":"Literal","value":3},"right":{"type":"Literal","value":5}}},{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"+","left":{"type":"Literal","value":4},"right":{"type":"Literal","value":2}}}]}'
> JSON.stringify(require('esprima').parse('3+5+8'))
'{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","operator":"+","left":{"type":"BinaryExpression","operator":"+","left":{"type":"Literal","value":3},"right":{"type":"Literal","value":5}},"right":{"type":"Literal","value":8}}}]}'
> JSON.stringify(require('esprima').parse('[1,2,3].reduce(opPlus)'))
'{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","computed":false,"object":{"type":"ArrayExpression","elements":[{"type":"Literal","value":1},{"type":"Literal","value":2},{"type":"Literal","value":3}]},"property":{"type":"Identifier","name":"reduce"}},"arguments":[{"type":"Identifier","name":"opPlus"}]}}]}'
    */

function JSASTConverter(ast) {
    this.ast = ast;
}
JSASTConverter.prototype.translate = function () {
    var body = [];
    for (var i=0, l=this.ast.length; i<l; i++) {
        body.push(this._translate(this.ast[i]));
    }
    return {
        'type': 'Program',
        'body': body
    };
};
JSASTConverter.prototype._translate = function (ast) {
    if (ast[0][0] === '+') {
        ast.shift();
        return {'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'computed': false,
                    'object': {
                        'type': 'ArrayExpression',
                        'elements': ast.map((function (t) {
                            return this._translate(t);
                        }).bind(this))
                    },
                    'property': {
                        type: 'Identifier',
                        name: 'reduce'
                    }
                },
                'arguments': [
                    {
                        type: 'Identifier',
                        name: 'TINYLISP$$opPlus'
                    }
                ]
            }
        };
    } else if (typeof(ast[0]) === 'number') {
        return {"type":"Literal","value":ast[0]};
    } else {
        console.log(ast);
        throw "Unknown expression.";
    }
};
module.exports = JSASTConverter;

}).call(this);
