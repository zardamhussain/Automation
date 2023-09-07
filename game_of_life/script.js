
const WIDTH = 1600;
const HEIGHT = 720;
const resolution = 20;
let map = [];
const rows = WIDTH / resolution;
const cols = HEIGHT / resolution;

let prevcount = 0;



function setup() {
    createCanvas(WIDTH, HEIGHT);
    map = make2dArray();
}

function make2dArray() {
    let ar = []
    for(let i=0; i<rows; ++i) {
        ar[i] = [];
        for(let j=0; j<cols; ++j) {
            ar[i][j] = floor(random(2));
        }
    }
    return ar;
}


function draw() {
    background(0);
    for(let i=0; i<rows; ++i) {
        for(let j=0; j<cols; ++j) {
            if(map[i][j] == 1){
                fill(255);
                rect(i*resolution, j*resolution, resolution, resolution);
            }
        }
    }

    let next = make2dArray();
    for(let i=0; i<rows; ++i) {
        for(let j=0; j<cols; ++j) {
            let c = count(map, i, j);
            if(map[i][j] == 0 && c == 3) next[i][j] = 1;
            else if(map[i][j] == 1 && (c < 2 || c > 3)) next[i][j] = 0;
            else next[i][j] = map[i][j];
        }
    }

    let c = 0;

    for(let i=0; i<rows; ++i) {
        for(let j=0; j<cols; ++j) {
            if(next[i][j] !== map[i][j]) {
                c++;
            }
        }
    }
    if(c*99 >= (rows*cols)) {}
    else {
        map = make2dArray();
    }


    map = next;

}

function count(map, x, y) {
    let sum = 0;

    for(let i=-1; i<2; ++i) {
        for(let j=-1; j<2; ++j) {
            sum  += map[(i + x + rows) % rows][(j + y + cols) % cols];
        }
    }

    return sum - map[x][y];
}
