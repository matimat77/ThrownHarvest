class Basket{
    constructor(pX, pY, pR, pVx, pType, pColor){
        this.x = pX;
        this.y = pY;
        this.r = pR;
        this.w = this.r;
        this.h = this.r;
        this.vx = pVx;
        this.type = pType;
        this.color = pColor;
        this.nbPlant = 0;
    }

    addPlant(){
        this.nbPlant++;
    }

    removePlant(){
        if(this.nbPlant > 0){
            sfxTheft.play();
            particleManager.generateParticles(this.x, this.y, 10, this.color);
            this.nbPlant--;
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

    update(){
        this.x += this.vx * (deltaTime / 1000)
        if(this.x > width - this.r){
            this.vx *= -1;
            this.x = width - this.r;
        }
        if(this.x < this.r){
            this.vx *= -1;
            this.x = this.r;
        }
    }

    draw(){
        // rect(this.x - this.r, this.y - this.r, this.r*2, this.r*2);
        fill(this.color);
        stroke(this.color);
        circle(this.x, this.y, this.r * 2);
        // ellipse(this.x, this.y, this.r * 3, this.r);
        fill("white");
        textSize(12);
        text(this.nbPlant, this.x, this.y);
    }
}