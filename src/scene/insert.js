let insert;
let parent;
let width;
let height;
module.exports = {
    set: (_parent, _width, _height) => {
        parent = _parent;
        width = _width;
        height = _height;
        insert = document.createElement('div');
        insert.innerHTML = 'insert geojson';
        insert.style.position = 'absolute';
        insert.style.left = width / 2 - height / 8 - height / 50 + 'px';
        insert.style.top = height / 4 + 'px';
        insert.style.width = height / 4 + 'px';
        insert.style.height = height / 28 + 'px';
        insert.style.lineHeight = height / 28 + 'px';
        insert.style.fontWeight = 'bold';
        insert.style.fontSize = height / 70 + 'px';
        insert.style.overflow = 'hidden';
        insert.style.fontFamily = 'monospace';
        insert.style.opacity = 0.5;
        insert.style.textAlign = 'center';
        insert.style.backgroundColor = '#f2f2f2';
        insert.style.color = '#333333';
        insert.style.borderTop =  height / 70 + 'px solid #aaaaaa';
        insert.style.borderRight =  height / 50 + 'px solid #777777';
        insert.style.borderLeft =  height / 50 + 'px solid #555555';
        insert.style.borderBottom =  height / 250 + 'px solid #555555';
        parent.appendChild(insert);
    },
    text: (text) => {
        insert.innerHTML = text;
    },
    show: () => {
        insert.style.display = 'block';
    },
    hide: () => {
        insert.style.display = 'none';
    }
};
