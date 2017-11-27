
let start;
let practice;
let exit;
let width;
let height;
let type;
module.exports = {
    set: (_parent, _width, _height) => {
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
        start.onmouseover = () => {
            start.style.opacity =  1.0;
        };
        start.onmouseout = () => {
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
        practice.onmouseover = () => {
            practice.style.opacity =  1.0;
        };
        practice.onmouseout = () => {
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
        exit.onmouseover = () => {
            exit.style.opacity =  1.0;
        };
        exit.onmouseout = () => {
            exit.style.opacity = 0.5;
        };
        exit.style.cursor = 'pointer';
        exit.style.fontFamily = 'monospace';
        exit.style.display = 'none';
        exit.innerHTML = 'EXIT';
        type = 'practice';
        _parent.appendChild(exit);
    },
    mode: (_mode) => {
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
    onclick: (_start, _stop) => {
        start.onclick = () => {
            _start('start');
        };
        practice.onclick = () => {
            _start('practice');
        };
        exit.onclick = () => {
            _stop(type);
        };
    }
};
