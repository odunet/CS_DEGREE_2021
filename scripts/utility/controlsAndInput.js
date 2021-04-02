//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {
	
	this.menuDisplayed = false;

	//Initialize variabble for menu notification movement
	this.scrollVariable = 430;
	
	//The file input button in the top left of the screen
	this.loadmusic = new LoadMusic();

	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed with double click
	this.doublePressed = function() {
		let fs = fullscreen();
		fullscreen(!fs);
	};

	//Check if playpack was hit with single click
	this.mousePressed = function() {
		//check if the playback button has been clicked
		if (this.playbackButton.hitCheck()) {
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode) {
		if(keycode == 32) {
			this.menuDisplayed = !this.menuDisplayed;
		}

		if((keycode > 48) && (keycode < 61)){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function() {
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);

		//playback button 
		this.playbackButton.draw();

		//input button 
		this.loadmusic.draw();

		//Set text size
		textSize(34);
		
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed) {

			//Draw rectangle around the menu button
			fill(10, 38, 92, 100);
			rect(85, 2, 360, 340);

			//Print Menu Bar
			fill(0,0,0);
			text("Select a visualisation:", 100, 30);

			this.scrollVariable = this.scrollVariable + 1;
		
			if (this.scrollVariable < innerWidth) {
				textSize(15);
				text(" (To Select, Press Number Below or Drag Mouse on Option)", this.scrollVariable, 25)
			}
			else{
				this.scrollVariable = 430;
			}
			textSize(34);
			this.menu();

			//Change playing button
			if (this.loadmusic.playingChange == true) {
				this.playbackButton.playing = this.loadmusic.playingChange;
				console.log("test");
			}
			
			//input button 
			this.loadmusic.draw();

		}else{
			this.loadmusic.change();
		}

		pop();

		//This implements realtime visualization change when mouse is moved on display option
		for (var i = 0; i < vis.visuals.length; i++) {
			if (this.menuDisplayed) {
				if ((mouseX > 100 && mouseX < 300) && (mouseY > (50 + 30 * i) && mouseY < (70 + 35 * i))){
					vis.selectVisual(vis.visuals[i].name);
				}
			}
		}
	};

	this.menu = function(){
		//draw out menu items for each visualisation
		for (var i = 0; i < vis.visuals.length; i++) {
			text(`${i + 1}: ${vis.visuals[i].name}`, 100, 70 + i * 32);
		}
	};
}