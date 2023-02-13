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

// Variables to keep track of the scores
let playerScore = 0;
let computerScore = 0;

// Function to update the scores when a player wins
function updateScores(winner) {
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }
  // Display the updated scores
  document.getElementById("playerScore").innerHTML = playerScore;
  document.getElementById("computerScore").innerHTML = computerScore;
}

// Example usage:
updateScores("player1");
//updateScores("player2");


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

function pickComputerMove() {
    //loop through gamestate and find an available spot
    while (true) {
        var move = Math.floor(Math.random()*8);
        if (gameState[move] == '') //lookinh for an empty cell
            break
    }
    //move will have the computer move
    gameState[move] = currentPlayer;
    document.getElementById(move).innerHTML = currentPlayer
}

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





//C:\Users\Priyal\github-classroom\cop4808-spring-2023-fullstack-web\hw3-tic-tac-toe-js-priyalptl\index.html