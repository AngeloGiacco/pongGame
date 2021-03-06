var ball;
var paddle1;
var paddle2;
var p1score = 0;
var p2score = 0;
var won = false;

function restart() {
  ball = new Ball();
  paddle1.setY(height/2);
  paddle2.setY(height/2);
  createText();
}

function createText() {
  winTextPlayer1 = createP('🎉 PLAYER 1 WON!🎉');
  winTextPlayer1.style('display', 'none');
  winTextPlayer1.style('color', 'red');
  winTextPlayer1.position(width / 2, 125);
  winTextPlayer2 = createP('🎉PLAYER 2 WON!🎉');
  winTextPlayer2.style('display', 'none');
  winTextPlayer2.style('color', 'red');
  winTextPlayer2.position(width /2, 125);
  instructionText = createP("Press space to Start, press up or down/w or s arrow to move");
  instructionText.style('display', 'none');
  instructionText.style('color', 'red');
  instructionText.position(width / 5, 125);
  restartText = createP("Press enter to restart");
  restartText.style('display', 'none');
  restartText.style('color', 'red');
  restartText.position(width / 2, 180);
}

function rebound(b,p) {
  if (b.x <= p.x + p.w / 2 && b.x >= p.x - p.w / 2) {
    if (b.y >= p.y - p.h/2 && b.y <= p.y + p.h/2) {
      b.xv *= -1.05;
      if (b.y >= p.y + (p.h / 4) && b.yv <= 0) {
        b.yv *= -1.05;
      } else if (b.y <= p.y - (p.h / 4) && b.yv >= 0) {
        b.yv *= -1.05;
      }
    }
  }
}

function goal() {
  if (ball.x < 0) {
    restart();
    p2score += 1;
  } else if (ball.x > width) {
    restart();
    p1score += 1;
  }
}

function setup() {
  createCanvas(window.innerWidth/5*4, window.innerHeight / 3 * 2);
  ball = new Ball();
  paddle1 = new Paddle(50,height/2);
  paddle2 = new Paddle(width-50,height/2)
  createText();
}

function draw() {
  if (!won) {
    background(0);
    ball.show();
    if (!ball.pause) {
      ball.update();
    }
    ball.bounce();
    paddle1.show();
    paddle1.block();
    paddle1.move();
    paddle2.show();
    paddle2.block();
    paddle2.move();
    rebound(ball,paddle1);
    rebound(ball,paddle2);
    if (ball.pause) {
      instructionText.style('display', 'block');
    } else {
      instructionText.style('display', 'none');
    }
    changeVel();
    goal();
    document.getElementById("player1score").innerHTML = "Player1 score: "+p1score.toString();
    document.getElementById("player2score").innerHTML = "Player2 score: "+p2score.toString();
    if (p1score == 5) {
      background(0);
      paddle1.show();
      paddle2.show();
      winTextPlayer1.style('display', 'block');
      won = true;
    } else if (p2score == 5) {
      background(0);
      paddle1.show();
      paddle2.show();
      winTextPlayer2.style('display', 'block');
      won = true;
    }
  } else {
    //show restart text and include restart function in key pressed
    restartText.style("display","block");
  }
}

function changeVel() {
  if (keyIsDown(DOWN_ARROW) && keyIsDown(87)) {
    paddle1.setVelocity(-height/100);
    paddle2.setVelocity(height/100);
  } else if (keyIsDown(DOWN_ARROW) && keyIsDown(83)) {
    paddle1.setVelocity(height/100);
    paddle2.setVelocity(height/100);
  } else if (keyIsDown(UP_ARROW) && keyIsDown(87)) {
    paddle1.setVelocity(-height/100);
    paddle2.setVelocity(-height/100);
  } else if (keyIsDown(UP_ARROW) && keyIsDown(83)) {
    paddle1.setVelocity(height/100);
    paddle2.setVelocity(-height/100);
  } else if (keyIsDown(DOWN_ARROW)) {
    paddle1.setVelocity(0);
    paddle2.setVelocity(height/100);
  } else if (keyIsDown(UP_ARROW)) {
    paddle1.setVelocity(0);
    paddle2.setVelocity(-height/100);
  } else if (keyIsDown(87)) {
    paddle1.setVelocity(-height/100);
    paddle2.setVelocity(0);
  } else if (keyIsDown(83)) {
    paddle1.setVelocity(height/100);
    paddle2.setVelocity(0);
  } else if (key == " ") {
    ball.pause = false;
  } else {
    paddle1.setVelocity(0);
    paddle2.setVelocity(0);
  }
}

function keyPressed() {
  if (keyCode == ENTER && won == true) {
    p1score = 0;
    p2score = 0;
    won = false;
    restartText.style("display","none");
    winTextPlayer1.style('display', 'none');
    winTextPlayer2.style('display', 'none');
    restart();
  }
}
