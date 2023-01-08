class Player{
    constructor(pX, pY, pW, pH, pSpeed, pLstType, pWater, pLstField, pLstBasket){
        this.x = pX;
        this.y = pY;
        this.w = pW;
        this.h = pH;
        this.vx = 0;
        this.vy = 0;
        this.speed = pSpeed;
        this.water = pWater;
        this.lstField = pLstField;
        this.lstType = pLstType;
        this.lstBasket = pLstBasket;

        this.maxY  = this.water.y + this.water.h / 2 + this.h / 2;

        this.maxElement = 5;
        this.inventory = []
        for (let i = 0; i < pLstType.length; i++){
            this.inventory[i] = [];
        }

        this.timerChangeType = 0;
        this.timerChangeTypeDefault = 1;
        
        this.timerAdd = 0;
        this.timerAddDefault = 1;

        this.currentType = 0;
        this.lstPlantThrown = [];
        this.timerLaunch = 0;
        this.timerDefault = 1;

        this.targetSpeed = 125;
        this.targetYMax = 200;
        this.targetX = 0;
        this.targetY = 0;

        this.throwZone = {}
        this.throwZone.w = width;
        this.throwZone.h = this.water.h;
        this.throwZone.x = this.throwZone.w / 2;
        this.throwZone.y = this.water.y + this.throwZone.h;

        this.isWin = false;
    }

    throwAway(){
        if(this.inventory[this.currentType].length > 0){
            sfxThrow.play();
            let plant = this.inventory[this.currentType].pop();
            plant.throwAway(
                this.x + this.w / 2, this.y, 
                0, -1,
                this.targetSpeed * 2, 
                this.targetY
            );
            this.lstPlantThrown.push(plant);
        }
    }

    isCollide(other1, other2){
        if(other2 == null){
            other2 = this; // if only one parameter, test collision with player
        }

        let x1 = other2.x - other2.w / 2;
        let y1 = other2.y - other2.h / 2;
        let w1 = other2.w
        let h1 = other2.h
        let x2 = other1.x - other1.w / 2;
        let y2 = other1.y - other1.h / 2;
        let w2 = other1.w
        let h2 = other1.h

        return  x2 < x1 + w1 &&
                x2 + w2 > x1 &&
                y2 < y1 + h1 &&
                y2 + h2 > y1;
    }

    checkWin(){
        for(let basket of this.lstBasket){
            if (basket.nbPlant < 5){
                return false;
            }
        }
        return true;
    }

    update(){
        if(!this.isWin){
            this.vx = 0;
            this.vy = 0;
            if (keyIsDown(LEFT_ARROW)) { this.vx  = -1; }
            if (keyIsDown(RIGHT_ARROW)){ this.vx  = 1; }
            if (keyIsDown(UP_ARROW))   { this.vy  = -1; }
            if (keyIsDown(DOWN_ARROW))   { this.vy  = 1; }
            if (keyIsDown(TAB)){
                if(this.timerChangeType <= 0){
                    this.currentType++;
                    if(this.currentType > this.lstType.length - 1){
                        this.currentType = 0;
                    }
                    this.timerChangeType = this.timerChangeTypeDefault;
                }else{
                    this.timerChangeType -= (deltaTime / 1000);
                }
            }else{
                this.timerChangeType = 0;
            }

            this.x += this.vx * this.speed * (deltaTime / 1000);
            this.y += this.vy * this.speed * (deltaTime / 1000);
            
            // Water is Wall
            if(this.y <  this.maxY){
                this.vy = 0;
                this.y = this.maxY;
            }

            //Edges are wall
            if(this.x < this.w / 2){ this.x = this.w / 2; }
            if(this.x > width - this.w / 2){ this.x = width - this.w / 2; }
            if(this.y < this.h / 2){ this.y = this.h / 2; }
            if(this.y > height - this.h / 2){ this.y = height - this.h / 2; }

            if(this.timerLaunch > 0){
                this.timerLaunch  -= deltaTime / 1000;
            }

            // Throw plant
            if(keyIsDown(32) && this.y < this.water.y + this.h * 4){
                if(this.targetY == 0){
                    this.targetX = this.x;
                    this.targetY = this.targetYMax;
                }
                // this.targetX += this.vx * this.targetSpeed * deltaTime / 1000;
                if(this.targetX < 10){ this.targetX = 10;}
                if(this.targetX > width - 10){ this.targetX = width - 10;}

                this.targetY -= this.targetSpeed * deltaTime / 1000;
                if(this.targetY < 10){ this.targetY = 10; }
            }else{
                if(this.targetY != 0){
                    // Throw plant to the top until targerY
                    this.throwAway();
                    this.targetY = 0;
                    this.timerLaunch = this.timerDefault;
                }
            }

            // Update thrown plants
            let plantThrown;
            for(let i = this.lstPlantThrown.length - 1; i >= 0; i--){
                plantThrown = this.lstPlantThrown[i];
                plantThrown.update();
                for(let basket of this.lstBasket){
                    // Test collision between basket and plant
                    if(this.isCollide(basket, plantThrown)){
                        if(basket.type == plantThrown.type){ // Same Type ?
                            sfxGood.play();
                            basket.addPlant();
                        }
                        sfxBad.play();
                        plantThrown.toDelete = true;
                    }
                }
                if(plantThrown.toDelete){
                    this.lstPlantThrown.splice(i, 1);
                }
            }

            // Recolt plants
            let plant;
            for(field of this.lstField){
                if(this.isCollide(field)){
                    this.currentType = field.type;
                    for(let i = field.lstPlant.length - 1; i >= 0; i--){
                        plant = field.lstPlant[i];
                        if(this.isCollide(plant)){
                            if(this.inventory[plant.type].length < this.maxElement){
                                if(plant.recolt()){
                                    sfxHarvest.play();
                                    this.inventory[plant.type].push(plant);
                                    field.lstPlant.splice(i, 1);
                                    field.lstPlant.push(plant.duplicate());
                                }
                            }
                        }
                    }
                }
            }

            // Check if all basket has 5 plants 
            this.isWin = this.checkWin();
            if(this.isWin){
                for(let i = 0; i < 20; i++){
                    particleManager.generateParticles(random(0, width - 50), random(0, height - 50), 50);
                }
                
            }
        }
    }

    draw(){

        // Throwing Zone
        fill(180);
        stroke(180);
        rect(this.throwZone.x, this.throwZone.y, this.throwZone.w, this.throwZone.h);

        if(! this.isWin){
            // Throwing Zone
            let msgTarget = "Throw to " + this.lstType[this.currentType] + " moving target";
            if(this.inventory[this.currentType].length == 0){
                msgTarget = "You have to go on bottom field to harvest before throwing";
            }
            push();
            textAlign(CENTER, BASELINE);
            textSize(12);
            fill(0);
            text("Throw Zone (space to throw, hold space to set force). " + msgTarget, this.throwZone.x, this.throwZone.y)
            textSize(10);
            text("Five plants on each basket to win", 150, this.throwZone.y + 20);
            text("Arrow to move, TAB to select plant to throw", this.throwZone.x + 150, this.throwZone.y + 20);
            pop();

            // Player
            fill(this.lstType[this.currentType]);
            stroke(this.lstType[this.currentType]);
            textSize(12);
            rect(this.x, this.y, this.w, this.h);
            fill("white");
            text(this.inventory[this.currentType].length, this.x, this.y);

            // Thrown Plant
            for(let myPlantThrown of this.lstPlantThrown){
                myPlantThrown.draw();
            }

            // Target
            if(this.targetY != 0){
                noFill();
                stroke("black");
                line(this.x + this.w / 2 - 4, this.targetY, this.x + this.w / 2 + 4, this.targetY);
                line(this.x + this.w / 2, this.targetY - 4, this.x + this.w / 2, this.targetY + 4);
                circle(this.x + this.w / 2, this.targetY, 5);
                // line(this.targetX + this.w / 2 - 4, this.targetY, this.targetX + this.w / 2 + 4, this.targetY);
                // line(this.targetX + this.w / 2, this.targetY - 4, this.targetX + this.w / 2, this.targetY + 4);
                // circle(this.targetX + this.w / 2, this.targetY, 5);
            }

        }else{
            textSize(24);
            fill("green");
            text("YOU WIN ! Refresh page to play again", this.throwZone.x, this.throwZone.y)
        }
    }
}