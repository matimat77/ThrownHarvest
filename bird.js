class Bird{
    constructor(){
        this.w = 25;
        this.h = 25;
        this.minY = this.h;
        this.maxY = water.y - water.h / 1.3 - this.h;
        this.x = - this.w;
        this.y = random(this.minY, this.maxY);
        this.timerChangeDir = 0;
        if(random() > 0.5){
            this.vx = -1;
            this.x = width + this.w;
        }else{
            this.vx = 1;
        }
        if(random() > 0.5){
            this.vy = -1;
        }else{
            this.vy = 1;
        }
        this.speed = random(40,60);
    }

    update(){
        if(this.timerChangeDir <= 0){
            this.timerChangeDir = random(0.3, 0.6);
            this.vy *= -1;
        }else{
            this.timerChangeDir -= (deltaTime / 1000);
        }
        this.x += this.vx * this.speed * (deltaTime / 1000);
        this.y +=  this.vy * this.speed * (deltaTime / 1000);
        if(this.x > width + this.w){
            this.toDelete = true;
        }
        if(this.y < this.minY || this.y > this.maxY){
            this.vy *= -1;
        }
    }

    draw(){
        fill("black");
        textSize(5);
        if(this.vx > 0){
            text("__(.)=", this.x, this.y);
            text("\\___) ", this.x, this.y + 5);
        }else{
            text("=(.)__", this.x, this.y);
            text(" (___/", this.x, this.y + 5);
        }
    }
}
