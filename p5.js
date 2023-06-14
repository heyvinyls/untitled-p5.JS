let osc, playing, freq, amp;
let capture;
var ctracker;


function setup() {
  let cnv = createCanvas(400, 225);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator(300);
   capture = createCapture(VIDEO);
  capture.size(400, 225);
  capture.hide();
  
  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(capture.elt);  

function draw (){
  background(220);
  image(capture, 0, 0);
  
  var positions = ctracker.getCurrentPosition();
 // let mouthDist; 
  if (positions){
    positions.forEach(pos =>{
      fill(225, 0, 0);
      noStroke();
      circle(pos[0], pos[1], 3);
    });
  }
  
  
const mouthTop = createVector(positions[60][0], positions,[60][1]);
const mouthBottom = createVector(positions[57][0], positions,[57][1]);
  
  const mouthDist = mouthTop.sub(mouthBottom).mag();
  //print(mouthDist);
  
  
  freq = constrain(map(mouthDist, 4, 17, 100, 500),100, 500)
  amp = constrain(map(mouthDist, 4, 17, 0, 0.5), 0, 1);
  
}
  
    //text('tap to play', 20, 20);
  //text('freq:'+ freq, 20, 40)
  //text('amp: ' + amp, 20, 60)
 

  if (playing){
    //smooth the transitions by 0.1 seconds 
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  } 
  

  function mouseReleased(){
    //ramp amplitude to 0 over 0.5 seconds 
  }
  
}


function playOscillator() {
  osc.start();
  osc.amp(0.5);
  // start at 700Hz
  osc.freq(700);
  // ramp to 60Hz over 0.7 seconds
  osc.freq(60, 0.7);
  osc.amp(0, 0.1, 0.7);
}
