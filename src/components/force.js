const FORCE = function(_options = {}) {
    this._element = _options.element || null;
    this._force = _options.force || 10;
    this._direction = _options.direction || 1;
    this._axis = _options.axis || 'x';
    this._mass = _options.mass || 10;
    this._increase = _options.increase || 0.05;
    this._decrease = _options.decrease ||  0.10;
    this._time = 0;
    this._limit = _options.limit || 100;
    this._stop = 0;
    return this;
};

FORCE.prototype.use = function(apply) {
    if (!this._element && !this._element[this._axis]) {
        return null;
    }
    if (apply) {

        this._current = this._element['_' + this._axis];
        this._element[this._axis](this._element['_' + this._axis] + this._time * this._force / this._mass);

        if (this._direction > 0) {
            if (this._time < this._increase * this._limit) {
                this._time += this._increase * this._direction;
            }
            if (this._current < this._previous) {
                this._time = 0;
            }
            if (this._current === this._previous) {
                this._stop += 1;
                if (this._stop > 50) {
                    this._time = 0;
                    this._stop = 0;
                }
            }
        } else {
            if (this._time > this._increase * -this._limit) {
                this._time += this._increase * this._direction;
            }
            if (this._current > this._previous) {
                this._time = 0;
            }
            if (this._current === this._previous) {
                this._stop += 1;
                if (this._stop > 50) {
                    this._time = 0;
                    this._stop = 0;
                }
            }
        }
        this._previous = this._current;
    } else {
        if (this._direction > 0) {
            if (this._time > 0) {
                this._time -= this._decrease;
                this._element[this._axis](this._element['_' + this._axis] + this._time * this._force / this._mass);
            } else {
                this._time = 0;
            }
        } else {
            if (this._time < 0) {
                this._time += this._decrease;
                this._element[this._axis](this._element['_' + this._axis] + this._time * this._force / this._mass);
            } else {
                this._time = 0;
            }
        }

    }
    return this;
};

module.exports = (_options) => new FORCE(_options);
