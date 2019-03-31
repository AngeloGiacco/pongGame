var ball;
var paddle1;
var paddle2;
var p1score;
var p2score;
var p1scoreP;
var p2scoreP;

function restart() {
  ball = new Ball();
  paddle1.x = 50;
  paddle2.x = width - 50;
  paddle1.y = height/2;
  paddle2.y = height/2;
  createText();
}

function createText() {
  winTextPlayer1 = createP('🎉🎉🎉 PLAYER 1 WON! 🎉🎉🎉');
  winTextPlayer1.style('display', 'none');
  winTextPlayer1.style('color', 'red');
  winTextPlayer1.position(width / 2 - 150, 100);
  winTextPlayer2 = createP('🎉🎉🎉 PLAYER 2 WON! 🎉🎉🎉');
  winTextPlayer2.style('display', 'none');
  winTextPlayer2.style('color', 'red');
  winTextPlayer2.position(width / 2 - 150, 100);
  instructionText = createP("Press space to Start, press up or down/w or s arrow to move");
  instructionText.style('display', 'none');
  instructionText.style('color', 'red');
  instructionText.position(width / 5, 100);
  p1scoreP = createP('Player1 Score:');
  p1scoreP.style('color', 'red');
  p1scoreP.position(width / 5, 125);
  p2scoreP = createP('Player2 Score:');
  p2scoreP.style('color', 'red');
  p2scoreP.position(width / 5 * 4, 125);
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
