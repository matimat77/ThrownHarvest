class Item{
    constructor(pX, pY, pVx, pVy, pSpeed, pMaxY, pType, pColor){
        this.x = pX;
        this.y = pY;
        this.vx = pVx;
        this.vy = pVy;
        this.speed = pSpeed;
        this.maxY = pMaxY;
        this.r = 20;
        this.type = pType;
        this.color = pColor;
        this.toDelete = false;
    }

    update(){
        this.x += this.vx * this.speed * (deltaTime / 1000);
        this.y +=  this.vy * this.speed * (deltaTime / 1000);
        if(this.y < this.maxY){
            this.toDelete = true;
        }
    }

    draw(){
        fill(this.color);
        circle(this.x, this.y, this.r);
    }
}