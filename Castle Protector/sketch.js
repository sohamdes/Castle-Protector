/*CASTLE PROTECTOR*/

var bg; //BACKGROUND VARIABLE
var slash;
var score = 0;
var fbn;
var i;
var slashing;
var boxSprite1, boxSprite2;
var fireball;
var direction = 1;
var move_sword;
var box; //SETTING UP THE VARIABLES
var spinner;
var ang = 0;
var t1 = 200;
var t2 = 200;
var x = 800;
var x1 = 10;
var x2 = 15;
var y = 200;
var y1 = 10;
var y2 = 15;
var speed = 10;
var lines = [];
var lines2 = [];
var lines3 = [];



function preload() {

    //slash = createSprite(x,y,50,170);
    slash = loadAnimation('assets/sword_up.png', 'assets/sword_side.png');
    slash.playing = false; //play animation = false  


}


function setup() { //SETTING UP THE CANVAS
    createCanvas(1200, 800);

    bg = loadImage("assets/bg.jpeg");
    rectMode(CENTER);
    angleMode(DEGREES);

    for (var i = 0; i < 1; i++) {
        lines.push(new Line());
        lines2.push(new Line2());
        lines3.push(new Line3());
    }

    slashing = loadSound('assets/slash_sound.wav'); //loading the slash sound for sword


    boxSprite1 = createSprite(x, y, 50, 170); //create sprite
    boxSprite1.addAnimation('up', 'assets/sword_up.png');

    //boxSprite1 = loadAnimation('assets/sword_up.png','assets/sword_side.png')
    boxSprite1.addAnimation('down', 'assets/sword_side.png');

    //boxSprite1.addAnimation('slash','assets/sword_up.png');      //add animation to sprite
    //boxSprite1.setDefaultCollider();
    //boxSprite1.debug = true;



    //boxSprite2 = createSprite(x, y, 50, 170);           //create sprite
    //boxSprite2.addAnimation('slashDown','assets/sword_side.png')    //add animation to sprite
    // boxSprite2.setDefaultCollider();
    //boxSprite2.debug = true;




    //FIREBALL
    fireball = createSprite(200, 200);
    fireball.addImage(loadImage('assets/fireball.png'));
    //fbn.addImage(loadImage('assets/fireball_next'));

    //fireball.debug = true;
    //fireball.rotation = 10 ;
    //translate(direction,t2);
    direction += 2;
    //fireball.setSpeed(5,direction);
    fireball.velocity.x = 12;
    //fireball.rotateToDirection = true;


}

function draw() {
    background(bg); //make background 
    // keyPressed();
    drawSprites(); //draw sprites
    arrowPress();

    for (var i = 0; i < lines.length; i++) {
        lines[i].present();
        lines[i].dance();

    }
    for (var i = 0; i < lines2.length; i++) {
        lines2[i].present();
        lines2[i].dance();
    }
    for (var i = 0; i < lines3.length; i++) {
        lines3[i].present();
        lines3[i].dance();

    }


    //SCORE TEXT   
    textSize(60);
    textAlign(LEFT);
    text("Your Score: " + score, width / 5, height / 6);

    //INFO TEXT
    textSize(18);
    textAlign(CENTER);
    text("Use arrow keys to move. S to slash", width / 2, 20);

    //move_sword =image(sword, x,y, 250,180); //loading sword
    //    if(boxSprite1.getFrame()==boxSprite1.getLastFrame())
    //    boxSprite1.getFrame(0.02);
    //    animation(boxSprite1,x,y,50,80);


    //  noStroke();
    //  translate(t1,t2);           //make (200,200) center
    //  rotate(ang);                //rotate the rect
    //  ang = ang + 10;              //increasing rotation
    //  fill('red');
    //   spinner =rect(x2,y2,50,50,10);     //spinning rectangle
    //   t1 = t1 + 20;             //making the spinning rectangle go right with speed 20

    //    if (t1 > 1200) { //if the spinner goes out of the screen
    //        t1 = 10; //start from the left
    //        t2 = random(10, 800); //Appears anywhere from the left side 
    //    }

    //FIREBALL COMES BACK TO LIFE FROM LEFT SIDE
    if (fireball.position.x > width) {
        fireball.position.x = 0;
        fireball.position.y = random(height);
        fireball.visible = true;
        //direction = 10;
        //direction = random(10,800);

    }


    if (boxSprite1.overlap(fireball)) {
        score = score + 1;
        fireball.visible = false;
    }

    //USING ARROWS FOR MOVEMENT   
    function arrowPress() {
        if (keyWentDown(LEFT_ARROW)) {
            boxSprite1.velocity.x -= 10;
        }
        if (keyWentDown(RIGHT_ARROW)) {
            boxSprite1.velocity.x += 10;
        }
        if (keyWentDown(UP_ARROW)) {
            boxSprite1.velocity.y -= 10;
        }
        if (keyWentDown(DOWN_ARROW)) {
            boxSprite1.velocity.y += 10;
        }
        if (keyWentUp(LEFT_ARROW)) {
            boxSprite1.velocity.x = 0;
        }
        if (keyWentUp(RIGHT_ARROW)) {
            boxSprite1.velocity.x = 0;
        }
        if (keyWentUp(UP_ARROW)) {
            boxSprite1.velocity.y = 0;
        }
        if (keyWentUp(DOWN_ARROW)) {
            boxSprite1.velocity.y = 0;
        }

    }
}



