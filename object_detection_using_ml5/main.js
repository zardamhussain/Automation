let f = 1;
let X = 640 / f, Y = 480 / f;

// let img;
let video;
let detector;
let detections = [];

function preload() {
    detector = ml5.objectDetector('cocossd', {});
}

function detectCallback(err, res) {
    if(err){
        console.log(res);
    }
    else {
        detections = res;
    }
    detector.detect(video, detectCallback);
}

function setup() {
    createCanvas(X, Y);
    video = createCapture(VIDEO, () => {
        video.size(X, Y);
        video.hide();
        detector.detect(video, detectCallback);
    });


}


function draw() {
    image(video, 0, 0);
    for(let i=0; i<detections.length; ++i) {
        let obj = detections[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(obj.x, obj.y, obj.width, obj.height);
        noStroke();
        fill(255);
        textSize(24);
        text(obj.label, obj.x+10, obj.y+25);
    }
}
