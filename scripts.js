



let w = parseInt(window.innerWidth);
let h = parseInt(window.innerHeight);
let mouse_is_dragging = false;
const frameRate = 30;
let frameCount = 0;
let mouseX = w / 2, mouseY = h / 2;

window.addEventListener('resize', (e) => {
    w = parseInt(window.innerWidth);
    h = parseInt(window.innerHeight);
})


const canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.layerX;
    mouseY = e.layerY;
    if (mouse_is_dragging) {
        addBoidAtPosition(mouseX, mouseY);
    }
})

canvas.addEventListener('click', (e) => {
    addBoidAtPosition(mouseX, mouseY);
})
// canvas.addEventListener('mousedown', (e) => {
//     mouse_is_dragging = true;
// })

// canvas.addEventListener('mouseup', (e) => {
//     mouse_is_dragging = false;
// })




const target = new Vector(w / 3, h / 3);
let boids = [];
for (let i = 0; i < 100; i++) {
    addBoid();
}

setInterval(() => loop(), 1000 / frameRate);

function loop() {


    for (let i = 0; i < boids.length; i++) {

        const boid = boids[i];

        // const seek = boid.seekingForce(target);
        // boid.addForce(seek);
        // for (let j = 0; j < boids.length; j++) {
        //     if (boids[j] !== boids[i]) {
        //         if (boid.pos.dist(boids[j].pos) < 200) {
        //             const repel = boid.repellingForce(boids[j].pos);
        //             boid.addForce(repel);
        //         }
        //     }
        // }

        boid.edges();

        if (target.dist(boid.pos) < 100) {
            const repelmouse = boid.repellingForce(target);
            repelmouse.mult(20);
            boid.addForce(repelmouse);
        } else {

            boid.flock(boids);

        }


        boid.update();
        boid.show();


    }


    target.set(mouseX, mouseY);
    frameCount++;
}



function translateEntity(element, opts) {
    if (opts) {
        let t = '';

        if (opts.x && opts.y) {
            let x = opts.x;
            let y = opts.y;

            if (opts.center) {
                x -= (element.clientWidth / 2);
                y -= (element.clientHeight / 2);
            }
            t = `${t} translate(${x}px,${y}px )`;
        }

        if (opts.rotate) {
            let theta = opts.rotate;
            t = `${t} rotate(${theta}deg)`;
        }
        if (opts.scale) {
            let scale = opts.scale;
            t = `${t} scale(${scale})`;
        }
        element.style.transform = t;
    }


}

function addBoid() {
    const boid = new Boid();
    boids.push(boid)
}
function addBoidAtPosition(x, y) {
    const times = Math.ceil(Math.random() * 10);
    for (let i = 0; i < times; i++) {
        if (boids.length > 0) {
            let ind = Math.floor(boids.length * Math.random());
            let b = boids[ind];
            b.pos.x = x;
            b.pos.y = y;
        }
    }


}

