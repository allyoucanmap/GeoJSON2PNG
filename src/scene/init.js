const zoom = require('../components');
const game = require('./game');
const print = require('./print');
const level = require('./level');
const score = require('./score');
const documentation = require('./documentation');
const insert = require('./insert');
const title = require('./title');
const start = require('./start');
const allyoucanmap = require('./allyoucanmap');
const json = require('../data/countries.geo.js');

const clearJSON = j => j && j.features && j.features.filter(f => f.geometry && f.geometry.coordinates && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon')) || [];
const GeoJSON2PNG = {
    init: (_parent = document.body) => {
        const parent = _parent;
        parent.style.position = 'absolute';
        parent.style.top = 0;
        parent.style.left = 0;
        parent.style.width = '100%';
        parent.style.height = '100%';
        parent.style.margin = 0;

        const wBlock = 58;
        const hBlock = 31;
        const width = parent.clientWidth / parent.clientHeight  < 1856 / 992 ? parent.clientWidth : parent.clientHeight * (1856 / 992);
        const height = parent.clientWidth / parent.clientHeight  < 1856 / 992 ? parent.clientWidth / (1856 / 992) : parent.clientHeight;
        const blockSize = width / wBlock;
        const txtTitle = 'GeoJSON2PNG';
        const keyboard = zoom.keyboard();
        const xAxis = zoom.line(parent);
        const yAxis = zoom.line(parent);
        const display = zoom.path({
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
        const base = level.set(parent, blockSize, wBlock, hBlock, width, height);

        let coin;
        const parseFileUpload = file => {
            if (file.type === 'application/json' || file.type === '') {
                let reader = new FileReader();
                reader.onload = function() {
                    try {
                        let clearedJSON = clearJSON(JSON.parse(this.result));
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

        const dropHandler = ev => {
            ev.preventDefault();
            let dt = ev.dataTransfer;
            if (dt.items) {
                for (let i = 0; i < dt.items.length; i++) {
                    if (dt.items[i].kind === 'file') {
                        parseFileUpload(dt.items[i].getAsFile());
                    }
                }
            } else {
                for (let i = 0; i < dt.files.length; i++) {
                    parseFileUpload(dt.files[i]);
                }
            }
        };

        const dragOverHandler = ev => {
            ev.preventDefault();
        };

        const dragEndHandler = ev => {
            ev.preventDefault();
            let dt = ev.dataTransfer;
            if (dt.items) {
                dt.items.forEach((d, i) => {
                    dt.remove(i);
                });
                for (let i = 0; i < dt.items.length; i++) {
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

        start.onclick(
            (type) => {
                print.hide();
                documentation.hide();
                insert.hide();
                title.hide();
                score.show();
                display.show();
                xAxis.show();
                yAxis.show();
                start.mode('exit');
                parent.ondrop = () => {};
                parent.ondragover =  () => {};
                parent.ondragend =  () => {};
                const clearedJSON = type === 'practice' && clearJSON(json) || type === 'start' && coin || [];
                clearedJSON.sort(() => 0.5 - Math.random());
                game.start(
                    {
                        clearedJSON,
                        xAxis,
                        yAxis,
                        keyboard,
                        display,
                        wBlock,
                        base,
                        width,
                        height,
                        score,
                        blockSize,
                        parent
                    },
                    (time, count) => {
                        if (time > 0 && count === 0
                        || time <= 0) {
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
                            game.stop((file) => {
                                print.canvas(file);
                            });

                        }
                    }
                );
            },
            (type) => {
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
                game.stop((file) => {
                    print.canvas(file);
                });
            }
        );
    }
};
GeoJSON2PNG.init();

module.exports = GeoJSON2PNG;
