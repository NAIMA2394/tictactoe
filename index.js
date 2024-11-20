const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameActive = true;
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== null)) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for win
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}