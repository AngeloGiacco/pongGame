//create ball class
//PVector
//bounce and display function

function Ball() {

  this.x = width/2 - 10;
  this.y = height/2;
  this.xv = random(4,7);
  this.yv = random(4,7);
  var change = random();
  if (change > 0.25 && change < 0.5) {
    this.yv *= -1;
  } else if (change > 0.5 && change < 0.75) {
    this.xv *= -1;
  } else if (change > 0.75) {
    this.yv *= -1;
    this.xv *= -1;
  }
  this.width = 32;
  this.height = 32;
  this.lives = 3;
  this.score = 0;
  this.pause = true;

  this.show = function() {
    fill(0,255,255);
    ellipse(this.x, this.y,this.width,this.height);
  }

  this.bounce = function() {
    if (this.y <= this.height / 2 ) {
      this.yv *= -1;
      this.y = this.height/2 + 4;
    } else if (this.y >= height - this.height / 2){
      this.y = height - this.height/2 - 4;
      this.yv *= -1;
    }
  }

  this.update = function() {
    this.x += this.xv;
    this.y += this.yv;
  }
}
