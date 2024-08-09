const gameScreen= document.querySelector("#gameScreen");
const ctx = gameScreen.getContext("2d");
const scoreText = document.querySelector("#score");
const reset = document.querySelector("#reset");
const gameWidth = gameScreen.width;
const gameHeight = gameScreen.height;
const screenBackground = "white";
const snakeColour = "green";
const snakeBorder = "black";
const foodColour = "red";
const unitSize = 25;
let start = false;
let xSpeed = unitSize;
let ySpeed = 0;
let foodX;
let foodY;
let score = 0;
let snake =[
    {x: unitSize*4, y: 0},
    {x: unitSize*3, y: 0},
    {x: unitSize*2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);
gameStart();

function gameStart(){
    start = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    next();
};
function next(){
    if(start){
        setTimeout(()=>{
            clearScreen();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            next();
        }, 75)
    }
    else{
        diplayGameOver();
    }
};
function clearScreen(){
    ctx.fillStyle = screenBackground;
    ctx.fillRect(0,0, gameWidth, gameHeight);
};
function createFood(){
    function randFood(min, max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    foodX = randFood(0, gameWidth-unitSize);
    foodY = randFood(0, gameHeight-unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColour;
    ctx.fillRect(foodX, foodY, unitSize,unitSize)
};
function moveSnake(){
    const head = {x:snake[0].x + xSpeed, y:snake[0].y+ySpeed};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score +=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColour;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPress = event.keyCode;
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    const upDirection = (ySpeed == -unitSize)
    const downDirection = (ySpeed == unitSize)
    const leftDirection = (xSpeed == unitSize)
    const rightDirection = (xSpeed == -unitSize)

    switch(true){
        case(keyPress == left && !rightDirection):
            xSpeed = -unitSize;
            ySpeed = 0;
            break;
        case(keyPress == up && !downDirection):
            xSpeed = 0;
            ySpeed = -unitSize;
            break;
        case(keyPress == right && !leftDirection):
            xSpeed = unitSize;
            ySpeed = 0;
            break;
        case(keyPress == down && !upDirection):
            xSpeed = 0;
            ySpeed = unitSize;
            break;
            
    }
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            start = false;
            break;
        case(snake[0].x >= gameWidth):
            start = false;
            break;
        case(snake[0].y < 0):
            start = false;
            break;
        case(snake[0].y >= gameHeight):
            start = false;
            break;
    }
    for(let i = 1; i<snake.length;i++){
        if(snake[i].x ==snake[0].x && snake[i].y ==snake[0].y){
            start=false;
        }
    }
};
function diplayGameOver(){
    ctx.font ="100px"
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
    start=false;
};
function resetGame(){
    score = 0;
    xSpeed = unitSize;
    ySpeed = 0;
    snake =[
        {x: unitSize*4, y: 0},
        {x: unitSize*3, y: 0},
        {x: unitSize*2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    gameStart();

};