//function keyPressed() { //WHEN KEY IS PRESSED THE SWORD MOVES UP AND DOWN
//    if (keyIsDown(LEFT_ARROW)) {
//        x = x - speed;
//    }
//    if (keyIsDown(RIGHT_ARROW)) {
//        x = x + speed;
//    }
//    if (keyIsDown(UP_ARROW)) {
//        y = y - speed;
//    } else if (keyIsDown(DOWN_ARROW)) {
//        y = y + speed;
//    }
//
//}

function keyTyped() { //When key 's' is pressed, the image changes and plays the sound

    if (key == 's') {
        boxSprite1.changeAnimation('down');
        boxSprite1.animation.rewind();
        slashing.play();
    }

}

function keyReleased() { //When the key 's' is released, the animation goes back to the first image
    if (key == 's') {
        boxSprite1.changeAnimation('up');
    }
}


function Line() { //MAKING VIBRATING LINES USING NOISE   #1(LIME)

    this.xPosA = 0;
    this.xPosB = 0;
    this.yPosA = 0;
    this.yPosB = 0;
    this.sz = random(1, 4);
    this.noiseStepX = random(-10000, 1000);
    this.noiseStepY = random(-1000, 1000);
    this.noiseVel = random(0.03, 0.001);

    this.present = function() {
        stroke('lime');
        line(this.xPosA, this.yPosA * height, this.xPosB * width, this.yPosB);

    }

    this.dance = function() {
        this.xPosA = noise(this.noiseStepX) * width;
        this.yPosA = noise(this.noiseStepY) * height;
        this.xPosB = noise(this.noiseStepX + 100);
        this.yPosB = noise(this.noiseStepY + 100);
        this.noiseStepX += this.noiseVel;
        this.noiseStepY += this.noiseVel;
    }
}


function Line2() { //MAKING VIBRATING LINES USING NOISE   #2(TURQUOISE)

    this.xPosA = 0;
    this.xPosB = 0;
    this.yPosA = 0;
    this.yPosB = 0;
    this.sz = random(1, 10);
    this.noiseStepX = random(-10000, 1000);
    this.noiseStepY = random(-1000, 1000);
    this.noiseVel = random(0.003, 0.08);

    this.present = function() {

        stroke('turquoise');
        line(this.xPosA, this.yPosA * height, this.xPosB * width, this.yPosB);

    }

    this.dance = function() {
        this.xPosA = noise(this.noiseStepX) * 500;
        this.yPosA = noise(this.noiseStepY) * 500;
        this.xPosB = noise(this.noiseStepX + 100);
        this.yPosB = noise(this.noiseStepY + 100);
        this.noiseStepX += this.noiseVel;
        this.noiseStepY += this.noiseVel;
    }
}

function Line3() { //MAKING VIBRATING LINES USING NOISE   #3(MAROON)

    this.xPosA = 0;
    this.xPosB = 0;
    this.yPosA = 0;
    this.yPosB = 0;
    this.sz = random(1, 4);
    this.noiseStepX = random(-10000, 1000);
    this.noiseStepY = random(-1000, 1000);
    this.noiseVel = random(0.003, 0.08);

    this.present = function() {

        stroke('maroon');
        line(this.xPosA, this.yPosA * height, this.xPosB * width, this.yPosB);

    }

    this.dance = function() { //MAKING THE LINES VIBRATE
        this.xPosA = noise(this.noiseStepX) * 300;
        this.yPosA = noise(this.noiseStepY) * 300;
        this.xPosB = noise(this.noiseStepX + 100);
        this.yPosB = noise(this.noiseStepY + 100);
        this.noiseStepX += this.noiseVel;
        this.noiseStepY += this.noiseVel;
    }
}