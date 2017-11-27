'use strict';

var start = void 0;
var practice = void 0;
var exit = void 0;
var width = void 0;
var height = void 0;
var type = void 0;
module.exports = {
    set: function set(_parent, _width, _height) {
        width = _width;
        height = _height;

        start = document.createElement('div');
        start.style.position = 'absolute';
        start.style.left = width / 2 - height / 7 + 'px';
        start.style.top = height / 2.9 + 'px';
        start.style.width = height / 3.5 + 'px';
        start.style.height = height / 28 + 'px';
        start.style.fontWeight = 'bold';
        start.style.fontSize = height / 28 + 'px';
        start.style.textAlign = 'center';
        start.style.color = '#333333';
        start.style.opacity = 0.5;
        start.style.transition = '0.3s';
        start.onmouseover = function () {
            start.style.opacity = 1.0;
        };
        start.onmouseout = function () {
            start.style.opacity = 0.5;
        };
        start.style.cursor = 'pointer';
        start.style.fontFamily = 'monospace';
        start.style.display = 'none';
        start.innerHTML = 'START';
        _parent.appendChild(start);

        practice = document.createElement('div');
        practice.style.position = 'absolute';
        practice.style.left = width / 2 - height / 7 + 'px';
        practice.style.top = height / 2.9 + 'px';
        practice.style.width = height / 3.5 + 'px';
        practice.style.height = height / 28 + 'px';
        practice.style.fontWeight = 'bold';
        practice.style.fontSize = height / 28 + 'px';
        practice.style.textAlign = 'center';
        practice.style.color = '#333333';
        practice.style.opacity = 0.5;
        practice.style.transition = '0.3s';
        practice.onmouseover = function () {
            practice.style.opacity = 1.0;
        };
        practice.onmouseout = function () {
            practice.style.opacity = 0.5;
        };
        practice.style.cursor = 'pointer';
        practice.style.fontFamily = 'monospace';
        practice.innerHTML = 'PRACTICE';
        _parent.appendChild(practice);

        exit = document.createElement('div');
        exit.style.position = 'absolute';
        exit.style.left = width / 2 - height / 7 + 'px';
        exit.style.top = height / 9.5 + 'px';
        exit.style.width = height / 3.5 + 'px';
        exit.style.height = height / 28 + 'px';
        exit.style.fontWeight = 'bold';
        exit.style.fontSize = height / 28 + 'px';
        exit.style.textAlign = 'center';
        exit.style.color = '#333333';
        exit.style.opacity = 0.5;
        exit.style.transition = '0.3s';
        exit.onmouseover = function () {
            exit.style.opacity = 1.0;
        };
        exit.onmouseout = function () {
            exit.style.opacity = 0.5;
        };
        exit.style.cursor = 'pointer';
        exit.style.fontFamily = 'monospace';
        exit.style.display = 'none';
        exit.innerHTML = 'EXIT';
        type = 'practice';
        _parent.appendChild(exit);
    },
    mode: function mode(_mode) {
        if (_mode === 'start') {
            type = _mode;
            start.style.display = 'block';
            practice.style.display = 'none';
            exit.style.display = 'none';
        } else if (_mode === 'practice') {
            type = _mode;
            start.style.display = 'none';
            practice.style.display = 'block';
            exit.style.display = 'none';
        } else if (_mode === 'exit') {
            start.style.display = 'none';
            practice.style.display = 'none';
            exit.style.display = 'block';
        }
    },
    onclick: function onclick(_start, _stop) {
        start.onclick = function () {
            _start('start');
        };
        practice.onclick = function () {
            _start('practice');
        };
        exit.onclick = function () {
            _stop(type);
        };
    }
};