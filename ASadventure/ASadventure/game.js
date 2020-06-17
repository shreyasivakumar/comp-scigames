
const levels = [
	//level 0
	["flag", "rock", "", "", "", 
	"fenceside", "rock", "", "", "rider",
	"", "tree", "animate", "animate", "animate", 
	"", "water", "", "", "",
	"", "fence", "", "horseup",""],
	
	//level 1
	["flag", "rock", "", "", "", 
	"fenceside", "water", "", "", "rider",
	"animate", "bridge animate", "animate", "animate", "animate", 
	"", "water", "", "", "",
	"", "water", "horseup", "",""],
	
	// level 2
	["tree", "tree", "flag", "tree", "tree", 
	"animate", "animate", "animate", "animate", "animate",
	"water", "bridge", "water", "water", "water", 
	"", "", "", "", "",
	"rider", "rock", "tree", "tree","horseup"],
	
	]; // end of levels
	
const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];
const numLevels = 3

var currentLevel = 0; //start level
var riderOn = false; //is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; //allows 1 animation per level
var widthOfBoard = Math.floor((document.getElementById("gameBoard").offsetWidth) / (document.getElementById("data").offsetWidth));
var gameOver = false;

//start game
window.addEventListener("load", function() {
	loadLevel();
});

document.addEventListener('keydown', function(e) {
	if(e.keycode == 37 || e.keycode == 38 || e.keycode == 39 || e.keycode == 40){
		switch (e.keycode) {
			case 37: // left arrow
				if(currentLocationOfHorse % widthOfBoard != 0){
					tryToMove("left");
				}
				break;
			case 38: //up arrow
				if(currentLocationOfHorse - widthOfBoard >= 0){
					tryToMove("up");
				}
				break;
			case 39: //right arrow
				if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
					tryToMove("right");

				}
				break;
			case 40: //down arrow
				if(currentLocationOfHorse + widthOfBoard < (widthOfBoard * widthOfBoard)){
					tryToMove("down");
				}
				break;
		}//switch
	}else{
		switch (e.which) {
			case 37: // left arrow
				if(currentLocationOfHorse % widthOfBoard != 0){
					tryToMove("left");
				}
				break;
			case 38: //up arrow
				if(currentLocationOfHorse - widthOfBoard >= 0){
					tryToMove("up");
				}
				break;
			case 39: //right arrow
				if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
					tryToMove("right");

				}
				break;
			case 40: //down arrow
				if(currentLocationOfHorse + widthOfBoard < (widthOfBoard * widthOfBoard)){
					tryToMove("down");
				}
				break;
		}//switch
	}//else
});//key event listener


function tryToMove(direction){
	if(!gameOver){

		//location before move
		let oldLocation = currentLocationOfHorse;

		//class of location before move
		let oldClassName = gridBoxes[oldLocation].className;

		let nextLocation = 0; //location we wish to move to
		let nextClass = ""; //class of location we wisht to move to

		let nextLocation2 = 0;
		let nextClass2 = "";

		let newClass = ""; //new class to switch to if move successful

		switch(direction){
			case "left":
				nextLocation = currentLocationOfHorse - 1;
				break;
			case "right":
				nextLocation = currentLocationOfHorse + 1;
				break;
			case "up":
	 			nextLocation = currentLocationOfHorse - widthOfBoard;
	 			break;
			case "down":
				nextLocation = currentLocationOfHorse + widthOfBoard;
				break;
		}//switch

		nextClass = gridBoxes[nextLocation].className;

		//if the obbstavle is not passable, don't move
		if(noPassObstacles.includes(nextClass)) { return; }

		//if it's a fences and there is no rider, don't move
		if(!riderOn && nextClass.includes("fence")) { return; }

		//if there is a fence, move two spaces with animation
		if(nextClass.includes("fence")){
			if((direction == "up" && !noPassObstacles.includes(gridBoxes[currentLocationOfHorse - (2 * widthOfBoard)].className)) ||
			   (direction == "down" && !noPassObstacles.includes(gridBoxes[currentLocationOfHorse + (2 * widthOfBoard)].className)) ||
			   (direction == "left" && !noPassObstacles.includes(gridBoxes[currentLocationOfHorse - 2].className)) ||
			   (direction == "right" && !noPassObstacles.includes(gridBoxes[currentLocationOfHorse + 2].className))){

				//rider must be on to jump
				if(riderOn){
					gridBoxes[currentLocationOfHorse].className = "";
					oldClassName = gridBoxes[nextLocation].className;

					//set values according to direction
					if(direction == "left"){
						nextClass = "jumpleft";
						nextClass2 = "riderleft";
						nextLocation2 = nextLocation - 1;
					} else if (direction == "right"){
						nextClass = "jumpright";
						nextClass2 = "riderright"
						nextLocation2 = nextLocation + 1;
					} else if (direction == "up"){
						nextClass = "jumpup";
						nextClass2 = "riderup"
						nextLocation2 = nextLocation - widthOfBoard;
					} else if (direction == "down"){
						nextClass = "jumpdown";
						nextClass2 = "riderdown"
						nextLocation2 = nextLocation + widthOfBoard;
					}//else if

					//show horse jumping
					gridBoxes[nextLocation].className = nextClass;
					setTimeout(function() {

						//set jump back to just a fence
						gridBoxes[nextLocation].className = oldClassName;

						//update current location of horse to be 2 spaces past take off
						currentLocationOfHorse = nextLocation2;

						//getclass of box after jump
						nextClass = gridBoxes[currentLocationOfHorse].className;

						//show horse and rider after landing 
						gridBoxes[currentLocationOfHorse].className = nextClass2;

						//if next box is a flag, go up a level
						levelUp(nextClass);

					}, 350);
				}//if
			}//if
			return;
		}//if

		// if there is a rider, add rider
		if(nextClass == "rider"){
			riderOn = true;
		}

		//if there is a bridge in the old location keep it 
		if(oldClassName.includes("bridge")){
			gridBoxes[oldLocation].className = "bridge";
		}else{
			gridBoxes[oldLocation].className = ""
		}//else

		//build name of new class
		newClass = (riderOn) ? "rider" : "horse";
		newClass += direction;
		console.log(direction)
		
		if(gridBoxes[nextLocation].classList.contains("bridge")){
			newClass += " bridge";
		}//if

		//move 1 space
		currentLocationOfHorse = nextLocation;
		gridBoxes[currentLocationOfHorse].className = newClass;

		// if it is an enemy
		if(nextClass.includes("enemy")){
			document.getElementById("lose").style.display = "Block";
			gameOver = true;
			return;
		}

		//move up to next level if needed
		levelUp(nextClass);
	}//if

}//tryToMove

