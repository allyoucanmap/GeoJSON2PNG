const xmlns = "http://www.w3.org/2000/svg";

const SVG = function(_options, _parent = document.body, _class = '') {
    this.svg = document.createElementNS(xmlns, 'svg');
    this.svg.setAttribute('class', 'a-svg' + _class);
    this.svg.style.position = 'absolute';
    this.position(_options.x, _options.y);
    this.width(_options.width);
    this.height(_options.height);
    _parent.appendChild(this.svg);
    return this;
};

SVG.prototype.position = function(x = 0, y = 0) {
    this.x(x);
    this.y(y);
    return this;
};

SVG.prototype.x = function(x = 0) {
    this._x = x;
    this.svg.style.left = x + 'px';
    return this;
};

SVG.prototype.y = function(y = 0) {
    this._y = y;
    this.svg.style.top = y + 'px';
    return this;
};

SVG.prototype.width = function(width = 100) {
    this._width = width;
    this.svg.setAttribute('width', width);
    return this;
};

SVG.prototype.height = function(height = 100) {
    this._height = height;
    this.svg.setAttribute('height', height);
    return this;
};


module.exports = (_options, _parent, _class) => new SVG(_options, _parent, _class);
