var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground
var survivalTime,bgImg,bg;
var gameOver,over
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
bgImg=loadImage("img2.jpg")
 over=loadImage("over.jpg")
}


function setup() {
  createCanvas(370, 370);
  score=0
  survivalTime=0
 
  bg=createSprite(width/2,height/2,300,300)
  bg.addImage(bgImg)
  bg.scale=2.3
  bg.velocityX=-3
  bg.x = bg.width /2
  
   gameOver = createSprite(167,140,50,50);
  gameOver.addImage(over);
  gameOver.scale=0.8
  
   
  ground=createSprite(188,310,1500,10)
  ground.visible=false
   monkey=createSprite(78,275,10,10)
  monkey.addAnimation("monkey_running",monkey_running)
  monkey.scale=0.1
  
  

  FoodGroup= new Group()
  obstacleGroup= new Group()
  

  }


function draw() {
  background("white")
  
  camera.position.x=monkey.x
  camera.position.y=monkey.y
  
  if(gameState === PLAY){
    if(keyDown("space")&&monkey.y >= 260){
    monkey.velocityY=-10
  }
  monkey.velocityY = monkey.velocityY + 0.3
  monkey.collide(ground)
    
  if (bg.x <100){
      bg.x = bg.width/2;
    }
 ground.velocityX = -7 
 ground.x = ground.width/2;
  
    if(World.frameCount%200===0){
    fruits()
 }
  
  if(World.frameCount%300===0){
    stones()
 }
     if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
    score=score+1
      }
    gameOver.visible=false
    if(monkey.isTouching(obstacleGroup)){
       gameState = END;
    }
  }
  else if (gameState === END) {
     gameOver.visible=true
     ground.velocityX=0;
     bg.velocityX=0;
      obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0)
    monkey.visible=false
    obstacleGroup.destroyEach()
    FoodGroup.destroyEach()
  }
  
  
 
  
 
    
 
  
 
  
 
 drawSprites()
   fill("white") 
  text("Score: "+ score, 24,76);
  
  fill("white")
  var survivalTime=Math.round(getFrameRate()/1);
  text("Survival Time: "+ survivalTime,24,50)
  text("x"+mouseX+",y:"+mouseY,24,100)
}

function fruits(){
  banana=createSprite(670,Math.round(random(170,230)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(285,285,10,10)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-4
  obstacle.scale=0.2
  obstacleGroup.add(obstacle)
}
function gameOver(){
  
 
  ground.velocityX=0
  bg.velocityX=0
  
}
