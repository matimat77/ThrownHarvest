class Field{
    constructor(pX, pY, pW, pH, pType, pColor){
        this.x = pX;
        this.y = pY;
        this.w = pW;
        this.h = pH;
        this.type = pType;
        this.color = pColor;
        this.plantSize = 15;
        this.spacingX = 10;
        this.spacingY = 20;
        this.borderX = 10;
        this.borderY = 10;
        this.lstPlant = [];

        let plantNbCol = (this.w - this.borderX * 2) / (this.plantSize) - 2;
        let plantNbLine = (this.h - this.borderY * 2) / (this.plantSize) - 2;

        let plant;
        for(let i = 0; i < plantNbCol - 1; i++){
            for(let j = 0; j < plantNbLine - 1 ; j++){
                plant = new Plant(
                    this.x - this.w / 2 + this.borderX + i * (this.plantSize + this.spacingX) + this.plantSize / 2, 
                    this.y - this.h / 2 + this.borderY + j * (this.plantSize + this.spacingY) + this.plantSize / 2, 
                    0.5, 
                    this.plantSize, 
                    this.type,
                    this.color
                );
                this.lstPlant.push(plant);
            }
        }
        // 4 plants is already grown
        for(let i=0; i<3; i++){
            plant = this.lstPlant[floor(random(0, this.lstPlant.length - 1))];
            plant.evol = plant.evolMax;
        }
    }

    isCollide(player){
        let x1 = this.x - this.w / 2;
        let y1 = this.y - this.h / 2;
        let w1 = this.w
        let h1 = this.h
        let x2 = player.x - player.w / 2;
        let y2 = player.y - player.h / 2;
        let w2 = player.w
        let h2 = player.h

        return  x2 < x1 + w1 &&
                x2 + w2 > x1 &&
                y2 < y1 + h1 &&
                y2 + h2 > y1;
    }

    update(){
        for(let plant of this.lstPlant){
            plant.update();
        }
    }

    draw(){
        fill(92, 60, 18);
        stroke(92, 60, 18);
        rect(this.x, this.y, this.w, this.h);
        for(let plant of this.lstPlant){
            plant.draw();
        }
        // fill("white");
        // text("here to accumulate color", this.x, this.y);
        // fill("black");
        // textSize(8);
        // text(this.x + ", " + this.y, this.x - this.w / 2, this.y - this.h / 1.8);
    }
}