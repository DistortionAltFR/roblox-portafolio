// Snake Game Module - Handles snake game logic and rendering

const sCanvas = document.getElementById('snake-game');
const sCtx = sCanvas.getContext('2d');
const tileCount = 20;

let gridSize = sCanvas.width / tileCount;
let snake = [];
let food = {x: 15, y: 15};
let velocity = {x: 0, y: 0};
let score = 0;
let isSnakeRunning = false;
let lastGameTime = 0;
let snakeSpeed = 100;
let inputQueue = [];

export function startSnake() {
    document.getElementById('snake-overlay').classList.add('hidden');
    snake = [{x: 10, y: 10}, {x:9, y:10}, {x:8, y:10}];
    score = 0;
    velocity = {x: 1, y: 0};
    inputQueue = [];
    document.getElementById('snake-score-display').innerText = score;
    
    if (!isSnakeRunning) {
        isSnakeRunning = true;
        requestAnimationFrame(snakeLoop);
    }
    window.addEventListener('keydown', handleKeyInput);
}

export function stopSnake() {
    isSnakeRunning = false;
    window.removeEventListener('keydown', handleKeyInput);
}

function snakeLoop(timestamp) {
    if (!isSnakeRunning) return;
    requestAnimationFrame(snakeLoop);

    if (timestamp - lastGameTime < snakeSpeed) return;
    lastGameTime = timestamp;

    updateSnake();
    drawSnake();
}

function handleKeyInput(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    const key = e.key;
    const lastInput = inputQueue.length > 0 ? inputQueue[inputQueue.length - 1] : null;
    
    if (lastInput !== key) {
        inputQueue.push(key);
    }
}

function processInput() {
    if (inputQueue.length === 0) return;

    const key = inputQueue.shift();
    
    const up = velocity.y === -1;
    const down = velocity.y === 1;
    const left = velocity.x === -1;
    const right = velocity.x === 1;

    if (key === 'ArrowUp' && !down) velocity = {x: 0, y: -1};
    if (key === 'ArrowDown' && !up) velocity = {x: 0, y: 1};
    if (key === 'ArrowLeft' && !right) velocity = {x: -1, y: 0};
    if (key === 'ArrowRight' && !left) velocity = {x: 1, y: 0};
}

function updateSnake() {
    processInput();

    const head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return gameOver();
    }
    
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
        return gameOver();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('snake-score-display').innerText = score;
        placeFood();
        if(snakeSpeed > 50) snakeSpeed -= 1;
    } else {
        snake.pop();
    }
}

function drawSnake() {
    sCtx.fillStyle = 'black';
    sCtx.fillRect(0, 0, sCanvas.width, sCanvas.height);

    sCtx.fillStyle = '#ff0055';
    sCtx.shadowBlur = 10;
    sCtx.shadowColor = '#ff0055';
    sCtx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);
    sCtx.shadowBlur = 0;

    sCtx.fillStyle = '#00ff66';
    snake.forEach((part, index) => {
        if(index === 0) {
           sCtx.fillStyle = '#ccffdd';
        } else {
           sCtx.fillStyle = '#00ff66';
        }
        sCtx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 1, gridSize - 1);
    });
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    if (snake.some(s => s.x === food.x && s.y === food.y)) placeFood();
}

function gameOver() {
    stopSnake();
    document.getElementById('snake-overlay').classList.remove('hidden');
}

// Make startSnake and handleMobileControl accessible globally
window.startSnake = startSnake;
window.handleMobileControl = (key, e) => {
    if(e) e.preventDefault();
    inputQueue.push(key);
};
