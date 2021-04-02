//displays and handles clicks on the playback button.
function PlaybackButton() {
	
	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function() {
		if (isInitialized) {
			if (this.playing) {
				rect(this.x, this.y, this.width/2 - 2, this.height);
				rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
				textSize(16)
				noStroke();
				fill(255,100,0);
				text("Pause",this.x + ((this.width / 2) - 14), this.y + 40)
			} else {	
				triangle(this.x, this.y, this.x + this.width, this.y + (this.height / 2), this.x, this.y + this.height);
				textSize(16)
				fill(0,255,0);
				noStroke();
				text("Play",this.x + ((this.width / 2) - 14),this.y + 40)
			}
		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function() {
		if ( (mouseX > this.x && mouseX < this.x + this.width) && (mouseY > this.y && mouseY < this.y + this.height) ) {
			if (sound.isPlaying()) {
    			sound.pause();
  			} else if (isLoaded) {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
			return false;
	};

}