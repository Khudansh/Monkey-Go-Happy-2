var bananaImg, banana, obstacleImg, obstacle;

var backgroundImg, score, bananaGroup, monkey_running, monkey_stopped, monkey_collided, monkey, scene, ground;

var bananaGroup, obstacleGroup;

var SCORE, PLAY, END;

function preload() {
  bananaImg = loadImage("banana.png");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  backgroundImg = loadImage("jungle.jpg");
  obstacleImg = loadImage("stone.png");
}


function setup() {
  createCanvas(400, 400);

  scene = createSprite(200, 200, 20, 20);
  scene.addImage("backgroundImg", backgroundImg);
  scene.velocityX = -3;
  scene.x = scene.width / 2;

  ground = createSprite(200, 390, 400, 5);
  ground.visible = false;

  monkey = createSprite(50, 350);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.1;

  bananaGroup = new Group();

  obstacleGroup = new Group();

  SCORE = 0;

  PLAY = 1;

  END = 0;

  gameState = PLAY;
}

function draw() {
  background(250);

  if (gameState === PLAY) {
    if (scene.x < 0) {
      scene.x = scene.width / 2;
    }

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      SCORE = SCORE + 2;
    }

    if (keyDown("space") && monkey.collide(ground)) {
      monkey.velocityY = -15;
    }

    if (obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      monkey.scale = 0.1;
      gameState = END;
    }

    if (monkey.scale === 0.1 && obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      gameState = END;
    }

    bananaSpawn();
    obstacleSpawn();

    switch (SCORE) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      default:
        break;

    }

    console.log(monkey.y);

  } else if (gameState === END) {
    text("Game Over", 200, 200);

    scene.velocityX = 0;

    bananaGroup.destroyEach();

    if (keyDown("r")) {
      gameState = PLAY;
      scene.velocityX = -3;
      SCORE = 0;
    }

  }

  monkey.collide(ground);

  monkey.velocityY = monkey.velocityY + 0.8;

  drawSprites();

  textSize(20);
  fill("white");
  text("Score :" + SCORE, 20, 20);
}

function bananaSpawn() {
  if (frameCount % 100 === 0) {
    banana = createSprite(400, 300);
    banana.addImage("bananaImg", bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.y = random(250, 350);
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}

function obstacleSpawn() {
  if (frameCount % 205 === 0) {
    obstacle = createSprite(400, 360);
    obstacle.addImage("obstacleImg", obstacleImg);
    obstacle.scale = 0.10;
    obstacle.velocityX = -5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}