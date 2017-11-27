
const DIV = function(_parent = document.body, _class = '') {
    this.div = document.createElement('div');
    this.div.setAttribute('class', 'a-div' + _class);
    this.div.style.position = 'absolute';
    this.div.style.fontFamily = 'monospace';
    this.size();
    this.position();
    this.color();
    _parent.appendChild(this.div);
    return this;
};

DIV.prototype.x = function(x = 0) {
    this._x = x;
    this.div.style.left = x + 'px';
    return this;
};

DIV.prototype.y = function(y = 0) {
    this._y = y;
    this.div.style.top = y + 'px';
    return this;
};

DIV.prototype.z = function(z = 0) {
    this.div.style.zIndex = z + 'px';
    return this;
};

DIV.prototype.width = function(width = 50) {
    this.div.style.width = width + 'px';
    return this;
};

DIV.prototype.height = function(height = 50) {
    this.div.style.height = height + 'px';
    return this;
};

DIV.prototype.position = function(x = 0, y = 0, z = 0) {
    this.x(x);
    this.y(y);
    this.z(z);
    return this;
};

DIV.prototype.size = function(width = 50, height = 50) {
    this.width(width);
    this.height(height);
    return this;
};

DIV.prototype.color = function(color = '#ddd') {
    this.div.style.backgroundColor = color;
    return this;
};

module.exports = (_parent, _class) => new DIV(_parent, _class);
