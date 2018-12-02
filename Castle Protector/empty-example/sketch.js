/*CASTLE PROTECTOR*/

var bg;             //BACKGROUND VARIABLE
var slash;
var slashing;
var boxSprite;
var move_sword;
var box;            //SETTING UP THE VARIABLES
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



function preload(){
    
    //sword = createSprite();
    slash = loadAnimation('assets/sword_up.png','assets/sword_side.png');
    slash.playing = false;
    boxSprite.setDefaultCollider();
    

    
}


function setup() {              //SETTING UP THE CANVAS
    createCanvas(1200,800);
    //sword = loadImage("assets/sword_up.png");
    bg = loadImage("assets/bg.jpeg");
    rectMode(CENTER);
    angleMode(DEGREES);
    for(var i=0; i <1; i++){
        lines.push(new Line());
        lines2.push(new Line2());
        lines3.push(new Line3());   
    }
        slashing = loadSound('assets/slash_sound.wav');
    boxSprite = createSprite(x, y, 50, 170);
    boxSprite.debug = true;

    
}

function draw() {
    background(bg);
    keyPressed();
    drawSprites();

    for(var i=0; i <lines.length; i++){
        lines[i].present();
        lines[i].dance();
        
    }
    for(var i=0; i <lines2.length; i++){
        lines2[i].present();
        lines2[i].dance();      
    }
    for(var i=0; i <lines3.length; i++){
        lines3[i].present();
        lines3[i].dance();
        
    }
    
    
        
    textSize(60);
    textAlign(LEFT);
    text("Your Score:", width/5, height/6);
    
    
    
    //move_sword =image(sword, x,y, 250,180); //loading sword
    if(slash.getFrame()==slash.getLastFrame())
    slash.getFrame(0.02);
    animation(slash,x,y,50,80);

    
    noStroke();
    translate(t1,t2);           //make (200,200) center
    rotate(ang);                //rotate the rect
    ang = ang + 10;              //increasing rotation
    fill('red');
    spinner =rect(x2,y2,50,50,10);     //spinning rectangle
    t1 = t1 + 20;             //making the spinning rectangle go right with speed 20
    
    if(t1>1200){                //if the spinner goes out of the screen
        t1 = 10;                //start from the left
        t2 = random(10,800);    //Appears anywhere from the left side 
    }
    

}


function keyPressed(){              //WHEN KEY IS PRESSED THE SWORD MOVES UP AND DOWN
    if(keyIsDown(LEFT_ARROW) && keyIsPressed){
        x = x - speed;
    }
    if(keyIsDown(RIGHT_ARROW)){
        x = x + speed;
    }
    if(keyIsDown(UP_ARROW)){
        y = y - speed;
    }
    else if(keyIsDown(DOWN_ARROW)){
        y = y + speed;
    }
    
}

function keyTyped(){
    
        if(key == 's'){
        
        slash.nextFrame();
        slashing.play();
        //slash.rewind();
        
        }
    
}

function keyReleased(){
    if(key == 's'){
        slash.nextFrame();
    }
}

//    else if((key == 'a') && keyIsPressed){
//        
//        slash = loadAnimation('assets/sword_up.png');
//        
//        }


function Line(){                    //MAKING VIBRATING LINES USING NOISE   #1(LIME)

    this.xPosA = 0;
    this.xPosB = 0;
    this.yPosA = 0;
    this.yPosB = 0;
    this.sz =random(1,4);
    this.noiseStepX = random(-10000,1000);
    this.noiseStepY = random(-1000,1000);
    this.noiseVel = random(0.03, 0.001);
    
    this.present = function(){
        stroke('lime');
        line(this.xPosA ,this.yPosA * height,this.xPosB * width,this.yPosB);
        
    }
    
    this.dance = function(){
        this.xPosA = noise(this.noiseStepX) * width;
        this.yPosA = noise(this.noiseStepY) * height;
        this.xPosB = noise(this.noiseStepX + 100) ;
        this.yPosB = noise(this.noiseStepY + 100);
        this.noiseStepX += this.noiseVel;
        this.noiseStepY += this.noiseVel;
    }
}

    
    function Line2(){                   //MAKING VIBRATING LINES USING NOISE   #2(TURQUOISE)
    
    this.xPosA = 0;
    this.xPosB = 0;
    this.yPosA = 0;
    this.yPosB = 0;
    this.sz =random(1,10);
    this.noiseStepX = random(-10000,1000);
    this.noiseStepY = random(-1000,1000);
    this.noiseVel = random(0.003, 0.08);
    
    this.present = function(){
        
        stroke('turquoise');
        line(this.xPosA ,this.yPosA * height,this.xPosB * width,this.yPosB);
        
    }
    
    this.dance = function(){
        this.xPosA = noise(this.noiseStepX) * 500;
        this.yPosA = noise(this.noiseStepY) * 500;
        this.xPosB = noise(this.noiseStepX + 100) ;
        this.yPosB = noise(this.noiseStepY + 100) ;
        this.noiseStepX += this.noiseVel;
        this.noiseStepY += this.noiseVel;
    }
    }
    
    function Line3(){                       //MAKING VIBRATING LINES USING NOISE   #3(MAROON)

    this.xPosA = 0;
    this.xPosB = 0;
    this.yPosA = 0;
    this.yPosB = 0;
    this.sz =random(1,4);
    this.noiseStepX = random(-10000,1000);
    this.noiseStepY = random(-1000,1000);
    this.noiseVel = random(0.003, 0.08);
    
    this.present = function(){

        stroke('maroon');
        line(this.xPosA ,this.yPosA * height,this.xPosB * width,this.yPosB );
        
    }
    
    this.dance = function(){                            //MAKING THE LINES VIBRATE
        this.xPosA = noise(this.noiseStepX) * 300;
        this.yPosA = noise(this.noiseStepY) * 300;
        this.xPosB = noise(this.noiseStepX + 100) ;
        this.yPosB = noise(this.noiseStepY + 100) ;
        this.noiseStepX += this.noiseVel;
        this.noiseStepY += this.noiseVel;
    }
    }
    
    