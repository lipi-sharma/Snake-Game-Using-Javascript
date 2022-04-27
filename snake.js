import { getInputDirection } from "./input.js";


//We can directly control how fast our snake will move in the game, directly using this exact variable names as SNAKE_SPEED here. 

export const SNAKE_SPEED=7;     //how many times the snake moves per second.
let newSegments=0;

const snakeBody=[{x: 11, y: 11}]; 


export function update(){
    addSegments(); 
    
    const inputDirection=getInputDirection();
    for(let i= snakeBody.length -2; i>=0; i--)
    {
        snakeBody[i+1]={ ...snakeBody[i] };
    }
    snakeBody[0].x+=inputDirection.x;
    snakeBody[0].y+=inputDirection.y;
}



export function draw(gameboard){
    snakeBody.forEach(segment => {
        const snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=segment.y;
        snakeElement.style.gridColumnStart=segment.x;
        snakeElement.classList.add('snake');
        gameboard.appendChild(snakeElement);
    })
}

export function expandSnake(amount){
    newSegments+=amount;
}

export function onSnake(position, {ignoreHead=false} = {}){
    return snakeBody.some((segment, index)=>{  //here 'some' means 'any (position)'
        if (ignoreHead && index===0) return false;
        return equalPositions(segment,position );
    })
}



export function getSnakeHead(){
    return snakeBody[0]; //means it's always going to be the Head.
}



export function snakeIntersection(){
    return onSnake(snakeBody[0], { ignoreHead: true });
}



function equalPositions(pos1,pos2){
    return pos1.x===pos2.x && pos1.y===pos2.y;
}



function addSegments(){
    for (let i=0; i<newSegments; i++)
    {
        snakeBody.push({ ...snakeBody[snakeBody.length -1]}); //So, we're just taking the last element of the snake and DUPLICATING it on to the end of our snake. 
    }

    newSegments=0;
}