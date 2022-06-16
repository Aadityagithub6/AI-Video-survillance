objects=[];
var video="";
var Status="";
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();


}


function draw(){
image(video,0,0,500,500);

if(Status !=""){
objectDetector.detect(video,gotresults);

for(var i = 0 ; i<objects.length;i++){
    document.getElementById("status").innerHTML="status : objects detected";
    document.getElementById("num-of-obj").innerHTML="number of objects detected are :"+objects.length;

    fill('red');
    percent=floor(objects[i].confidence * 100);
    console.log(percent);
    text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("red");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

}
}


}


function start(){
    objectDetector = ml5.objectDetector('cocossd',modalloaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function modalloaded(){
    console.log("modal is loaded");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotresults(error,results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects=results;
}