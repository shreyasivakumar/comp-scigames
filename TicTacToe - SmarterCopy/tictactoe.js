//global variables
let currentPlayer = "X";
let gameStatus =""; //"" - continue, "Tie", "X Wins", "O Wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six",
				"seven", "eight", "nine"];
let cb = []; //current board

//reset board and all variables (newgame function)

function newGame(){
	
	//reset board
	for(var i = 0; i < idNames.length; i++){
	document.getElementById(idNames[i]).innerHTML = "";
}//for

numTurns = 0;
gameStatus = "";
currentPlayer = "X";

changeVisibility("controls");

}//newGame

//computer chooses free box surrounding the box with an X
function computerTakeTurn(){
	
	let idName = "zero";
	
	//computer choose boxes to fill
	var a=1;
	do {
		
	
		do{
			
			
			if(document.getElementById(idNames[a-1]).innerHTML == "X"){
				if(a==1){
					if(document.getElementById("two").innerHTML == ""){
						idName="two";
					}else if(document.getElementById("four").innerHTML == ""){
						idName="four";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}
					
				}else if(a==2){
					if(document.getElementById("one").innerHTML == ""){
						idName="one";
					}else if(document.getElementById("three").innerHTML == ""){
						idName="three";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}
					
				}else if(a==3){
					if(document.getElementById("two").innerHTML == ""){
						idName="two";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}else if(document.getElementById("six").innerHTML == ""){
						idName="six";
					}
					
				}else if(a==4){
					if(document.getElementById("one").innerHTML == ""){
						idName="one";
					}else if(document.getElementById("seven").innerHTML == ""){
						idName="seven";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}
					
				}else if(a==5){
					if(document.getElementById("one").innerHTML == ""){
						idName="one";
				}else if (document.getElementById("two").innerHTML == ""){
						idName="two";
				}else if(document.getElementById("three").innerHTML == ""){
						idName="three";
				}else if(document.getElementById("four").innerHTML == ""){
						idName="four";
				}else if(document.getElementById("six").innerHTML == ""){
						idName="six";
				}else if(document.getElementById("seven").innerHTML == ""){
						idName="seven";
				}else if(document.getElementById("eight").innerHTML == ""){
						idName="eight";
				}else if(document.getElementById("nine").innerHTML == ""){
						idName="nine";
				}
					
				}else if(a==6){
					if(document.getElementById("two").innerHTML == ""){
						idName="two";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}else if(document.getElementById("nine").innerHTML == ""){
						idName="nine";
					}
					
				}else if(a==7){
					if(document.getElementById("four").innerHTML == ""){
						idName="four";
					}else if(document.getElementById("eight").innerHTML == ""){
						idName="eight";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}
					
				}else if(a==8){
					if(document.getElementById("seven").innerHTML == ""){
						idName="seven";
					}else if(document.getElementById("nine").innerHTML == ""){
						idName="nine";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}
					
				}else if(a==9){
					if(document.getElementById("six").innerHTML == ""){
						idName="six";
					}else if(document.getElementById("eight").innerHTML == ""){
						idName="eight";
					}else if(document.getElementById("five").innerHTML == ""){
						idName="five";
					}
					
				}
			}
			
				a++;
				
		}while(idName == "zero");
		
		
	//check to see if box is empty
	if(document.getElementById(idName).innerHTML == ""){
		document.getElementById(idName).innerHTML = currentPlayer;
				
		break;
	}//if
	}while(true);
}//computerTakeTurn

// take player turn
function playerTakeTurn(e){

if (e.innerHTML == "") {
 e.innerHTML = currentPlayer;
 checkGameStatus();
 
 //if game isnt over, computer goes
 if(gameStatus == ""){
	 setTimeout(function(){
		 computerTakeTurn();
		 checkGameStatus();
	 }, 500
	 );
 }//if
  
} else {
showLightBox("This box is already selected.", "Please select another.");
return;
}// else
	
}//playerTakeTurn


//after each turn, check for win, tie, or keep playing
function checkGameStatus() {
numTurns++; //count number ofturns

//check for win
if (checkWin()) {
gameStatus = currentPlayer + " wins!";
}

// check for tie/win on 9th turn
if (numTurns == 9 && checkWin()) {
gameStatus = currentPlayer + " wins!";
}else{
if (numTurns == 9){
gameStatus = "Tie game!";
}//if
}//else


currentPlayer = (currentPlayer == "X" ? "O" : "X" );

// game is over
if (gameStatus != "") {
setTimeout(function(){showLightBox(gameStatus, "Game Over.");}, 500);

}
}//checkGameStatus

// check for a Win, there are 8 win patterns
function checkWin () {

cb[0] = ""; // not going to use
cb[1] = document.getElementById("one").innerHTML;
cb[2] = document.getElementById("two").innerHTML;
cb[3] = document.getElementById("three").innerHTML;
cb[4] = document.getElementById("four").innerHTML;
cb[5] = document.getElementById("five").innerHTML;
cb[6] = document.getElementById("six").innerHTML;
cb[7] = document.getElementById("seven").innerHTML;
cb[8] = document.getElementById("eight").innerHTML;
cb[9] = document.getElementById("nine").innerHTML;


// top row
if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
return true;
}

// middle row
if (cb[4] != "" && cb[4] == cb [5] && cb [5] == cb[6]) {
return true;
}

//bottom row
if (cb[7] != "" && cb[7] == cb [8] && cb [8] == cb[9]) {
return true;
}
//diagonal starting top left
if (cb[1] != "" && cb[1] == cb [5] && cb [5] == cb[9]) {
return true;
}
//diagonal starting top right
if (cb[3] != "" && cb[3] == cb [5] && cb [5] == cb[7]) {
return true;
}
//left vertical
if (cb[1] != "" && cb[1] == cb [4] && cb [4] == cb[7]) {
return true;
}
//middle vertical
if (cb[2] != "" && cb[2] == cb [5] && cb [5] == cb[8]) {
return true;
}
//right vertical
if (cb[3] != "" && cb[3] == cb [6] && cb [6] == cb[9]) {
return true;
}

}//checkWin

//change the visibility of ID
function changeVisibility(divID) {
var element = document.getElementById(divID);

//if element exists, it is considered true
if (element) {
element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
}//if
}//changeVisibility

// display in lightbox
function showLightBox(message, message2) {

//set messages
document.getElementById("message").innerHTML = message;
document.getElementById("message2").innerHTML = message2;

// show lightbox
changeVisibility("lightbox");
changeVisibility("boundaryMessage");
}//showlightbox

//close light box
function continueGame() {
changeVisibility("lightbox");
changeVisibility("boundaryMessage");

//if the game is over, show controls
if(gameStatus != ""){
	changeVisibility("controls");
}//if
}//continueGame







