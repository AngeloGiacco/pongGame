var ball;
var paddle1;
var paddle2;

//must implement score function

function createText() {
  winTextPlayer1 = createP('🎉🎉🎉 PLAYER 1 WON! 🎉🎉🎉');
  winTextPlayer1.style('display', 'none');
  winTextPlayer1.style('color', 'red');
  winTextPlayer1.position(width / 2 - 150, 100);
  winTextPlayer2 = createP('🎉🎉🎉 PLAYER 2 WON! 🎉🎉🎉');
  winTextPlayer2.style('display', 'none');
  winTextPlayer2.style('color', 'red');
  winTextPlayer2.position(width / 2 - 150, 100);
  instructionText = createP("Press space to Start, press up or down/w or s arrow to move up or down");
  instructionText.style('display', 'none');
  instructionText.style('color', 'red');
  instructionText.position(width / 5, 100);
}

function rebound(b,p) {
  if (b.x <= p.x + p.w / 2 && b.x >= p.x - p.w / 2) {
    if (b.y >= p.y - p.h/2 && b.y <= p.y + p.h/2) {
      b.xv *= -1;
      if (b.y >= p.y + (p.h / 4) && b.yv <= 0) {
        b.yv *= -1;
      } else if (b.y <= p.y - (p.h / 4) && b.yv >= 0) {
        b.yv *= -1;
      }
    }
  }
}

function setup() {
  createCanvas(window.innerWidth - 350, 600);
  ball = new Ball();
  paddle = new Paddle(50,height/2);
  createText();
}

function draw() {
  background(0);
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
  fill(255);
  if (ball.pause) {
    instructionText.style('display', 'block');
  } else {
    instructionText.style('display', 'none');
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    paddle1.setVelocity(height/100);
  } else if (keyCode == UP_ARROW) {
    paddle1.setVelocity(-height/100);
  } else if (key == "w") {
    paddle2.setVelocity(-height/100);
  } else if (key == "s") {
    paddle2.setVelocity(height/100);
  }else if (key == " ") {
    if (ball.pause) {
      ball.pause = false;
    }else if (ball.won) {
      ball = new Ball();
      paddle1 = new Paddle(50,height/2);
      paddle2 = new Paddle(width-50, height/2);
      createText();
    }
  }
}

function keyReleased() { //check how this can be done with two keys pressed
  paddle.setVelocity(0);
}