
const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "x";
let gameState = ["", "", "", "", "", "", "", "", ""]; 

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`; 

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  
  const human = "X";
  const computer = "O";

  const winningCombinations = [  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
];

function getEmptySpaces(board) {
    let spaces = [];
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          spaces.push([i, j]);
        }
      }
    }
  
    return spaces;
  }
  
  function checkForWin(board) {
    for (let i = 0; i < winningCombinations.length; i++) {
      let combination = winningCombinations[i];
      let a = combination[0];
      let b = combination[1];
      let c = combination[2];
  
      if (
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[b[0]][b[1]] === board[c[0]][c[1]] &&
        board[a[0]][a[1]] !== ""
      ) {
        return combination;
      }
    }
  
    return null;
  }
  
  function highlightWinningSquares(winningSquares) {
    for (let i = 0; i < winningSquares.length; i++) {
      let square = winningSquares[i];
      let row = square[0];
      let col = square[1];
      let id = `square-${row}-${col}`;
  
      let squareEl = document.getElementById(id);
      squareEl.classList.add("winning-square");
    }
  }
  
  // Example usage:
  let winningSquares = checkForWin(gameBoard);
  if (winningSquares) {
    highlightWinningSquares(winningSquares);
  }

const cell1 = document.querySelector('#c1');
const cell2 = document.querySelector('#c2');
const cell3 = document.querySelector('#c3');
const cell4 = document.querySelector('#c4');
const cell5 = document.querySelector('#c5');
const cell6 = document.querySelector('#c6');
const cell7 = document.querySelector('#c7');
const cell8 = document.querySelector('#c8');
const cell9 = document.querySelector('#c9');
const cells = document.querySelectorAll('.cell');
  
  /*function getEmptySpaces(board) {
    let spaces = [];
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          spaces.push([i, j]);
        }
      }
    }
  
    return spaces;
  } */
  
  function makeComputerMove(board) {
    let spaces = getEmptySpaces(board);
    let randomIndex = Math.floor(Math.random() * spaces.length);
    let randomSpace = spaces[randomIndex];
  
    board[randomSpace[0]][randomSpace[1]] = computer;
  }
  
  makeComputerMove(gameBoard);

  function randomStart() {
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
      makeComputerMove(gameBoard);
    }
  }
  
  randomStart();

  /*function checkWin(board, player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        return true;
      }
    }
  
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }
  
    return false;
  } */
  
  function checkDraw(board) {
    let spaces = getEmptySpaces(board);
    return spaces.length === 0;
  }
  
  function checkGameOver(board) {
    return checkWin(board, human) || checkWin(board, computer) || checkDraw(board);
  }
  
  while (!checkGameOver(gameBoard)) {
    makeComputerMove(gameBoard);
  }
  
  if (checkWin(gameBoard, human)) {
    console.log("You win!");
  } else if (checkWin(gameBoard, computer)) {
    console.log("The computer wins!");
  } else {
    console.log("It's a draw!");
  }




// Variables to keep track of the scores
let playerScore = 0;
let computerScore = 0;

// Function to update the scores in the HTML
function updateScores() {
  let playerScoreEl = document.getElementById("player-score");
  playerScoreEl.textContent = playerScore;

  let computerScoreEl = document.getElementById("computer-score");
  computerScoreEl.textContent = computerScore;
}

// Update the scores when the game is over
function onGameOver(result) {
  if (result === "player") {
    playerScore++;
  } else if (result === "computer") {
    computerScore++;
  }
  updateScores();
}


function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    if (currentPlayer == "0") {
        computerPlay();
    }
    console.log("Exiting handlePlayerChange");
}

function checkWin() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundWon;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundDraw;
    }
    return false;
} 

function handleResultValidation () {
    checkWin()
    if (gameActive) {
        handlePlayerChange();
        handleComputerMove();
    }
}

function handleComputerMove() {
    pickComputerMove()
    if(!checkWin())
        handlePlayerChange()
}

/*function pickComputerMove() {
    //loop through gamestate and find an available spot
    while (true) {
        var move = Math.floor(Math.random()*9);
        if (gameState[move] == '') //lookinh for an empty cell
            break
    }
    //move will have the computer move
    gameState[move] = currentPlayer;
    document.getElementById(move).innerHTML = currentPlayer
}*/

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);





