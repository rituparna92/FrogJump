var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameOver, gameOverImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("images/water.jpg");
  coinImg = loadImage("images/coin.png");
  climberImg = loadImage("images/seaweed.png");
  frogImg = loadImage("images/frog.png");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  createCanvas(600,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  ocean.velocityY = -1.5;
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg); 
  
  gameOver = createSprite(300,225,50,50);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.visible = false;
  
  //create coin group and climber group
  climbersGroup = new Group();
  coinGroup = new Group();

  score = 0;
}

function draw(){
  background(0);
  drawSprites();
  fill("red")
  textSize(25);
  text("SCORE: "+ score, 250,50);
  frog.position.y += 4;

  if(frog.position.y >= 400) {
    ocean.velocityY = 0;
    gameOver.visible = true;
    gameState = "end";
  }


  if (gameState === "play") {
    if(keyDown("space") && frog.y >= 40){
      frog.position.y -= 15;
    }
    if(keyDown("left") && frog.x >=35) {
      frog.position.x -= 6;
    }
    if(keyDown("right") && frog.x <=557) {
      frog.position.x += 6;
    }
    spawnCoin();
    if(frog.isTouching(coinGroup)) {
      score++;
      coinGroup.destroyEach();
    }
    if(frog.isTouching(climbersGroup)) {
      frog.collide(climbersGroup);
    }
  }
  
  if (gameState === "end"){
    climbersGroup.destroyEach();
    coinGroup.destroyEach();
  }

  //infinity background
  if(ocean.position.y < 200){
    ocean.position.y = 300;
  }

}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 250 === 0) {
    //make the x position of the coin and climber the same
    coin = createSprite(Math.round(random(30,420),80,200,50));
    coin.addImage("coin", coinImg);
    coin.setVelocity(0, 2);
    coin.scale = 0.1;
    coinGroup.add(coin);

    climber = createSprite(coin.x, 80,200,50);
    climber.addImage("climber", climberImg);
    climber.setVelocity(0, 2);
    climber.scale = 0.3;
    climbersGroup.add(climber);
  }
}
