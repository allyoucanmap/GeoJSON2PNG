const line = require('./line');

const coo = [[10, 20], [100, 200], [400, 500], [300, 300]];

const POLYLINE = function(_parent = document.body, _class = '') {
    this.lines = coo.map((c, i) => {
        return i < coo.length - 1 ? line(_parent, _class, coo[i][0], coo[i][1], coo[i + 1][0], coo[i + 1][1]) : null;
    }).filter(c => c);
    return this;
};

module.exports = (_parent, _class) => new POLYLINE(_parent, _class);