//move up a level
function levelUp(nextClass){
	if(nextClass == "flag" && riderOn){

		//check if the game has finished
		if(currentLevel + 1 < numLevels){
			document.getElementById("levelup").style.display = "block";
			clearTimeout(currentAnimation);
			setTimeout (function(){
				document.getElementById("levelup").style.display = "none";
				currentLevel++;
				loadLevel();
			}, 1000);
		}else{
			document.getElementById("win").style.display = "block";
			gameOver = true;
		}//else			
	}//if
}//levelUp


function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;

	//load board
	for(i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("up")) {
			currentLocationOfHorse = i;
		}//if
	}//for

	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes, 0, "right");
}//loadLevel


function animateEnemy(boxes, index, direction){
	if(!gameOver){

		//exitfunction if no animation
		if(boxes.length <= 0) {return;}

		//update Images
		if(direction == "right"){
			boxes[index].classList.add("enemyright");
		} else if(direction == "left"){
			boxes[index].classList.add("enemyleft");
		} else if(direction == "up"){
			boxes[index].classList.add("enemyup");
		} else{
			boxes[index].classList.add("enemydown");
		}//else

		//if player is there they loose		
		if(((boxes[index].className.includes("riderleft") || boxes[index].className.includes("riderright") || boxes[index].className.includes("riderup") || boxes[index].className.includes("riderdown")) || 
			(boxes[index].className.includes("left ") || boxes[index].className.includes("right ") || boxes[index].className.includes("up ") || boxes[index].className.includes("down "))) && 
			(boxes[index].className.includes("enemy"))){
			document.getElementById("lose").style.display = "Block";
			gameOver = true;

			//remove images from other boxes
			for(i = 0; i < boxes.length; i++){
				if(i != index){
					boxes[i].classList.remove("enemyleft");
					boxes[i].classList.remove("enemyright");
					boxes[i].classList.remove("enemyup");
					boxes[i].classList.remove("enemydown");
				}//if
			}//for

			return;
		}//if


		//remove images from other boxes
		for(i = 0; i < boxes.length; i++){
			if(i != index){
				boxes[i].classList.remove("enemyleft");
				boxes[i].classList.remove("enemyright");
				boxes[i].classList.remove("enemyup");
				boxes[i].classList.remove("enemydown");
			}//if
		}//for

		if(direction == "right"){
			//turn around if hit right side
			if(index == boxes.length - 1){
				index--;
				direction = "left";
			} else {
				index++;
			}//else
		} else if(direction == "left"){
			if(index == 0){
				index++;
				direction = "right";
			}else{
				index--;
			}//else
		} else if(direction == "up"){
			if(index == 0){
				index++;
				direction = "down";
			}else{
				index--;
			}//else
		} else if(direction == "down"){
			if(index == boxes.length - 1){
				index--;
				direction = "up"
			}else{
				index++;
			}
		}//else if

		currentAnimation = setTimeout(function() {
			animateEnemy(boxes, index, direction);
		}, 750);
	};
}//animate Enemy
