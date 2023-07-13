let board = document.querySelector('.board');
let cells = document.querySelectorAll(".cell");
let resetGameBtn = document.querySelector("#resetGame");
let resetScore = document.querySelector("#resetScore");
let winnerDiv = document.querySelector(".winner");
let playerxScoreSpan = document.querySelector(".xScore");
let playeroScoreSpan = document.querySelector(".oScore");
cells = Array.from(cells);

let currentPlayer = "X";
let winner = "";
let playerxScore = 0;
let playeroScore = 0;
let winConditions = [
    [
        0, 1, 2
    ],
    [
        3, 4, 5
    ],
    [
        6, 7, 8
    ],
    [
        0, 3, 6
    ],
    [
        1, 4, 7
    ],
    [
        2, 5, 8
    ],
    [
        0, 4, 8
    ],
    [2, 4, 6]
];

playerxScoreSpan.innerText = playerxScore;
playeroScoreSpan.innerText = playeroScore;

function checkWinner() {

    let isDraw = true;

    for (let i = 0; i < winConditions.length; i++) {
        if (cells[winConditions[i][0]].innerText != "" && cells[winConditions[i][0]].innerText === cells[winConditions[i][1]].innerText && cells[winConditions[i][1]].innerText === cells[winConditions[i][2]].innerText) {
            winner = currentPlayer;
            highlightCells([winConditions[i][0], winConditions[i][1], winConditions[i][2]
            ]);
            winnerDiv.innerText = `Player ${currentPlayer} Won`

            currentPlayer == "X"
                ? playerxScore += 1
                : playeroScore += 1;
            playerxScoreSpan.innerText = playerxScore;
            playeroScoreSpan.innerText = playeroScore;
            return;
        }
    }

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText === "") {
            isDraw = false;
            break;
        }
    }

    if (isDraw) {
        winnerDiv.innerText = "It's a Draw"
    }
};

function highlightCells(combination) {
    for (let i = 0; i < combination.length; i++) {
        cells[combination[i]]
            .classList
            .add("highlight");
    }
}

function resetGame() {
    board.innerHTML = `<div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>`;

    cells = document.querySelectorAll(".cell");
    cells = Array.from(cells);
    addClickEvent();
    winner = "";
    winnerDiv.innerText = "";
}

resetGameBtn.addEventListener("click", resetGame);

resetScore.addEventListener("click", function () {
    playerxScore = 0;
    playeroScore = 0;

    playerxScoreSpan.innerText = playerxScore;
    playeroScoreSpan.innerText = playeroScore;

    resetGame()
})

function addClickEvent() {
    cells
        .forEach(function (cell) {
            cell
                .addEventListener("click", function () {
                    if (winner !== "") 
                        return
                    if (cell.innerText != "") 
                        return;
                    cell.innerText = currentPlayer;
                    checkWinner();
                    currentPlayer = currentPlayer == "X"
                        ? "O"
                        : "X";
                });
        });
}

addClickEvent();