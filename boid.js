
class Boid {

    constructor(x, y) {

        this.element = document.createElement('DIV');
        this.element.classList.add('boid');
        canvas.appendChild(this.element);

        if (x && y) {
            this.pos = new Vector(x, y);
        } else {
            this.pos = new Vector(Math.random() * w, Math.random() * h);
        }

        this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
        this.acc = new Vector(0, 0);


        this.maxSpeed = 7;
        this.maxForce = 0.3;

    }


    seekingForce(target) {
        let desire = Vector.sub(target, this.pos);
        const maxSpeed = target.dist(this.pos); // max speed is bigger if target is farther
        desire.setMag(maxSpeed);
        desire.limit(20);
        let steering = Vector.sub(desire, this.vel);
        steering.limit(3);
        return steering;
    }


    repellingForce(target) {
        let rep = this.seekingForce(target, this.pos, this.vel);
        rep.mult(-1).mult(0.1);
        return rep;
    }

    addForce(force) {
        this.acc.add(force);
    }



    edges() {
        if (this.pos.x > w) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = w;
        }
        if (this.pos.y > h) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = h;
        }
    }

    align(boids) {
        const perceptionRadius = 50;
        let steering = new Vector(0, 0);
        let total = 0;
        for (let other of boids) {
            let d = this.pos.dist(other.pos);


            if (other != this && d < perceptionRadius) {
                steering.add(other.vel);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 50;
        let steering = new Vector(0, 0);
        let total = 0;
        for (let other of boids) {
            let d = this.pos.dist(other.pos);
            if (other != this && d < perceptionRadius) {
                let diff = Vector.sub(this.pos, other.pos);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 100;
        let steering = new Vector(0, 0);
        let total = 0;
        for (let other of boids) {
            let d = this.pos.dist(other.pos);
            if (other != this && d < perceptionRadius) {
                steering.add(other.pos);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        alignment.mult(1.2);
        cohesion.mult(0.9);
        separation.mult(1.3);

        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);
    }





    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);


    }

    show() {
        const theta = Math.round(this.vel.heading() / 6.14 * 360 * 5) / 5;
        translateEntity(
            this.element, { x: this.pos.x, y: this.pos.y, rotate: theta, center: true }
        );
    }


}