'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var zoom = require('../components');
var misc = require('../misc');

var margin = 12;

var colors = ['#aaff33', '#33ffaa', '#e7a6ef', '#ffb830', '#5fc5ff', '#815fff', '#ff00e4', '#f8e3a2', '#c6862b', '#82c62b', '#2bc6ab', '#ffdd54'];
var getRndValue = function getRndValue(v) {
    return Math.floor(Math.random() * v);
};
var reduceCoordinates = function reduceCoordinates(f) {
    return f.geometry && f.geometry.coordinates || [];
};
var getJSON = function getJSON(j, idx, length, blockSize, wBlock, parent) {
    return j.filter(function (f, i) {
        return i >= idx && i < length;
    }).map(function (f) {
        return misc.feature(reduceCoordinates(f), Math.random() * wBlock * blockSize, 0, colors[getRndValue(colors.length)], f, blockSize * 2.5, parent);
    });
};

var geo = void 0;
var player = void 0;
var newFeatures = void 0;

module.exports = {
    start: function start(data) {
        var callBack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        var clearedJSON = data.clearedJSON,
            xAxis = data.xAxis,
            yAxis = data.yAxis,
            keyboard = data.keyboard,
            display = data.display,
            wBlock = data.wBlock,
            base = data.base,
            width = data.width,
            height = data.height,
            score = data.score,
            blockSize = data.blockSize,
            parent = data.parent;

        var index = 0;
        newFeatures = [];
        geo = getJSON(clearedJSON, index, index + margin, blockSize, wBlock, parent);

        index = margin;

        player = misc.feature(reduceCoordinates(clearedJSON[getRndValue(clearedJSON.length)]), width / 2 - blockSize, blockSize, '#dddddd', { properties: { name: 'player' } }, blockSize * 2.5, parent);
        var colliderPlayer = zoom.collider({ elements: [player] });

        var currentTime = Date.now();
        var timer = new Date(currentTime + clearedJSON.length * 10000);
        var collider = zoom.collider({ elements: [].concat(_toConsumableArray(base)) });
        var colliderTouch = zoom.collider();
        var now = void 0;
        var distance = void 0;
        var cnt = 0;
        score.collected(cnt, clearedJSON.length);
        zoom.loop.play(function () {
            xAxis.coords(0, player._y + player._height / 2, width, player._y + player._height / 2);
            yAxis.coords(player._x + player._width / 2, 0, player._x + player._width / 2, height);
            now = new Date();
            distance = timer - now;
            score.time(Math.floor(distance / 1000));
            player.move({
                left: keyboard.get('a') || keyboard.get('A') || keyboard.get('ArrowLeft'),
                right: keyboard.get('d') || keyboard.get('D') || keyboard.get('ArrowRight'),
                up: keyboard.get('w') || keyboard.get('W') || keyboard.get('ArrowUp')
            });
            collider.use(player);
            colliderTouch.use(player);
            geo.forEach(function (f, i) {
                collider.use(f);
                colliderPlayer.use(f, function (collide, check) {
                    if (collide) {
                        if (check['p:0'] && check['p:1'] || check['p:1'] && check['p:2'] || check['p:1']) {
                            f.touch();
                            colliderTouch.add([f]);
                        }
                    }
                });
                f.auto([player].concat(_toConsumableArray(geo.filter(function (g, j) {
                    return i !== j;
                }))));
                if (f._y > height) {
                    f.y(-f._height);
                }
                if (f._y < -f._height) {
                    f.y(height - f._height);
                }
                if (f._x < 0) {
                    f.x(width - f._width);
                }
                if (f._x > width) {
                    f.x(0);
                }
            });
            if (player._y > height) {
                player.y(-player._height);
            }
            if (player._y < -player._height) {
                player.y(height - player._height);
            }
            if (player._x < -player._width) {
                player.x(width);
            }
            if (player._x > width) {
                player.x(-player._width);
            }
            geo.forEach(function (f) {
                if (f._removed) {
                    cnt++;
                    newFeatures.push(f._feature);
                    display.draw(reduceCoordinates(f._feature));
                    score.last(f.text.innerHTML);
                    score.collected(cnt, clearedJSON.length);
                }
            });
            geo = geo.filter(function (f) {
                return !f._removed;
            });
            var diff = margin - geo.length;
            if (diff > 0) {
                if (index + diff <= clearedJSON.length) {
                    geo = [].concat(_toConsumableArray(geo), _toConsumableArray(getJSON(clearedJSON, index, index + diff, blockSize, wBlock, parent)));
                    index = index + diff;
                }
            }
            callBack(Math.floor(distance / 1000), clearedJSON.length - cnt);
        });
    },
    stop: function stop() {
        var callBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        geo.forEach(function (f) {
            f.remove();
        });
        player.remove();
        zoom.loop.stop();
        callBack({ type: "FeatureCollection", features: newFeatures });
    }
};