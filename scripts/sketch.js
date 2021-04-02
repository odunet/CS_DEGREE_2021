//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//Check is user wants to play
var isLoaded;
//A list of amplitude
var amplitude;
//A variable to make active play buttom
var isInitialized;
//A variable for the GUI object
var gui;
//A global amplitude variable for the noiseDanceManual constructor (p5.js GUI)
var amplitudeGUI;
//File input
var inputbtn 
var processFile

function preload() {
	//Initialize variable to check if sound is loaded
	isLoaded = false;

	sound = loadSound('./assets/stomper_reggae_bit.mp3', function(){
		isLoaded = true;
	});
	console.log(sound);
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(0);

	 //Initialize controls
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //calculate the waveform from the fft.
	 amplitude = new p5.Amplitude();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Ampli());
	 vis.add(new Needles());
	 vis.add(new NoiseDance());
	 vis.add(new NoiseDanceManual());
	 vis.add(new Beats());

	 //initialiaze play initializer
	 isInitialized = false;

	 //set framRate
	 frameRate(60);

}

function draw() {
	background(66, 129, 245);
	fill(255);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
	//Check with user to start sound
	if (!sound.isPlaying() && isInitialized==false) {
		textSize(16);
		text("press any key to begin",width/2, height/2);
	}

	//Show notification to guide user interaction
	if (frameCount % 50 > 25) {
		if (vis.selectedVisual.name == "Needles") {
			stroke(0);
			fill(0);
			textSize(14);
			text("Press Space Bar to show MENU and Double click to toggle full screen mode",width/2-150, height-20);
		} else {
			stroke(255);
			fill(255);
			textSize(14);
			text("Press Space Bar to show MENU and Double click to toggle full screen mode",width/2-150, height-20);
		}
	}

	//Shows a GUI using P5js GUI to manually change the amplitude on screen
	if (vis.selectedVisual.name == "NoiseManual" && gui == undefined) {
		var oneIter = 2;

		while (oneIter > 1) {
			// Create the GUI
			sliderRange(0, 0.15, 0.001);
			gui = createGui('Manual Amplitude Visualizer').setPosition(width - 220, 20);;
			gui.addGlobals('amplitudeGUI');
			oneIter -= 1;
		}

	}	else if (vis.selectedVisual.name == "NoiseManual" && gui != undefined) { //If Noise Manual is selected show GUI
			gui.show();
	}	else if (gui != undefined) { //If Noise Manual is not selected hide GUI
			gui.hide();
	}
}

function doubleClicked(){
	controls.doublePressed();
}

function mouseClicked() {
	controls.mousePressed();
}

function keyPressed() {
	controls.keyPressed(keyCode);
	isInitialized =true;
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
