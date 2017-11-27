const svg = require('./svg');
const xmlns = "http://www.w3.org/2000/svg";

const map = (val, v1, v2, v3, v4) => {
    return v3 + (v4 - v3) * ((val - v1) / (v2 - v1));
};

const size = (coords, width, height) => {
    const vmaxx = coords.reduce((a, b) => {
        return a[0] > b[0] ? a : b;
    });
    const vminx =  coords.reduce((a, b) => {
        return a[0] < b[0] ? a : b;
    });
    const vmaxy =  coords.reduce((a, b) => {
        return a[1] > b[1] ? a : b;
    });
    const vminy =  coords.reduce((a, b) => {
        return a[1] < b[1] ? a : b;
    });
    const maxx = vmaxx[0];
    const minx = vminx[0];
    const maxy = vmaxy[1];
    const miny = vminy[1];

    const deltaX = Math.abs(minx - maxx);
    const deltaY = Math.abs(maxy - miny);

    return deltaX > deltaY ?
      {maxx, minx, maxy, miny, width, height: width / (deltaX / deltaY)}
      :
      {maxx, minx, maxy, miny, width: height * (deltaX / deltaY), height};
};

const countArray = (count, array) => array.length && array.length > 0 ? countArray(count + 1, array[0]) : count;

const writePath = (coords, dimension, margin) => coords.reduce((a, b, i) => {
    const x = map(b[0], dimension.minx, dimension.maxx, margin, dimension.width - margin);
    const y = map(b[1], dimension.maxy, dimension.miny, margin, dimension.height - margin);
    if (i === 0) {
        return a + 'M' + x + ' ' + y + ' ';
    }
    if (i === coords.length - 1) {
        const close = b[0] === coords[0][0] && b[1] === coords[0][1] && ' Z' || '';
        return a + 'L' + x + ' ' + y + close;
    }
    return a + 'L' + x + ' ' + y + ' ';
}, '');

const draw = (coords, width, height, margin, count) => {
    if (coords.length === 0 || !count) {
        return {width, height, d: ['']};
    }
    if (count === 4) {
        const plainCoordinates = coords.reduce((a, b) => [...a, ...b.reduce((c, d) => [...c, ...d], [])], []);
        const dimension = size(plainCoordinates, width, height);
        const d = coords.map(c => c.reduce((a, b) => {
            return a + ' ' + writePath(b, dimension, margin);
        }, ''));
        return Object.assign(dimension, {d});
    }
    const plainCoordinates = coords.reduce((a, b) => [...a, ...b], []);
    const dimension = size(plainCoordinates, width, height);
    const d = coords.reduce((a, b) => {
        return a + ' ' + writePath(b, dimension, margin);
    }, '');
    return Object.assign(dimension, {d: [d]});
};
let id = 0;

const PATH = function(_options = {}, _parent = document.body, _class = '') {
    this._id = 'path:' + id;
    id++;
    this._ = svg({}, _parent, ' a-path' + _class);
    this._count = _options.coords && countArray(0, _options.coords);
    this._bbool = _options._bbool;
    if (this._bbool) {
        this.bounds = document.createElementNS(xmlns, 'path');
        this.bounds.setAttribute('stroke', '#000000');
        this.bounds.setAttribute('stroke-dasharray', '2 2');
        this.bounds.setAttribute('fill', 'none');
        this._.svg.appendChild(this.bounds);
    }
    this._d = _options.d;
    this._margin = _options.margin || 5;

    this.draw(_options.coords);
    this.position(_options.x, _options.y);
    this.fill(_options.fill);
    this.fillOpacity(_options.fillOpacity);
    this.stroke(_options.stroke);
    this.strokeWidth(_options.strokeWidth);
    this.size(_options.width, _options.height);

    this.element.forEach(el => {
        this._.svg.appendChild(el);
    });

    return this;
};

PATH.prototype.draw = function(coords = []) {
    this._count = coords && countArray(0, coords);
    if (this.element) {
        this.element.forEach(el => {
            this._.svg.removeChild(el);
        });
    }
    this.element = null;
    if (this._count === 4) {
        this.element = coords.map(() => document.createElementNS(xmlns, 'path'));
        this.element.forEach(el => { el.setAttributeNS(null, 'fill-rule', 'even-odd'); });
    } else {
        this.element = [document.createElementNS(xmlns, 'path')];
    }
    this.element.forEach(el => {
        this._.svg.appendChild(el);
    });
    this._coords = this._count === 2 ? [[...coords]] : [...coords];
    const _draw = draw(this._coords, this._._width, this._._height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.fill(this._fill);
    this.fillOpacity(this._fillOpacity);
    this.stroke(this._stroke);
    this.strokeWidth(this._strokeWidth);
    this.bbox();
    this.element.forEach((el, i) => {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.margin = function(margin = 5) {
    this._margin = margin;
    const _draw = draw(this._coords, this._._width, this._._height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach((el, i) => {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.position = function(x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this._.x(x);
    this._.y(y);
    this.bbox();
    return this;
};

PATH.prototype.x = function(x = 0) {
    this._x = x;
    this._.x(x);
    this.bbox();
    return this;
};

PATH.prototype.y = function(y = 0) {
    this._y = y;
    this._.y(y);
    this.bbox();
    return this;
};

PATH.prototype.size = function(width = 100, height = 100) {
    this._.width(width);
    this._.height(height);
    const _draw = draw(this._coords, width, height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach((el, i) => {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.width = function(width = 100) {
    this._.width(width);
    const _draw = draw(this._coords, width, this._._height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach((el, i) => {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.height = function(height = 100) {
    this._.height(height);
    const _draw = draw(this._coords, this._._width, height, this._margin, this._d);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach((el, i) => {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.bbox = function() {
    const x = this._x || 0;
    const y = this._y || 0;
    this._bbox = [
        [x, y],
        [x + this._width / 2, y],
        [x + this._width, y],
        [x + this._width, y + this._height / 2],
        [x + this._width, y + this._height],
        [x + this._width / 2, y + this._height],
        [x, y + this._height],
        [x, y + this._height / 2],
        [x, y]
    ];
    if (this._bbool) {
        this.bounds.setAttribute('d', draw([[...this._bbox]], this._._width, this._._height, 0, 3).d);
    }
    return this;
};

PATH.prototype.fill = function(color) {
    if (color) {
        this._fill = color;
        this.element.forEach(el => {
            el.setAttribute('fill', color);
        });
    }
    return this;
};

PATH.prototype.fillOpacity = function(opacity) {
    if (opacity) {
        this._fillOpacity = opacity;
        this.element.forEach(el => {
            el.setAttribute('fill-opacity', opacity);
        });
    }
    return this;
};

PATH.prototype.stroke = function(color) {
    if (color) {
        this._stroke = color;
        this.element.forEach(el => {
            el.setAttribute('stroke', color);
        });
    }
    return this;
};

PATH.prototype.strokeWidth = function(width) {

    if (width) {
        this._strokeWidth = width;
        this.element.forEach(el => {
            el.setAttribute('stroke-width', width);
        });
    }
    return this;
};

PATH.prototype.remove = function() {
    if (this._.svg.parentNode) {
        this.element.forEach(el => {
            this._.svg.removeChild(el);
        });
        this._.svg.parentNode.removeChild(this._.svg);
    }
    return this;
};

PATH.prototype.show = function() {
    this._.svg.style.display = 'block';
    return this;
};

PATH.prototype.hide = function() {
    this._.svg.style.display = 'none';
    return this;
};

module.exports = (_options, _parent, _class) => new PATH(_options, _parent, _class);
