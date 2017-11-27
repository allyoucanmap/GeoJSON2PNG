
let time;
let collected;
let last;
let width;
let height;
module.exports = {
    set: (_parent, _width, _height) => {
        width = _width;
        height = _height;
        time = document.createElement('div');
        time.style.position = 'absolute';
        time.style.left = width / 2 - height / 7 + 'px';
        time.style.top = height / 28 + 'px';
        time.style.width = height / 3.5 + 'px';
        time.style.height = height / 28 + 'px';
        time.style.fontSize = height / 35 + 'px';
        time.style.textAlign = 'center';
        time.style.fontFamily = 'monospace';
        _parent.appendChild(time);

        collected = document.createElement('div');
        collected.style.position = 'absolute';
        collected.style.left = width / 2 - height / 7 + 'px';
        collected.style.top = height / 13 + 'px';
        collected.style.width = height / 3.5 + 'px';
        collected.style.height = height / 28 + 'px';
        collected.style.fontSize = height / 55 + 'px';
        collected.style.textAlign = 'center';
        collected.style.fontFamily = 'monospace';
        _parent.appendChild(collected);

        last = document.createElement('div');
        last.style.position = 'absolute';
        last.style.left = width / 2 - height / 7 + 'px';
        last.style.top = height / 4.2 + 'px';
        last.style.width = height / 3.5 + 'px';
        last.style.height = height / 28 + 'px';
        last.style.fontSize = height / 48 + 'px';
        last.style.textAlign = 'center';
        last.style.fontFamily = 'monospace';
        last.style.color = '#bbb';
        _parent.appendChild(last);
    },
    time: (value) => {
        time.innerHTML = value + ' sec';
    },
    collected: (count, length) => {
        collected.innerHTML = 'features ' + count + ' of ' + length;
    },
    last: (name) => {
        last.innerHTML = name;
    },
    hide: () => {
        time.style.display = 'none';
        collected.style.display = 'none';
        last.style.display = 'none';
    },
    show: () => {
        time.style.display = 'block';
        collected.style.display = 'block';
        last.style.display = 'block';
    }
};
