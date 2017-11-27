'use strict';

var documentation = void 0;
var overlay = void 0;
var width = void 0;
var height = void 0;
var open = false;

var openDocs = function openDocs() {
    open = !open;
    if (open) {
        documentation.style.display = 'none';
        overlay.style.display = 'block';
    } else {
        documentation.style.display = 'block';
        overlay.style.display = 'none';
    }
};
var h2 = function h2(text) {
    return '<h2 style="font-size:' + height / 40 + 'px; margin:' + height / 40 + 'px 0;">' + text + '</h2>';
};

var h3 = function h3(text) {
    return '<h3 style="font-size:' + height / 50 + 'px; margin:' + height / 50 + 'px 0;">' + text + '</h3>';
};

var p = function p(text) {
    return '<p style="font-size:' + height / 70 + 'px; margin:' + height / 70 + 'px 0;">' + text + '</p>';
};

module.exports = {
    set: function set() {
        var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        var _width = arguments[1];
        var _height = arguments[2];

        width = _width;
        height = _height;
        documentation = document.createElement('div');
        documentation.style.position = 'absolute';
        documentation.style.left = width / 2 - height / 7 + 'px';
        documentation.style.top = height / 2.5 + 'px';
        documentation.style.width = height / 3.5 + 'px';
        documentation.style.height = height / 28 + 'px';
        documentation.style.fontWeight = 'bold';
        documentation.style.fontSize = height / 28 + 'px';
        documentation.style.textAlign = 'center';
        documentation.style.color = '#333333';
        documentation.style.transition = '0.3s';
        documentation.style.opacity = 0.5;
        documentation.onmouseover = function () {
            documentation.style.opacity = 1.0;
        };
        documentation.onmouseout = function () {
            documentation.style.opacity = 0.5;
        };
        documentation.style.cursor = 'pointer';
        documentation.style.fontFamily = 'monospace';
        documentation.innerHTML = 'DOCUMENTATION';
        documentation.onclick = openDocs;
        _parent.appendChild(documentation);

        overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.display = 'none';
        overlay.style.left = 0 + 'px';
        overlay.style.top = 0 + 'px';
        overlay.style.zIndex = 2000;
        overlay.style.backgroundColor = 'rgba(52, 52, 52, 0.95)';
        overlay.style.overflowY = 'auto';
        overlay.style.color = '#f2f2f2';
        overlay.style.fontFamily = 'monospace';
        overlay.style.padding = height / 5 + 'px ' + width / 4 + 'px';
        overlay.innerHTML = '<div style="height:' + height * 3 / 5 + 'px;width:' + width * 2 / 4 + 'px;">' + h2('DOCUMENTATION') + h3("What's GeoJSON2PNG") + p('GeoJSON2PNG is a GeoJSON to PNG converter playground.') + h3('Interactions') + p('Drag and drop a GeoJSON file* (supported only Polygon and MultiPolygon geometries)') + p('Click on START to initialize a new game session') + p('Move your feature (grey feature named player)') + p('- press [W] or [Arrow Up] to move UP<br/>- press [A] or [Arrow Left] to move LEFT<br/>- press [D] or [Arrow Right] to move RIGHT') + p('Jump on top of a feature to catch it') + p('Retrieve your PNG file at the end of game session from PNG box') + p('* If you have not a GeoJSON file you can try the game by clicking on PRACTICE') + p(' _____ ') + p('Click to close the documentation') + '</div>';
        overlay.onclick = openDocs;
        _parent.appendChild(overlay);
    },
    show: function show() {
        documentation.style.display = 'block';
    },
    hide: function hide() {
        documentation.style.display = 'none';
    }
};