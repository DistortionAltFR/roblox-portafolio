// Tic-Tac-Toe Game Module - Handles TTT game logic and rendering

let board = Array(9).fill('');
let gameActive = true;
const player = 'X';
const ai = 'O';

export function initTTT() {
    const boardEl = document.getElementById('ttt-board');
    boardEl.innerHTML = '';
    board = Array(9).fill('');
    gameActive = true;
    document.getElementById('ttt-status').innerText = 'YOUR TURN (X)';
    document.getElementById('ttt-reset').classList.add('hidden');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardEl.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== '' || !gameActive) return;
    makeMove(index, player);
    if (!checkGameEnd(player)) {
        gameActive = false;
        document.getElementById('ttt-status').innerText = 'AI THINKING...';
        setTimeout(aiMove, 400);
    }
}

function makeMove(index, symbol) {
    board[index] = symbol;
    const cells = document.querySelectorAll('.cell');
    cells[index].innerText = symbol;
    cells[index].classList.add(symbol.toLowerCase());
}

function aiMove() {
    let bestScore = -Infinity;
    let move;
    for(let i=0; i<9; i++) {
        if(board[i] === '') {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = '';
            if(score > bestScore) { bestScore = score; move = i; }
        }
    }
    makeMove(move, ai);
    gameActive = true;
    checkGameEnd(ai);
}

function minimax(board, depth, isMaximizing) {
    if (checkWin(board, ai)) return 10 - depth;
    if (checkWin(board, player)) return depth - 10;
    if (!board.includes('')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for(let i=0; i<9; i++) {
            if(board[i] === '') {
                board[i] = ai;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for(let i=0; i<9; i++) {
            if(board[i] === '') {
                board[i] = player;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWin(b, s) {
    const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    return wins.some(w => w.every(i => b[i] === s));
}

function checkGameEnd(turnPlayer) {
    if (checkWin(board, turnPlayer)) {
        endGame(turnPlayer === player ? 'YOU WON!' : 'AI WINS');
        return true;
    } else if (!board.includes('')) {
        endGame('DRAW');
        return true;
    }
    document.getElementById('ttt-status').innerText = turnPlayer === player ? 'AI THINKING...' : 'YOUR TURN (X)';
    return false;
}

function endGame(msg) {
    gameActive = false;
    document.getElementById('ttt-status').innerText = msg;
    document.getElementById('ttt-reset').classList.remove('hidden');
}

// Make resetTTT accessible globally
window.resetTTT = initTTT;
