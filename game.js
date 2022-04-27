import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime=0;
let gameOver=false;
const gameboard=document.getElementById('game-board');


function main(currentTime){
    if (gameOver){
        if (confirm('You lost! Press OK to restart!')){
            window.location='/';
        }
        return;
    }
    
    
    
    window.requestAnimationFrame(main);
    const secondsSinceLastRender=(currentTime-lastRenderTime)/1000 //converting miliseconds to seconds by dividing by 1000.
    if (secondsSinceLastRender<1/SNAKE_SPEED) return;


    // console.log('Render');
    lastRenderTime=currentTime;


    
    //Setting up the Logic for the game-->
    update();
    draw();
}

window.requestAnimationFrame(main)

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}
function draw(){
    gameboard.innerHTML='';
    drawSnake(gameboard); 
    drawFood(gameboard);
}
function checkDeath(){
    gameOver=outsideGrid(getSnakeHead()) || snakeIntersection();
}