'use strict';

var zoom = require('../components');
var game = require('./game');
var print = require('./print');
var level = require('./level');
var score = require('./score');
var documentation = require('./documentation');
var insert = require('./insert');
var title = require('./title');
var start = require('./start');
var allyoucanmap = require('./allyoucanmap');
var json = require('../data/countries.geo.js');

var clearJSON = function clearJSON(j) {
    return j && j.features && j.features.filter(function (f) {
        return f.geometry && f.geometry.coordinates && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon');
    }) || [];
};
var GeoJSON2PNG = {
    init: function init() {
        var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        var parent = _parent;
        parent.style.position = 'absolute';
        parent.style.top = 0;
        parent.style.left = 0;
        parent.style.width = '100%';
        parent.style.height = '100%';
        parent.style.margin = 0;

        var wBlock = 58;
        var hBlock = 31;
        var width = parent.clientWidth / parent.clientHeight < 1856 / 992 ? parent.clientWidth : parent.clientHeight * (1856 / 992);
        var height = parent.clientWidth / parent.clientHeight < 1856 / 992 ? parent.clientWidth / (1856 / 992) : parent.clientHeight;
        var blockSize = width / wBlock;
        var txtTitle = 'GeoJSON2PNG';
        var keyboard = zoom.keyboard();
        var xAxis = zoom.line(parent);
        var yAxis = zoom.line(parent);
        var display = zoom.path({
            x: width / 2 - blockSize * 2.5,
            y: blockSize * 5,
            strokeWidth: 0.5,
            stroke: '#bbb',
            fill: 'transparent',
            width: blockSize * 5,
            height: blockSize * 5
        }, parent);

        insert.set(parent, width, height);
        title.set(parent, width, height);
        title.text(txtTitle);
        start.set(parent, width, height);
        score.set(parent, width, height);
        score.hide();
        documentation.set(parent, width, height);
        print.set(parent, width, height);
        allyoucanmap.set(parent, width, height);
        allyoucanmap.text('@allyoucanmap');
        var base = level.set(parent, blockSize, wBlock, hBlock, width, height);

        var coin = void 0;
        var parseFileUpload = function parseFileUpload(file) {
            if (file.type === 'application/json' || file.type === '') {
                var reader = new FileReader();
                reader.onload = function () {
                    try {
                        var clearedJSON = clearJSON(JSON.parse(this.result));
                        if (clearedJSON.length > 0) {
                            coin = clearedJSON;
                            insert.text(file.name);
                            start.mode('start');
                        } else {
                            coin = null;
                            insert.text('try with another geojson');
                            start.mode('practice');
                        }
                    } catch (e) {
                        coin = null;
                        insert.text('try with another geojson');
                        start.mode('practice');
                    }
                };
                reader.readAsText(file);
            } else {
                coin = null;
                insert.text('try with another geojson');
                start.mode('practice');
            }
        };

        var dropHandler = function dropHandler(ev) {
            ev.preventDefault();
            var dt = ev.dataTransfer;
            if (dt.items) {
                for (var i = 0; i < dt.items.length; i++) {
                    if (dt.items[i].kind === 'file') {
                        parseFileUpload(dt.items[i].getAsFile());
                    }
                }
            } else {
                for (var _i = 0; _i < dt.files.length; _i++) {
                    parseFileUpload(dt.files[_i]);
                }
            }
        };

        var dragOverHandler = function dragOverHandler(ev) {
            ev.preventDefault();
        };

        var dragEndHandler = function dragEndHandler(ev) {
            ev.preventDefault();
            var dt = ev.dataTransfer;
            if (dt.items) {
                dt.items.forEach(function (d, i) {
                    dt.remove(i);
                });
                for (var i = 0; i < dt.items.length; i++) {
                    dt.remove(i);
                }
            } else {
                dt.clearData();
            }
        };

        parent.ondrop = dropHandler;
        parent.ondragover = dragOverHandler;
        parent.ondragend = dragEndHandler;
        parent.style.overflow = 'hidden';

        start.onclick(function (type) {
            print.hide();
            documentation.hide();
            insert.hide();
            title.hide();
            score.show();
            display.show();
            xAxis.show();
            yAxis.show();
            start.mode('exit');
            parent.ondrop = function () {};
            parent.ondragover = function () {};
            parent.ondragend = function () {};
            var clearedJSON = type === 'practice' && clearJSON(json) || type === 'start' && coin || [];
            clearedJSON.sort(function () {
                return 0.5 - Math.random();
            });
            game.start({
                clearedJSON: clearedJSON,
                xAxis: xAxis,
                yAxis: yAxis,
                keyboard: keyboard,
                display: display,
                wBlock: wBlock,
                base: base,
                width: width,
                height: height,
                score: score,
                blockSize: blockSize,
                parent: parent
            }, function (time, count) {
                if (time > 0 && count === 0 || time <= 0) {
                    print.show();
                    documentation.show();
                    insert.show();
                    title.show();
                    score.hide();
                    display.hide();
                    xAxis.hide();
                    yAxis.hide();
                    start.mode(type);
                    parent.ondrop = dropHandler;
                    parent.ondragover = dragOverHandler;
                    parent.ondragend = dragEndHandler;
                    game.stop(function (file) {
                        print.canvas(file);
                    });
                }
            });
        }, function (type) {
            print.show();
            documentation.show();
            insert.show();
            title.show();
            score.hide();
            display.hide();
            xAxis.hide();
            yAxis.hide();
            start.mode(type);
            parent.ondrop = dropHandler;
            parent.ondragover = dragOverHandler;
            parent.ondragend = dragEndHandler;
            game.stop(function (file) {
                print.canvas(file);
            });
        });
    }
};
GeoJSON2PNG.init();

module.exports = GeoJSON2PNG;