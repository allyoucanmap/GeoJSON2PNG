'use strict';

var zoom = require('../components');

var base = [];
var blockSize = void 0;
var wBlock = void 0;
var hBlock = void 0;
var parent = void 0;
var pathBlock = function pathBlock(x, y) {
    return zoom.path({
        width: blockSize,
        height: blockSize,
        x: x,
        y: y,
        coords: [[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]],
        stroke: '#333333',
        strokeWidth: blockSize / 40,
        fill: 'transparent',
        _bbool: true,
        margin: blockSize / 10
    }, parent);
};

module.exports = {
    set: function set(_parent, _blockSize, _wBlock, _hBlock, width, height) {
        blockSize = _blockSize;
        wBlock = _wBlock;
        hBlock = _hBlock;
        parent = _parent;
        var bottom = document.createElement('div');
        bottom.style.position = 'absolute';
        bottom.style.left = 0 + 'px';
        bottom.style.top = height + 'px';
        bottom.style.width = width + 'px';
        bottom.style.height = 9999 + 'px';
        bottom.style.backgroundColor = '#333333';
        bottom.style.zIndex = 9999;
        _parent.appendChild(bottom);
        var right = document.createElement('div');
        right.style.position = 'absolute';
        right.style.left = width + 'px';
        right.style.top = 0 + 'px';
        right.style.width = 9999 + 'px';
        right.style.height = height + 9999 + 'px';
        right.style.backgroundColor = '#333333';
        right.style.zIndex = 9999;
        _parent.appendChild(right);
        for (var y = 0; y < 1; y++) {
            for (var x = -Math.floor(wBlock / 4); x < wBlock + Math.floor(wBlock / 4); x++) {
                if (x < wBlock * 3 / 4 - 1 && x > wBlock / 4) {
                    base.push(pathBlock(x * blockSize, y * blockSize + (hBlock - 1) * blockSize));
                    base.push(pathBlock(x * blockSize, 0));
                }

                if (x > wBlock * 3 / 4 - 1) {
                    base.push(pathBlock(x * blockSize, Math.floor(hBlock / 3) * blockSize));
                }

                if (x > wBlock * 2 / 3) {
                    base.push(pathBlock(x * blockSize, Math.floor(hBlock * 2 / 3) * blockSize));
                }

                if (x > wBlock * 3 / 8 - 1 && x < wBlock * 5 / 8) {
                    base.push(pathBlock(x * blockSize, Math.floor(hBlock / 2) * blockSize));
                }

                if (x < wBlock / 4) {
                    base.push(pathBlock(x * blockSize, Math.floor(hBlock / 3) * blockSize));
                }

                if (x < wBlock / 3 - 1) {
                    base.push(pathBlock(x * blockSize, Math.floor(hBlock * 2 / 3) * blockSize));
                }
            }
        }

        for (var _y = -Math.floor(hBlock / 4); _y < hBlock + Math.floor(hBlock / 4); _y++) {
            for (var _x = 0; _x < 1; _x++) {
                if (_y > Math.floor(hBlock * 2 / 3) || _y < Math.floor(hBlock * 2 / 3) - 3 && _y > Math.floor(hBlock / 3) || _y < Math.floor(hBlock / 3) - 3) {
                    base.push(pathBlock(0, _y * blockSize));
                    base.push(pathBlock((wBlock - 1) * blockSize, _y * blockSize));
                }
            }
        }
        return base;
    }
};