class Particle{
    constructor(pX, pY, pColor){
        this.x = pX;
        this.y = pY;
        this.color = pColor;
        this.toDelete = false;
        this.life = random(1000, 2000) / 1000;
        let angle = random() * TWO_PI;
        this.vx = random(10, 5000) / 100 * cos(angle);
        this.vy = random(10, 5000) / 100 * sin(angle);
        this.gravity = 50;
    }

    update(){
        this.vy += this.gravity * (deltaTime / 1000);
        this.x += this.vx * (deltaTime / 1000);
        this.y +=  this.vy * (deltaTime / 1000);
        this.life -= (deltaTime / 1000);
        if(this.life <= 0){
            this.toDelete = true;
        }
    }

    draw(){
        fill(this.color);
        stroke(this.color);
        circle(this.x, this.y, 1);
    }
}

class ParticleManager{
    constructor(){
        this.lstParticle = [];
        this.lstColor = ["red", "blue", "green", "purple", "yellow", "white"];
    }

    generateParticles(pX, pY, pNb, pColor){
        let nbParticule
        if(pNb == null){
            nbParticule = floor(random(10, 30));
        }else{
            nbParticule = pNb;
        }
        let particule;
        let myColor;
        if(pColor == null){
            myColor = this.lstColor[floor(random(0, this.lstColor.length - 1))];
        }else{
            myColor = pColor;
        }
        for(let i = 0; i < nbParticule; i++){
            particule = new Particle(
                pX + floor(random(-5, 5)), 
                pY + floor(random(-5, 5)),
                myColor
            );
            this.lstParticle.push(particule);
        }
    }

    update(){
        let particle;
        for(let i = this.lstParticle.length - 1; i >= 0; i-- ){
            particle = this.lstParticle[i];
            particle.update();
            if(particle.toDelete){
                this.lstParticle.splice(i, 1);
            }
        }
    }

    draw(){
        for(let particle of this.lstParticle){
            particle.draw();
        }
    }
}