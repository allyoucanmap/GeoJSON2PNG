const div = require('./div');

const distance = (x1, y1, x2, y2) => Math.sqrt(Math.abs(x1 - x2) * Math.abs(x1 - x2) + Math.abs(y1 - y2) * Math.abs(y1 - y2));
const angle = (x1, y1, x2, y2) =>  Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

const LINE = function(_parent = document.body, _class = '', x1 = 0, y1 = 0, x2 = 0, y2 = 0, z = 0) {
    this._ = div(_parent, ' a-line' + _class);
    this._.div.style.backgroundColor = '#ddd';
    this.coords(x1, y1, x2, y2, z);
    return this;
};

LINE.prototype.coords = function(x1, y1, x2, y2, z = 0) {
    this._.div.style.transformOrigin = '0 50%';
    this._.position(x1, y1, z);
    this._.width(distance(x1, y1, x2, y2));
    this._.height(1);
    this._.div.style.transform = 'translate(0, -50%) rotateZ(' + angle(x1, y1, x2, y2) + 'deg)';
};

LINE.prototype.show = function() {
    this._.div.style.display = 'block';
    return this;
};

LINE.prototype.hide = function() {
    this._.div.style.display = 'none';
    return this;
};
module.exports = (_parent, _class, x1, y1, x2, y2, z) => new LINE(_parent, _class, x1, y1, x2, y2, z);
