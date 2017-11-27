const inside = (p, a) => {
    let ins = false;
    for (let i = 0, j = a.length - 1; i < a.length; j = i++) {
        if (a[i][1] > p[1] !== a[j][1] > p[1] && p[0] < (a[j][0] - a[i][0]) * (p[1] - a[i][1]) / (a[j][1] - a[i][1]) + a[i][0]) {
            ins = !ins;
        }
    }
    return ins;
};

const COLLIDER = function(_options = {}) {
    this._elements = _options.elements || null;
    return this;
};

COLLIDER.prototype.add = function(elements) {
    const currentElements = this._elements || [];
    this._elements = [...currentElements, ...elements] || null;
    return this;
};

COLLIDER.prototype.use = function(current, f = () => {}) {
    if (!this._elements) {
        return null;
    }
    this._elements = this._elements.filter(el => !el._removed);
    if (current && !current._touch) {
        this._elements.forEach(el => {

            if (el._id !== current._id) {
                let check = {};
                current._bbox.forEach((b, i) => {
                    if (inside(b, el._bbox)) {
                        check['p:' + i] = true;
                    }
                });
                if ( check['p:0'] && check['p:1'] || check['p:1'] && check['p:2'] || check['p:1']) {
                    current.y(el._y + el._height);
                    f(true, check);
                } else if ( check['p:2'] && check['p:3'] || check['p:3'] && check['p:4'] || check['p:3']) {
                    current.x(el._x - current._width);
                    f(true, check);
                } else if ( check['p:4'] && check['p:5'] || check['p:5'] && check['p:6'] || check['p:5']) {
                    current.y(el._y - current._height);
                    f(true, check);
                } else if ( check['p:6'] && check['p:7'] || check['p:7'] && check['p:0'] || check['p:7']) {
                    current.x(el._x + el._width);
                    f(true, check);
                }
            }

        });
    }
    return this;
};

module.exports = (_options) => new COLLIDER(_options);
