'use strict';

var sign = void 0;
var width = void 0;
var height = void 0;
module.exports = {
    set: function set(_parent, _width, _height) {
        width = _width;
        height = _height;
        sign = document.createElement('a');
        sign.style.position = 'absolute';
        sign.style.left = (width - width / 16) / 2 + 'px';
        sign.style.top = height - height / 40 + 'px';
        sign.style.width = width / 16 + 'px';
        sign.style.height = height / 50 + 'px';
        sign.style.lineHeight = height / 50 + 'px';
        sign.style.fontSize = height / 80 + 'px';
        sign.style.fontWight = 'bold';
        sign.style.textAlign = 'center';
        sign.style.color = '#333333';
        sign.style.backgroundColor = '#ffffff';
        sign.style.display = 'block';
        sign.style.zIndex = 500;
        sign.style.fontFamily = 'monospace';
        _parent.appendChild(sign);
    },
    text: function text(_text) {
        sign.innerHTML = _text;
        sign.setAttribute('href', 'https://twitter.com/allyoucanmap');
    },
    show: function show() {
        sign.style.display = 'block';
    },
    hide: function hide() {
        sign.style.display = 'none';
    }
};