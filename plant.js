class Plant{
    constructor(pX, pY, pEvolSpeed, pEvolMax, pType, pColor){
        this.x = pX;
        this.y = pY;
        this.evolMax = pEvolMax;
        this.evolSpeedDefault = pEvolSpeed;
        this.type = pType;
        this.color = pColor;
        this.w = pEvolMax;
        this.h = pEvolMax;
        this.vx = 0;
        this.vy = 0;
        this.speed = 0;
        this.maxY = 0;
        this.toDelete = false;
        this.timerGrownDefault = 10;
        this.timerBlink = 0;
        this.timerBlinkDefault = 0.2;
        this.reset();
    }

    reset(){
        this.evol = 0;
        this.evolSpeed = random(this.evolSpeedDefault - this.evolSpeedDefault * 0.3, this.evolSpeedDefault + this.evolSpeedDefault * 0.3);
        this.show = true;
        this.timerGrown = this.timerGrownDefault;
        this.blink = false;
        this.thrown = false;
    }

    duplicate(){
        return new Plant(
            this.x, this.y, this.evolSpeed, 
            this.evolMax,
            this.type, this.color
        );
    }

    recolt(){
        if(this.evol == this.evolMax){
            this.show = false;
        }
        return ! this.show;
    }

    throwAway(pX, pY, pVx, pVy, pSpeed, pMaxY){
        this.show = true;
        this.x = pX;
        this.y = pY;
        this.vx = pVx;
        this.vy = pVy;
        this.speed = pSpeed;
        this.maxY = pMaxY;
        this.thrown = true;
    }
    
    update(){
        if(this.evol >= this.evolMax){
            this.evol = this.evolMax
        }else{
            this.evol += this.evolSpeed * (deltaTime / 1000);
        }

        if(this.evol >= this.evolMax){
            this.timerGrown -= (deltaTime / 1000);
            if(this.timerGrown <= 0){
                particleManager.generateParticles(this.x, this.y, 10, this.color);
                this.reset();
            }else{
                if(this.timerGrown < this.timerGrownDefault / 3){
                    if(this.timerBlink <= 0){
                        this.timerBlink = this.timerBlinkDefault;
                        this.blink = ! this.blink;
                    }else{
                        this.timerBlink -= (deltaTime / 1000);
                    }
                }
            }
        }

        this.x += this.vx * this.speed * (deltaTime / 1000);
        this.y +=  this.vy * this.speed * (deltaTime / 1000);
        if(this.y < this.maxY){
            sfxBad.play();
            this.toDelete = true;
        }
    }

    draw(){
        if(this.show){
            fill("black");
            circle(this.x, this.y, floor(this.evol));
            fill(this.color);
            if(this.evol == this.evolMax){
                circle(this.x, this.y, this.evolMax);
                if(!this.thrown){
                    // if(this.blink){
                    //     stroke("white");
                    // }else{
                    //     stroke("black");
                    // }
                    textSize(12);
                    fill("white");
                    // text(floor(this.timerGrown), this.x, this.y);
                }
            }else{
                fill(this.color);
                stroke(this.color);
                arc(this.x, this.y, floor(this.evol), floor(this.evol), -HALF_PI, -HALF_PI + TWO_PI * (this.evol / this.evolMax));
            }
        }
        
        // circle(this.x, this.y, floor(this.evol));
        // if(this.evol == this.evolMax){
        //     fill("black");
        //     circle(this.x, this.y, this.evol - this.evol * 0.5);
        // }
    }
}