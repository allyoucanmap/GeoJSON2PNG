const div = require('./div');

const CIRCLE = function(_parent = document.body, _class = '') {
    this._ = div(_parent, ' a-circle' + _class);
    this._.borderRadius = '50%';
    return this;
};

module.exports = (_parent, _class) => new CIRCLE(_parent, _class);
