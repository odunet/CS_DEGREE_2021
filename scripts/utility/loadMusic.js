//displays and handles clicks on the playback button.
function LoadMusic() {
	
	this.x = 160;
	this.y = 290;
	this.width = 20;
	this.height = 20;
	this.playingChange = false;

	this.change = function() {
		inputbtn.position(-300, this.y + 30);
		fill(0);
	}

	this.processFile = function(file) {
		console.log(file);

		sound.pause();
		isLoaded = false;
		this.playingChange = true;
		

		if (file.type == "audio") {
			sound = loadSound(file.data, function(){
				isLoaded = true;
				console.log(sound);
			});
		}
	}

	inputbtn = createFileInput(this.processFile);

	this.draw = function() {
		if (isInitialized) {
			textSize(18);
			fill(0);
			inputbtn.position(this.x, this.y + 20);
		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function() {
		if ( (mouseX > this.x && mouseX < this.x + this.width) && (mouseY > this.y && mouseY < this.y + this.height) ) {
			console.log("text");

  			// this.playing = !this.playing;
 
		}
	};

}