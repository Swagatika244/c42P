var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, blueBubbleGroup, bulletGroup;

var lifeBoard, scoreBoard;
var life =3;
var score=0;
var gameState=1;

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = new Group();   

  //create ScoreBoard 
  scoreBoard = createElement('h1');
  scoreBoard.position(width-150, 15);
  scoreBoard.style('color:rgb(07, 51, 24)');

  //create lifeBoard
  lifeBoard = createElement('h1');
  lifeBoard.position(150, 15);
  lifeBoard.style('color:rgb(07, 51, 24)');
  
  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreBoard.html( 'Score: '+ score);
  lifeBoard.html( 'Life: '+ life)

  if(gameState===1){
    gun.y=mouseY  

    if(keyIsDown(32)){
      shootBullet();
    }

    //redBubble 
    bubble(100, redbubble, redBubbleImg, redBubbleGroup);

    //blueBubble
    bubble(80, bluebubble, blueBubbleImg, blueBubbleGroup);

    //handle Collision
    if(bullet !==undefined){
    handleCollision(redBubbleGroup);
    handleCollision(blueBubbleGroup);
  }
    //handleGameOver
    handleGameOver(redBubbleGroup);
    handleGameOver(blueBubbleGroup);

    //gameState change to 2
    if(life === 0){
      gameState = 2;
      gameOver();
    }

    
    drawSprites();
  }
     
}
function shootBullet(){
  if(frameCount %7 === 0){
    bullet = createSprite(gun.x+50, gun.y-32);
    bullet.addImage("bullet", bulletImg);
    bullet.velocityX = 10;
    bullet.scale = 0.1;
    bullet.lifetime = 70;
    bulletGroup.add(bullet);
    bullet.depth = gun.depth
    gun.depth +=1;
  }
}
function bubble(num, bubbleName, bubbleImg, bubbleGroup){
  if(frameCount % num === 0 ){

    var randX = random(width +30, width + 100);
    var randY = random(0, height);

    bubbleName = createSprite(randX, randY);

    bubbleName.addImage("bubble", bubbleImg);
    bubbleName.addImage("blast", blastImg);
    bubbleName.changeImage("bubble");

    bubbleName.velocityX = -5;
    bubbleName.scale = 0.1;
    bubbleName.lifetime = 200;

    bubbleGroup.add(bubbleName);

  }
}
function handleCollision(bubbleGroup){
  /*bullet.overlap(bubbleGroup, ()=>{
    if(life > 0){
      score = score +1
    }
    bullet.destroy();
    bubbleGroup.destroyEach();
    console.log(score);
  })*/

  if(bullet.isTouching( bubbleGroup)){
    if(life > 0){
      score = score +1
    }
    for(var bubble of bubbleGroup){
      bubble.changeImage("blast");
    }

  setTimeout(() => {
    bullet.destroy();
    bubbleGroup.destroyEach();
  }, 1000);
    
  }
}
function handleGameOver(bubbleGroup){
  if(backBoard.isTouching(bubbleGroup) && life >0){
    life -=1;
    bubbleGroup.destroyEach();
    console.log('true')
  }
}
function gameOver(){
  swal({
    title: `Game Over`,
    text: "Oops you lost the game....!!!",
    text: "Your score is " + score,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}



