var bg,bgimage;
var runner,runnerimage;
var treasureCollection = 0;
var treasure1,treasure1image;
var treasure2,treasure2image;
var treasure3,treasure3image;
var obstacle,obstacleimage;
var gameover,gameoverimage;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  bgimage=loadImage("Background image.png");
  runnerimage=loadAnimation("Runner for treasure collection game (1).png");
  treasure1image=loadImage("Treasure (1).png");
  treasure2image=loadImage("Treasure (2).png");
  treasure3image=loadImage("Treasure(3).png");
  obstacleimage=loadImage("obstacle.png");
  gameoverimage=loadAnimation("gameover.png");
}

function setup() {
  createCanvas(600,600);
  
  bg=createSprite(400,400,10,10);
  bg.addImage(bgimage);
  bg.velocityY=4;
  
  runner=createSprite(212,460,50,50);
  runner.addAnimation("man",runnerimage);
  runner.scale=0.3;
  
  treasure1group= new Group();
  treasure2group=new Group ();
  treasure3group=new Group();
  obstaclegroup=new Group();
}

function draw() {
   
  if(gameState===PLAY){
    if(bg.y > height ){
       bg.y = height/2;
    }
   runner.x=World.mouseX;
  }
  
  treasures();
  obstacle();
  
  if(runner.isTouching(treasure1group)){
    treasureCollection=treasureCollection+50;
    treasure1.destroyEach();
  }
  
 if(runner.isTouching(treasure2group)){
    treasureCollection=treasureCollection+30;
    treasure2group.destroyEach();
  }
  
  if(runner.isTouching(treasure3group)){
    treasureCollection=treasureCollection+20;
    treasure3group.destroyEach();
  }
  
  if(runner.isTouching(obstaclegroup)){
    gameState=END;
    
    runner.addAnimation("man",gameoverimage);
    runner.x=350;
    runner.y=300;
    runner.scale=0.6;
    runner.velocityY=0;
    
    treasure1group.destroyEach();
    treasure2group.destroyEach();
    treasure3group.destroyEach();
    obstaclegroup.destroyEach();
    
    treasure1group.setVelocityYEach(0);
    treasure2group.setVelocityYEach(0);
    treasure3group.setVelocityYEach(0);
    obstaclegroup.setVelocityYEach(0);
    bg.velocityY=0;
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,100,30);

}

function treasures(){
  if (World.frameCount % 200 == 0) {
  var  treasure1 = createSprite(Math.round(random(50,450),40, 10,10));
  treasure1.addImage(treasure1image);
  treasure1.velocityY = 3;
  treasure1.lifetime = 200;
  treasure1.scale=0.12;
  treasure1group.add(treasure1);
  }
  
   if(World.frameCount%350==0){
    var treasure2= createSprite(Math.round(random(150,380),60,50,50));
    treasure2.addImage(treasure2image);
    treasure2.scale=0.05;
    treasure2.velocityY=3;
    treasure2group.add(treasure2);
    treasure2.lifetime=350;
  }
  
  if (World.frameCount % 500 == 0) {
  var treasure3 = createSprite(Math.round(random(200,500),80, 50, 50));
  treasure3.addImage(treasure3image);
  treasure3.scale=0.09;
  treasure3.velocityY = 3;
  treasure3.lifetime = 500;
  treasure3group.add(treasure3);
  }
  
}

function obstacle(){
  if(World.frameCount%300 == 0){
    var obstacle=createSprite(Math.round(random(250,640),40,80,90));
    obstacle.addImage(obstacleimage);
    obstacle.scale=0.07;
    obstacle.velocityY=3;
    obstacle.lifetime=300;
    obstaclegroup.add(obstacle);
}
  
}