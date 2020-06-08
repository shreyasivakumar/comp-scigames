//global variables
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var score1 = 0;
var score2 = 0;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

const speedRange = 2;
var speedMin = 2;

var bounce = new sound("splash.mp3");
var out = new sound("beep.mp3");

var slowDown1 = 2;
var slowDown2 = 2;

var takePoint1 = 1;
var takePoint2 = 1;

//used to control game start/stop
var controlPlay;

//move paddles
document.addEventListener('keydown', function(e) {  
  //console.log("key down " + e.keyCode)
  //paddle1
  if (e.keyCode == 87 || e.which == 87){ //w
      speedOfPaddle1 = -10;
  }//if
  if (e.keyCode == 83 || e.which == 83){ //s
      speedOfPaddle1 = 10;
  }//if

  //paddle2
  if (e.keyCode == 38 || e.which == 38){ //up arrow
      speedOfPaddle2 = -10;
  }//if
  if (e.keyCode == 40 || e.which == 40){ //down arrow
      speedOfPaddle2 = 10;
  }//if
 
  if (e.keyCode == 32 || e.which == 32){
    pauseGame();
  }//if
 
  //Slow ball down p1
  if (e.keyCode == 16 || e.which == 16){
    if (slowDown1 > 0) {
      speedMin = 2;
     
      slowDown1--;
      document.getElementById("slowDown1").innerHTML = slowDown1;
    }//innerif
  }//if
       
  //Slow ball down p2
  if (e.keyCode == 13 || e.which == 13){
    if (slowDown2 > 0) {
      speedMin = 2;
       
      slowDown2--;
      document.getElementById("slowDown2").innerHTML = slowDown2;
    }//innerif
  }//if
       
});

//stop paddles
document.addEventListener('keyup', function(e) {
  //console.log("key up " + e.keyCode)
  //paddle1
  if (e.keyCode == 87 || e.which == 87){ //w
      speedOfPaddle1 = 0;
  }//if
  if (e.keyCode == 83 || e.which == 83){ //s
      speedOfPaddle1 = 0;
  }//if

  //paddle2
  if (e.keyCode == 38 || e.which == 38){ //up arrow
      speedOfPaddle2 = 0;
  }//if
  if (e.keyCode == 40 || e.which == 40){ //down arrow
      speedOfPaddle2 = 0;
  }//if
});

//object constructor to play sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//start the ball movement
function startBall() {
  let direction = 1;
  topPositionOfBall = startTopPositionOfBall;
  leftPositionOfBall = startLeftPositionOfBall;

  //50% chance of starting in either direction (right or left)
  if (Math.random() < 0.5) {
      direction = 1;
  } else {
      direction = -1;
  }//else
 
  //ball gets faster with each round
  topSpeedOfBall = Math.random() * speedRange + speedMin;
  leftSpeedOfBall = direction * (Math.random() * speedRange + speedMin);
  speedMin++;
   
}//startBall

//updates location of paddles and ball
function show() {
  var i1 = 0;
  var i2 = 0;
 
  //update positions of elements
  positionOfPaddle1 += speedOfPaddle1;
  positionOfPaddle2 += speedOfPaddle2;
  topPositionOfBall += topSpeedOfBall;
  leftPositionOfBall += leftSpeedOfBall;

  //stop paddle from leaving top of gameboard
  //paddle1
  if (positionOfPaddle1 <= 0) {
    positionOfPaddle1 = 0;
  }//if

  //paddle2
  if (positionOfPaddle2 <= 0) {
    positionOfPaddle2 = 0;
  }//if

  //stop paddles from leaving bottom of gameboard
  if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
    positionOfPaddle1 = gameboardHeight - paddleHeight;
  }//if
  if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
    positionOfPaddle2 = gameboardHeight - paddleHeight;
  }//if

  //if ball hits top or bottom or bottom of gameboard, change direction
  if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
    topSpeedOfBall *= -1;
  }//if

  //ball on left edge of gameboard
  if (leftPositionOfBall <= paddleWidth) {
    //if ball hits left paddle, change direction
    if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
      bounce.play();
      leftSpeedOfBall *= -1;
      i1++;
    } else {
      out.play();
      startBall();
      score2++;
      document.getElementById("score2").innerHTML = score2;
    }//else
  }//if

  //ball on right edge of gameboard
  if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
    //if ball hits right paddle, change direction
    if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight) {
      bounce.play();
      leftSpeedOfBall *= -1;
      i2++;
    } else {
      out.play();
      startBall();
      score1++;
      document.getElementById("score1").innerHTML = score1;
    }//else
  }//if

  document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
  document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
  document.getElementById("ball").style.top = topPositionOfBall + "px";
  document.getElementById("ball").style.left = leftPositionOfBall + "px";
 
  //Stop game once a player reachers 10 points
  if (score1 == 10 || score2 == 10) {
    stopGame();
  }//if

}; //show

//resume game play
function resumeGame() {
  if (!controlPlay) {
    controlPlay = window.setInterval(show, 800/60)
  }//if
}//resumeGame

//pause game play
function pauseGame() {
  window.clearInterval(controlPlay);
  controlPlay = false;
}//pauseGame

//start game play
function startGame() {
  //reset scores, paddles, and ball locations
  score1 = 0;
  score2 = 0;
 
  positionOfPaddle1 = startPositionOfPaddle1;
  positionOfPaddle2 = startPositionOfPaddle2;
 
  startBall();
 
  if (!controlPlay) {
    controlPlay = window.setInterval(show, 800/60)
  }//if
}//startGame

//stop game play
function stopGame() {
  let message1 = "";
  let message2 = "";
 
  window.clearInterval(controlPlay);
  controlPlay = false;
 
  message1 = "It's a Tie Game!";
  message2 = "Both players had a score of " + score1;
 
  if (score2 > score1) {
    message1 = "Player 2 won with " + score2 + " points!";
    message2 = "Player 1 only had " + score1 + " points!";
  } else if (score1 > score2) {
     message1 = "Player 1 won with " + score1 + " points!";
     message2 = "Player 2 only had " + score2 + " points!";
  }
 
  showLightBox(message1, message2);
 
}//stopGame

//next instruction slide
function nextSlide(message, message2) {
  document.getElementById("message").innerHTML = "The Rules ";
  document.getElementById("message2").innerHTML = "Each player will control their paddle to hit a ball back and forth. The first player to 10 points wins! You get points when your opponent fails to send the ball over to your side. For this game, each player will have 1 chance to slow down the ball. To slow ball, Player 1 should press shift and Player 2 press enter.";
  changeVisibility("continue");
}



//change the visibility of ID
function changeVisibility(divID) {
  var element = document.getElementById(divID);

  //if element exists, it is considered true
  if (element) {
      element.className = (element.className == "hidden") ? "unhidden" : "hidden";
  } else {
    element.className = (element.className == "unhidden") ? "hidden" : "unhidden";
  }
}//changeVisibility

//display message in lightbox
function showLightBox(message, message2) {
  //set messages
  document.getElementById("message").innerHTML = message;
  document.getElementById("message2").innerHTML = message2;

  //show lightbox
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
}//showLightBox

//continues game
function continueGame() {    
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
}//continueGame



