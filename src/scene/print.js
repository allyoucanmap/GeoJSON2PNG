
const countArray = (count, array) => array.length && array.length > 0 ? countArray(count + 1, array[0]) : count;

const size = (coords, width, height) => {
    const vmaxx = coords.reduce((a, b) => {
        return a[0] > b[0] ? a : b;
    });
    const vminx =  coords.reduce((a, b) => {
        return a[0] < b[0] ? a : b;
    });
    const vmaxy =  coords.reduce((a, b) => {
        return a[1] > b[1] ? a : b;
    });
    const vminy =  coords.reduce((a, b) => {
        return a[1] < b[1] ? a : b;
    });
    const maxx = vmaxx[0];
    const minx = vminx[0];
    const maxy = vmaxy[1];
    const miny = vminy[1];

    const deltaX = Math.abs(minx - maxx);
    const deltaY = Math.abs(maxy - miny);

    return deltaX > deltaY ?
      {maxx, minx, maxy, miny, width, height: width / (deltaX / deltaY), top: (width - width / (deltaX / deltaY)) / 2, left: 0}
      :
      {maxx, minx, maxy, miny, width: height * (deltaX / deltaY), height, top: 0, left: (height - height * (deltaX / deltaY)) / 2};
};

const map = (val, v1, v2, v3, v4) => {
    return v3 + (v4 - v3) * ((val - v1) / (v2 - v1));
};

const draw = (coordinates, ctx, dimension, fill, stroke, strokeWidth) => {
    coordinates.forEach(c => {
        ctx.beginPath();
        c.forEach((p, i) => {
            const x = map(p[0], dimension.minx, dimension.maxx, 0, dimension.width) + dimension.left;
            const y = map(p[1], dimension.maxy, dimension.miny, 0, dimension.height) + dimension.top;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else if (i === c.length - 1) {
                ctx.lineTo(x, y);
                ctx.closePath();
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.stroke();
        ctx.fill('evenodd');
    });
};

let canvas;
let box;
let ctx;
let width;
let height;
module.exports = {
    set: (_parent = document.body, _width, _height) => {
        width = _width;
        height = _height;
        canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.setAttribute('width', height / 3);
        canvas.setAttribute('height', height / 3);
        canvas.style.left = (width - height / 3) / 2 - height / 100 + 'px';
        canvas.style.top = height / 1.75 + 'px';

        canvas.style.width = height / 3 + 'px';
        canvas.style.height = height / 3 + 'px';
        canvas.style.padding = height / 100 + 'px';
        canvas.style.border = '1px dashed #777777';
        ctx = canvas.getContext('2d');
        _parent.appendChild(canvas);

        box = document.createElement('div');
        box.style.position = 'absolute';
        box.style.left = (width - height / 3) / 2 - height / 100  + 'px';
        box.style.top = height / 1.75 + 'px';
        box.style.width = height / 3 + height / 50 + 'px';
        box.style.height = height / 3 + height / 50  + 'px';
        box.style.lineHeight = height / 3 + 'px';
        box.style.fontFamily = 'monospace';
        box.innerHTML = 'PNG BOX';
        box.style.fontSize = height / 28 + 'px';
        box.style.textAlign = 'center';
        box.style.color = '#333333';
        box.style.opacity = 0.5;
        box.style.zIndex = 1500;
        _parent.appendChild(box);
    },
    hide: () => {
        canvas.style.display = 'none';
        box.style.display = 'none';
    },
    show: () => {
        canvas.style.display = 'block';
        box.style.display = 'block';
    },
    canvas: (json, fill = '#ffffff', stroke = '#333333', strokeWidth = 2) => {
        const features = json && json.features && json.features.length > 0 && json.features || null;
        ctx.clearRect(0, 0, height / 3, height / 3);
        box.style.display = 'block';
        if (features) {
            box.style.display = 'none';
            const plainCoordinates = features.reduce((a, b) => {
                const coordinates = b.geometry && b.geometry.coordinates || [];
                const count = countArray(0, coordinates);
                if (count === 3) {
                    return [...a, ...coordinates.reduce((c, d) => [...c, ...d], [])];
                } else if (count === 4) {
                    return [...a, ...coordinates.reduce((c, d) => [...c, ...d.reduce((e, f) => [...e, ...f], [])], [])];
                }
                return [...a];
            }, []);
            const dimension = size(plainCoordinates, height / 3, height / 3);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, height / 3, height / 3);
            features.forEach(f => {
                const coordinates = f.geometry && f.geometry.coordinates || [];
                const count = countArray(0, coordinates);
                if (count === 3) {
                    draw(coordinates, ctx, dimension, fill, stroke, strokeWidth);
                } else if (count === 4) {
                    coordinates.forEach(c => {
                        draw(c, ctx, dimension, fill, stroke, strokeWidth);
                    });
                }
            });
            canvas.style.cursor = 'pointer';
            canvas.onclick = () => {
                const href = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.setAttribute('href', href);
                a.setAttribute('download', 'GeoJSON2PNG.png');
                a.click();
            };
        }
    }
};
