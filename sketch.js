var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImage,foodGroup;
var obstacle,obstacleImage,obstacleGroup;
var gameOver,gameOverImage;
var score;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(keyDown("space")&& player.y >= 295){
    player.velocityY = -15;
    }  

    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale += +0.01;
    }

    if(obstacleGroup.isTouching(player)){
      gameState = END;
      gameOver = createSprite(400,200,40,10);
      gameOver.addImage(gameOverImage);
      gameOver.scale = 0.5;
    }

  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
     
  }
  
  spawnFood();
  spawnObstacles();
  drawSprites();

  stroke("red");
  textSize(25);
  fill("black");
  text("score:"+score,600,50); 
}

function spawnFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(700,340,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX= -4;
    obstacle.debug=false;
    obstacle.setCollider("rectangle",-10,10,100,250);
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}