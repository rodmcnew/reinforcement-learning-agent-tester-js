// Matrix holds a matrix
export default class Matrix {
    constructor(n, d) {
        // n is number of rows d is number of columns
        this.n = n;
        this.d = d;
        this.w = new Float64Array(n * d);
        this.dw = new Float64Array(n * d);
    }

    setFrom(arr) {
        for (var i = 0, n = arr.length; i < n; i++) {
            this.w[i] = arr[i];
        }
    }

    toJSON() {
        return {
            n: this.n,
            d: this.d,
            w: this.w
        };
    }

    fromJSON(json) {
        this.n = json.n;
        this.d = json.d;
        this.w = new Float64Array(this.n * this.d);
        this.dw = new Float64Array(this.n * this.d);
        for (var i = 0, n = this.n * this.d; i < n; i++) {
            this.w[i] = json.w[i]; // copy over weights
        }
    }
};
