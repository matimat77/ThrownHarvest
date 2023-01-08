let lstColor = ["red", "orange", "purple", "gray"];

let particleManager;
let lstBasket, lstField, lstFish, lstBird;
let player, water;
let timerSpawnBird, timerBirdCollide;
let sfxHarvest, sfxThrow, sfxGood, sfxBad, sfxTheft, sfxNewBird;
let sfxFireworksLaunch, sfxFireworksExplosion;

function preload(){
    let volume = 0.1;
    sfxHarvest = createAudio('sfx/harvest.wav'); sfxHarvest.volume(volume);
    //sfxHarvest.play();
    //sfxHarvest.volume(0.5);
    sfxThrow = createAudio('sfx/throw.wav'); sfxThrow.volume(volume);
    sfxGood = createAudio('sfx/throw_good.wav'); sfxGood.volume(volume);
    sfxBad = createAudio('sfx/throw_bad.wav'); sfxBad.volume(volume);
    sfxTheft = createAudio('sfx/theft.wav'); sfxTheft.volume(volume);
    sfxNewBird = createAudio('sfx/new_bird.wav'); sfxNewBird.volume(volume);
    sfxFireworksLaunch = createAudio('sfx/fireworks_lauch.wav'); sfxFireworksLaunch.volume(volume);
    sfxFireworksExplosion = createAudio('sfx/fireworks_explosion.wav'); sfxFireworksExplosion.volume(volume);
}

function setup() {
    let canvas = createCanvas(640, 480);

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    particleManager = new ParticleManager();
    
    lstBasket = [];
    let basketRadius = 17;
    let basketMaxY = 0;
    let basket;
    for(let i = 0; i < lstColor.length; i++){
        basket = new Basket(
            random(basketRadius, width - basketRadius), 
            basketRadius + i * (basketRadius + basketRadius * 1.2), 
            basketRadius, 
            random(100, 150), 
            i, 
            lstColor[i]
        );

        if(basket.y > basketMaxY){
            basketMaxY = basket.y;
        }

        lstBasket.push(basket);
    }
    let spacing = 20;
    let fieldWidth = (width - ( (lstColor.length + 1 ) * spacing) ) / lstColor.length;
    let fieldHeight = 100;
    let startY = height * 3.1 / 4;
    lstField = [];
    for(let i = 0; i < lstColor.length; i++){
        lstField.push(
            new Field(
                fieldWidth / 2 + spacing + i * (fieldWidth + spacing),
                startY + fieldHeight / 2, 
                fieldWidth,
                fieldHeight,
                i, 
                lstColor[i]
            )
        );        
    }
    let waterHeight = 50;
    let waterY = basketMaxY + waterHeight;
    water = new Water(width / 2, waterY, width, waterHeight);

    let playerSize = 20;
    player = new Player(
                width / 2, 
                waterY + waterHeight * 2 - playerSize / 2, 
                playerSize, playerSize,
                150,
                lstColor,
                water,
                lstField, 
                lstBasket
            );

    lstFish = [];
    for(let i = 0; i < 5; i++){
        lstFish.push(new Fish(water));
    }

    lstBird = [];
    timerSpawnBird = random(30, 90);
    timerBirdCollide = 0;
  }
  
  function update(){
    water.update();

    if(! player.isWin){
        
        for (basket of lstBasket){
            basket.update();
        }
        for (field of lstField){
            field.update();
        }

        if(timerSpawnBird <= 0){
            sfxNewBird.play();
            lstBird.push(new Bird(water));
            timerSpawnBird = random(30, 90);
        }else{
            timerSpawnBird -= (deltaTime / 1000);
        }
           
        for (let i = lstBird.length - 1; i >= 0; i--){
            bird = lstBird[i];
            bird.update();
            if(timerBirdCollide <= 0){
                for(basket of lstBasket){
                    if(basket.isCollide(bird)){
                        basket.removePlant();
                        timerBirdCollide = 5;
                    }
                }
                if(bird.toDelete){
                    lstBird.splice(i, 1);
                }
            }else{
                timerBirdCollide -= (deltaTime / 1000);
            }
        }
    }

    for (fish of lstFish){
        fish.update();
    }

    player.update();

    particleManager.update();

  }
  
  function draw() {

    update();

    // background(220);
    background(249, 228, 183);
    // background(235, 203, 96);


    water.draw();

    for (basket of lstBasket){
        basket.draw()
    }

    for (field of lstField){
        field.draw()
    }

    for (fish of lstFish){
        fish.draw();
    }

    for (bird of lstBird){
        bird.draw();
    }

    player.draw();

    particleManager.draw();

    // textSize(32);
    // text("Comming soon !", 0, 50);
  }

  function keyPressed() {
    return false; // prevent any default behaviour
  }