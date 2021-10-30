var PLAY = 1;
var END = 0;
var score=0;
var gameState = PLAY;
var gameState = END;



var backgroundImg;
var background;
var donkey;
var donkeyImg;
var ground;
var obstacle;
var obstacleImg;
var obstacleGroup;
var gameOver, restart;





function preload(){
backgroundImg = loadImage("background.jpg");
donkeyImg = loadImage("donkey.png");
obstacleImg = loadImage("obstacle.png");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

}

function setup() {
createCanvas(600,400);
donkey = createSprite(100,310,40,40);
donkey.addImage(donkeyImg);
donkey.scale = 0.5;

// obstacle = createSprite(250,340,30,20);
// obstacle.addImage(obstacleImg);
// obstacle.scale = 0.1;
// obstacle.velocityX = -3;

ground = createSprite(200,355,600,20);
ground.visible = false;
ground.velocityX = 5

gameOver = createSprite(width/2, height-300,50,50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5

restart = createSprite(width/2,height-250,50,50);
restart.addImage(restartImg);
restart.scale = 0.5

gameOver.visible = false;
restart.visible = false;

obstacleGroup = new Group();



 
}

function draw() {
 background(backgroundImg);
 text("Score: "+ score, width-100,height-350,300);
 score = score + Math.round(getFrameRate()/60);
if (gameState===PLAY)
{
 //score = score + Math.round(getFrameRate()/60);
 
}

 if(ground.x>400)
 {
  ground.x=200;
 }

 if(keyDown("up"))
 {
    donkey.velocityY=-3;
 }
 donkey.velocityY=donkey.velocityY+0.10
 donkey.collide(ground);
 //obstacle.collide(ground);
 spawnObstacles();

 if(obstacleGroup.isTouching(donkey))
  {
    gameOver.visible = true;
    restart.visible = true;
    score = 0;
    
    ground.velocityX = 0;
    donkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart) || touches.length>0) {
      reset();
      touches = []
    }
  }
  
 
 drawSprites();
}


function spawnObstacles()
{
   if(frameCount % 100 === 0)
   {
    var obstacle = createSprite(600,340,30,20);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);

   }
}
function reset(){
   gameOver.visible = false;
   restart.visible = false;
   
   obstacleGroup.destroyEach();
}