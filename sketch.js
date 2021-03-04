var ball,database,position,ballpos;

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    //ref()- to refer to location in database
    ballpos=database.ref("ball/position");
    //on()- to listen to the values at refered location
    ballpos.on("value",readPosition,showErr)
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
//create a function to write values to database
//ref()- to refer to location in database
//set()-to set values on database
function changePosition(x,y){
    //database
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
    //when player move the ball modify x&y value in database
    database.ref('ball/position').set({
        x:position.x+x,
        y:position.y+y
    })
}
//create a function to read position
//ref()- to refer to location in database
//on()- to listen to the values at refered location
//val()-to extract the value
function readPosition(data){
    //position has x & y values from database
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
//stored the values read to a variable, here variable position
//assign those values to x&y positions of ball
}
function showErr(){
console.log("error")
}