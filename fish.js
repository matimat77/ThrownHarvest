class Fish{
    constructor(water){
        this.w = 20;
        this.h = 20;
        this.x = random(water.x - water.w / 2 + this.w, water.x + water.w / 2 - this.w);
        this.y = water.y + random(this.h * -1, this.h);
        this.vx = random(1, 5);
        if(random() > 0.5){
            this.vx *= -1;
        }
        this.vy = 0;
        this.speed = random(10,20);
        this.maxX  = water.x + water.w / 2 - this.w;
        this.minX  = water.x - water.w / 2 + this.w;
        this.txtRight = "><((((°>";
        this.txtLeft = "<°))))><";
        this.timerChangeDir = random(0.5,2);
    }

    update(){

        if(this.timerChangeDir <= 0){
            if(random() > 0.5){
                this.vx *= -1;
            }
            this.timerChangeDir = random(0.5, 2);
        }else{
            this.timerChangeDir -= (deltaTime / 1000);
        }

        this.x += this.vx * this.speed * (deltaTime / 1000);
        this.y +=  this.vy * this.speed * (deltaTime / 1000);

        if(this.x > this.maxX) {
            this.x = this.maxX;
            this.vx *=  -1;
        }
        if(this.x < this.minX) {
            this.x = this.minX;
            this.vx *=  -1;
        }
    }

    draw(){
        fill("black");
        strokeWeight(1);
        stroke("black");
        textSize(6);
        if(this.vx > 0){
            text(this.txtRight, this.x, this.y);
        }else{
            text(this.txtLeft, this.x, this.y);
        }
    }
}