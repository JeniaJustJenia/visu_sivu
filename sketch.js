var song;
var fft;
let particles = [];
const num = 9000;
const noiseScale = 0.0099;


function preload(){
  song=loadSound("ComeWithMe.mp3");
}

function setup(){
  createCanvas(740,385);
  background (0,10);
  angleMode(DEGREES);
  song.loop();
  song.setVolume(0.5);
  fft=new p5.FFT(0.9,64);
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  
 stroke(255, 204, 0);
  //clear();
}


function draw(){
  background (0);
 // text(frameCount, width / 2, height / 2);
 

  for(let i = 0; i < num; i ++) {
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale );
    let a = 360 * n;
    p.x += cos(a);
    p.y += sin(a);
  if(!onScreen(p) && frameCount < 10000) {
    p.x = random(width);
   p.y = random(height);
   }
  }
  
  var spectrum = fft.analyze();
  translate(width/2, height/2);
  
 for(var i=0; i<spectrum.length;i++){
   var angle = map(i,0,spectrum.length,0,360);
   var amp = spectrum[i];
   var r = map(amp,0,26,0.01,55);
   var x = r*cos(angle);
   var y = r*sin(angle);
   noFill();
   ellipse(0,0,x,y);
 }

}
function mouseReleased() {
noiseSeed(millis());
}

function onScreen(v) {
 return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas('song', 'png');
}

