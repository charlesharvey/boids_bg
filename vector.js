class Vector {
    constructor(x, y, z) {

        if (!z) {
            z = 0;
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }



    heading() {
        const h = Math.atan2(this.y, this.x);
        return h;
    }

    setHeading(theta) {
        const m = this.mag();
        this.x = m * Math.cos(theta);
        this.y = m * Math.sin(theta);
        return this;
    };

    magSq() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        return x * x + y * y + z * z;
    }

    mag() {
        return Math.sqrt(this.magSq());
    }

    setMag(m) {
        return this.normalize().mult(m);
    }

    normalize() {
        const len = this.mag();
        if (len !== 0) {
            this.mult(1 / len);
        }
        return this;
    }

    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    dist(v) {
        return v.copy().sub(this).mag();
    };




    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;

    }

    static add(a, b) {
        const x = a.x + b.x;
        const y = a.y + b.y;
        return new Vector(x, y);
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    static sub(a, b) {
        const x = a.x - b.x;
        const y = a.y - b.y;
        return new Vector(x, y);
    }


    mult(v) {
        if (typeof v === 'number') {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        } else {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        }
        return this;
    }

    div(v) {
        if (typeof v === 'number') {
            this.x /= v;
            this.y /= v;
            this.z /= v;
        } else {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
        }
        return this;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        if (z !== null && z !== undefined) {
            this.z = z;
        }
        return this;

    }



    limit(max) {

        const mSq = this.magSq();
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)).mult(max);
        }
        return this;

    }




}