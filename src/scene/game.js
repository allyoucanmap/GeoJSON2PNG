const zoom = require('../components');
const misc = require('../misc');

const margin = 12;

const colors = [
    '#aaff33',
    '#33ffaa',
    '#e7a6ef',
    '#ffb830',
    '#5fc5ff',
    '#815fff',
    '#ff00e4',
    '#f8e3a2',
    '#c6862b',
    '#82c62b',
    '#2bc6ab',
    '#ffdd54'
];
const getRndValue = (v) => Math.floor(Math.random() * v);
const reduceCoordinates = f => {
    return f.geometry && f.geometry.coordinates || [];
};
const getJSON = (j, idx, length, blockSize, wBlock, parent) => j.filter((f, i) => i >= idx && i < length).map(f => {
    return misc.feature(reduceCoordinates(f), Math.random() * wBlock * blockSize, 0, colors[getRndValue(colors.length)], f, blockSize * 2.5, parent);
});

let geo;
let player;
let newFeatures;

module.exports = {
    start: (data, callBack = () => {}) => {
        const {clearedJSON, xAxis, yAxis, keyboard, display, wBlock, base, width, height, score, blockSize, parent} = data;
        let index = 0;
        newFeatures = [];
        geo = getJSON(clearedJSON, index, index + margin, blockSize, wBlock, parent);

        index = margin;

        player = misc.feature(reduceCoordinates(clearedJSON[getRndValue(clearedJSON.length)]), width / 2 - blockSize, blockSize, '#dddddd', {properties: {name: 'player'}}, blockSize * 2.5, parent);
        const colliderPlayer = zoom.collider({ elements: [player] });

        const currentTime = Date.now();
        const timer = new Date(currentTime + clearedJSON.length * 10000);
        const collider = zoom.collider({ elements: [...base] });
        const colliderTouch = zoom.collider();
        let now;
        let distance;
        let cnt = 0;
        score.collected(cnt, clearedJSON.length);
        zoom.loop.play(() => {
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
            geo.forEach((f, i) => {
                collider.use(f);
                colliderPlayer.use(f, (collide, check) => {
                    if (collide) {
                        if (check['p:0'] && check['p:1'] || check['p:1'] && check['p:2'] || check['p:1']) {
                            f.touch();
                            colliderTouch.add([f]);
                        }
                    }
                });
                f.auto([player, ...geo.filter((g, j) => i !== j)]);
                if (f._y > height) {
                    f.y(- f._height);
                }
                if (f._y < - f._height) {
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
                player.y(- player._height);
            }
            if (player._y < - player._height) {
                player.y(height - player._height);
            }
            if (player._x < - player._width) {
                player.x(width);
            }
            if (player._x > width) {
                player.x(- player._width);
            }
            geo.forEach(f => {
                if (f._removed) {
                    cnt++;
                    newFeatures.push(f._feature);
                    display.draw(reduceCoordinates(f._feature));
                    score.last(f.text.innerHTML);
                    score.collected(cnt, clearedJSON.length);
                }
            });
            geo = geo.filter(f => !f._removed);
            let diff = margin - geo.length;
            if (diff > 0) {
                if (index + diff <= clearedJSON.length) {
                    geo = [...geo, ...getJSON(clearedJSON, index, index + diff, blockSize, wBlock, parent)];
                    index = index + diff;
                }
            }
            callBack(Math.floor(distance / 1000), clearedJSON.length - cnt);
        });
    },
    stop: (callBack = () => {}) => {
        geo.forEach(f => {
            f.remove();
        });
        player.remove();
        zoom.loop.stop();
        callBack({type: "FeatureCollection", features: newFeatures});
    }
};
