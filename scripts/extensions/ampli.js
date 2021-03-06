//draw the waveform to the screen
function Ampli(){
	//visualization name
	this.name = "Amplitude";
	
	this.amplitudes = [];

	this.initializeAmpli = function() {
		for(var i = 0; i < 512; i++) {
		this.amplitudes.push(0);
		}
	}

	//draw the wave form to the screen
	this.draw = function() {
		push();
		noFill();
		var a = amplitude.getLevel();
		stroke(0, 255, 0);
		strokeWeight(2);

		beginShape();
		if (this.amplitudes.length == 0) {
			this.initializeAmpli();
		} else{
			//Add element to the end of the array
			this.amplitudes.push(a);
	
			//Remove the first element of the array
			this.amplitudes.shift();
	
			//Map the amplitude value to a larger number
			var d = map(a, 0, 0.15, 50, 250);
	
			//Draw a shape based on the amplitude
			noFill();
			strokeWeight(1);
			stroke(0,255,0);
			beginShape();
			for(var i = 0; i < this.amplitudes.length; i++){
				var h = map(this.amplitudes[i], 0, 0.15, 0, -150);
				vertex(i * 2, height / 2 + h);
			}
			endShape();
	
			//Draw amplitude as ellipse
			if (d <= 100) {
				stroke(0, 255, 0);
				strokeWeight(1);
				ellipse(width / 2,height / 4, d)
			}
			else if (d >= 101 && d <= 150) {
				stroke(255, 255, 0);
				strokeWeight(2);
				ellipse(width / 2, height / 4,d)
			}
			else if (d >= 151 && d <= 200){
				stroke(255, 69, 0);
				strokeWeight(2.5);
				ellipse(width / 2,height / 4, d)
			}
			else if (d >= 201 && d <= 250){
				stroke(0, 0, 255);
				strokeWeight(3);
				ellipse(width / 2, height / 4, d)
			}

		}
		endShape();
		pop();
	};
}