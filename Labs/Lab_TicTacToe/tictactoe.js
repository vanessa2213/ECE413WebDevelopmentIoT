//const { clearTimeout } = require("timers");

let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
    MORE_MOVES_LEFT: 1,
    HUMAN_WINS: 2,
    COMPUTER_WINS: 3,
    DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // Setup the click event for the "New game" button
    const newBtn = document.getElementById("newGameButton");
    newBtn.addEventListener("click", newGame);

    // Create click-event handlers for each game board button
    const buttons = getGameBoardButtons();
    for (let button of buttons) {
        button.addEventListener("click", function() { boardButtonClicked(button); });
    }

    // Clear the board
    newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
    return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {

    const buttons = getGameBoardButtons();

    // Ways to win
    const possibilities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6] // diagonals
    ];

    // Check for a winner first
    for (let indices of possibilities) {
        if (buttons[indices[0]].innerHTML !== "" &&
            buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
            buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {

            // Found a winner
            if (buttons[indices[0]].innerHTML === "X") {
                return gameStatus.HUMAN_WINS;
            } else {
                return gameStatus.COMPUTER_WINS;
            }
        }
    }

    // See if any more moves are left

    for (let button of buttons) {
        if (button.innerHTML !== "X" && button.innerHTML !== "O") {
            return gameStatus.MORE_MOVES_LEFT;
        }
    }

    // If no winner and no moves left, then it's a draw
    return gameStatus.DRAW_GAME;
}

function newGame() {
    // TODO: Complete the function
    clearTimeout(computerMoveTimeout);
    computerMoveTimeout = 0;
    const buttons = getGameBoardButtons();
    buttons.forEach(function(button) {
        button.innerHTML = "";
        button.removeAttribute("disabled");
        if (button.className == "x") button.classList.remove("x")
        else if (button.className == "o") button.classList.remove("o")
    });

    playerTurn = true;
    document.getElementById("turnInfo").innerText = "Your turn";

}

function boardButtonClicked(button) {
    // TODO: Complete the function
    if (playerTurn) {
        button.innerHTML = "X";
        button.classList.add("x");
        button.setAttribute("disabled", true);

        switchTurn();
    }
}

function switchTurn() {
    // TODO: Complete the function

    let status = checkForWinner();
    if (status == gameStatus.MORE_MOVES_LEFT) {
        //computerMoveTimeout = setTimeout(makeComputerMove(), 1000);
        if (playerTurn === true) {

            playerTurn = false;
            document.getElementById("turnInfo").innerText = "Computer's turn";
            computerMoveTimeout = setTimeout(makeComputerMove, 1000);

        } else {
            document.getElementById("turnInfo").innerText = "Your turn";
            playerTurn = true;
        }

    } else {
        playerTurn = false;

        if (status == gameStatus.HUMAN_WINS) document.getElementById("turnInfo").innerText = "You win!";
        else if (status == gameStatus.COMPUTER_WINS) document.getElementById("turnInfo").innerText = "Computer wins!";
        else if (status == gameStatus.DRAW_GAME) document.getElementById("turnInfo").innerText = "Draw game";
    }
}

function makeComputerMove() {
    // TODO: Complete the function
    //1.Choose a random, available button, and set the button's inner HTML to "O".
    let buttons = getGameBoardButtons();

    var i = Math.floor(Math.random() * 9)
    while (buttons[i].innerHTML != "") {
        i = Math.floor(Math.random() * 9);
    }
    buttons[i].innerHTML = "O";
    //2.Add the "o" class to the button.
    buttons[i].classList.add("o");
    //3.Set the button's disabled attribute to true.
    buttons[i].setAttribute("disabled", true);

    //4.Call switchTurn() at the end of the function to switch back to the player's turn.
    switchTurn();

}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}