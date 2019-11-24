'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function desc(id) {
    console.log('out' + id);
    return function (target, key, descriptor) {
        console.log('inner' + id);
    };
}
// 洋葱模型 compose方法 redux koa
var My = (_dec = desc('1'), _dec2 = desc('2'), (_class = function () {
    function My() {
        _classCallCheck(this, My);
    }

    _createClass(My, [{
        key: 'my',
        value: function my() {}
    }]);

    return My;
}(), (_applyDecoratedDescriptor(_class.prototype, 'my', [_dec, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'my'), _class.prototype)), _class));

// 周五  休息一天
// 分组 交作业
// 不会es6的  周六晚上公开课 jwt 开课课 8.30
