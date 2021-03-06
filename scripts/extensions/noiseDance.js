//draw the waveform to the screen
function NoiseDance() {
	//vis name
	this.name = "Noise";
	
	this.amplitudes = [];

	this.initializeAmpli = function() {
		for (var i = 0; i < 360; i++) {
		this.amplitudes.push(0);
		}
	}

	this.height = (height / 2) - 50;
	this.width = width/2;

	//draw the wave form to the screen
	this.draw = function(){
		if (sound.isPlaying()) {
			push();
			noFill();
			var a = amplitude.getLevel();
			stroke(0, 255, 0);
			strokeWeight(2);

			//Map the amplitude value to a larger number
			var d = map(a, 0, 0.15, 50, 250);

			//Get noise level
			var noiseLevel = noise(d);
			var noiseLevelMap = map(noiseLevel, 0, 1, 15, 60);

			beginShape();
			if (this.amplitudes.length == 0){
				this.initializeAmpli();
			} else {
				//Add element to the end of the array
				this.amplitudes.push(a);
		
				//Remove the first element of the array
				this.amplitudes.shift();
		
				//Draw a shape based on the amplitude
				noFill();
				strokeWeight(1);
				stroke(0,255,0);
				beginShape();
				for (var i = 0; i < 360; i++) {
					stroke(0, 255, 0);
					var angle = map(i, 0, 360, 0, Math.PI);
					var radius = map(this.amplitudes[i], 0, 0.15, 10, 500);
					var X = (width / 2) + radius * Math.cos(angle)
					var Y = (height / 2) + radius * Math.sin(angle)

					if (radius > 100) {
						stroke(255, 165, 0);
						vertex(X, Y);
					} else if ((radius > 101) && (radius < 150)) {
						stroke(255, 255, 0) 
						vertex(X, Y);
					} else if ((radius > 151) && (radius < 250)) {
						stroke(255, 0, 0)
						vertex(X, Y);
					} else if (radius > 251) {
						stroke(0, 0, 255)
						vertex(X, Y);
					}
				}
				endShape();

			}
			endShape();
			pop();
			push();
			//Initialize height of bubble
			if (this.height > 0) {
				this.height = this.height - random(1, 3)
			} else{
				this.height = (height / 2) - 50;
				this.width = width / 2 + random(-40, 40)
			}

			if ((frameCount % 400) > 100) {
				fill(random(10, 200), random(100, 255), random(50, 255));
				ellipse(this.width, this.height, noiseLevelMap);
			}

			pop();
		};
	}
}
