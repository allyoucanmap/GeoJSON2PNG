
let animation = null;
let frame = null;
const play = function(loop = () => {}, fps = 60) {
    const draw = () => {
        animation = setTimeout(() => {
            frame = requestAnimationFrame(draw);
        }, 1000 / fps);
        loop();
    };
    draw();
};

const stop = function() {
    if (animation) {
        clearTimeout(animation);
        cancelAnimationFrame(frame);
    }
};

module.exports = {
    play,
    stop
};
