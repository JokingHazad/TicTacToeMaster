const cells = document.querySelectorAll('.cell');
const singlePlayerBtn = document.getElementById('singleplayer');
const multiPlayerBtn = document.getElementById('multiplayer');
const themeToggleBtn = document.getElementById('theme-toggle');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupRestart = document.getElementById('popup-restart');

let currentPlayer = 'X';
let board = Array(9).fill('');
let isSinglePlayer = false;
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Theme toggle
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Start the game in chosen mode
singlePlayerBtn.addEventListener('click', () => {
  resetGame();
  isSinglePlayer = true;
});

multiPlayerBtn.addEventListener('click', () => {
  resetGame();
  isSinglePlayer = false;
});

// Handle cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || board[index]) return;
    makeMove(index, currentPlayer);
    if (isSinglePlayer && gameActive) aiMove();
  });
});

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add('taken');
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      showPopup(`${board[a]} Wins!`);
      return;
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    showPopup("It's a Draw!");
  }
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.add('active');
}

function resetGame() {
  board.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  popup.classList.remove('active');
  currentPlayer = 'X';
  gameActive = true;
}

function aiMove() {
  const availableCells = board.map((cell, i) => (cell === '' ? i : null)).filter(i => i !== null);
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  makeMove(randomIndex, 'O');
}

popupRestart.addEventListener('click', resetGame);

const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', resetGame);

function resetGame() {
  board.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  popup.classList.remove('active'); // Hide the popup if visible
  currentPlayer = 'X'; // Reset to Player X's turn
  gameActive = true; // Reactivate the game
}
