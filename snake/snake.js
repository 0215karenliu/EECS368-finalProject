const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
let snake = [];
snake[0] = {x : 10 * box, y : 10 * box};
let apple = {x : Math.floor(Math.random() * 17 + 1) * box, y : Math.floor(Math.random() * 15 + 3) * box};
let score = 0;

document.addEventListener("keydown",direction);
let d;
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT") d = "LEFT";
    else if(key == 38 && d != "DOWN") d = "UP";
    else if(key == 39 && d != "LEFT") d = "RIGHT";
    else if(key == 40 && d != "UP") d = "DOWN"; 
}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }return false;
}

function draw(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, box, box);
    for( let i = 0; i < snake.length ; i++){
        context.fillStyle = ( i == 0 )? 'grey' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;
    if(snakeX == apple.x && snakeY == apple.y){
        score++;
        apple = {x : Math.floor(Math.random() * 17 + 1) * box, y : Math.floor(Math.random() * 15 + 3) * box};
    }else{
        snake.pop();
    }
    let newHead = {x : snakeX, y : snakeY};
	if(snakeX < box || snakeX > 17 * box  || snakeY > 17 * box || snakeY < 2 * box || collision(newHead, snake)){
        clearInterval(game);
        context.fillStyle = 'white';
        context.font = "80px Times New Roman";
        context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
    snake.unshift(newHead);
    context.fillStyle = 'white';
    context.font = "50px Times New Roman";
    context.fillText(score, box, 1.5 * box);
}

let game = setInterval(draw, 100);
