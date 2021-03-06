//Inspiration from http://archive.gamedev.net/archive/reference/programming/features/beatdetection/
function Beats(){
	this.name = "Beat";

	this.sampleBuffer = [];

	this.fireworks = new Fireworks();

	this.draw = function() {
		push();
		var spectrum = fourier.analyze();
		// noStroke();
		
		fill(0,155,155)
		var sum = 0;
		for (var i = 0; i < spectrum.length; i++) {
			sum += spectrum[i] * spectrum[i];
		  }
		if (this.sampleBuffer.length == 60) {

			//Detect beat
			var sampleSum = 0;

			for (var i = 0; i < this.sampleBuffer.length; i++) {
				sampleSum += this.sampleBuffer[i];
			}

			var sampleAverage = sampleSum / this.sampleBuffer.length;

			//Get variance
			var varianceSum = 0;

			for (var i = 0; i < this.sampleBuffer.length; i++) {
				varianceSum += this.sampleBuffer[i] -sampleAverage;
			}

			var variance = varianceSum / this.sampleBuffer.length;

			var m = -0.15 / (25 - 200); //This is using euqation of a line.
			var b = 1 + (m * 200);
			var c = (m * variance) + b; 

			//Draw ellispe that detects beats.
			if (sum > (sampleAverage * c)) {
				//beat
				// fill(255, 0, 0);
				// ellipse(width/2, height/2, 100);
				this.fireworks.addFirework();
				this.fireworks.update(frameCount);
			}
			this.sampleBuffer.splice(0,1);
			this.sampleBuffer.push(sum);
		} else {
			this.sampleBuffer.push(sum);
		}

		pop();
	};
}
