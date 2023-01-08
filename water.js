class Water{
    constructor(pX, pY, pW, pH){
        this.x = pX;
        this.y = pY;
        this.w = pW;
        this.h = pH;
    }

    update(){

    }

    draw(){
        fill(0, 162 , 232);
        stroke(0, 162 , 232);
        rect(this.x, this.y, this.w, this.h);
    }
}