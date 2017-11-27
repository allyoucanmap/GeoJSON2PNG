const div = require('./div');

const SQUARE = function(_parent = document.body, _class = '') {
    this._ = div(_parent, ' a-square' + _class);
    return this;
};

module.exports = (_parent, _class) => new SQUARE(_parent, _class);
