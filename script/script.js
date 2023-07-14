const board = document.querySelector('.board');
let cells = document.querySelectorAll(".cell");
const resetGameBtn = document.querySelector("#resetGame");
const resetScore = document.querySelector("#resetScore");
const winnerDiv = document.querySelector(".winner");
const playerxScoreSpan = document.querySelector(".xScore");
const playeroScoreSpan = document.querySelector(".oScore");
cells = Array.from(cells);

let currentPlayer = "X";
let winner = "";
let playerxScore = JSON.parse(localStorage.getItem("playerxScore")) || 0;
let playeroScore = JSON.parse(localStorage.getItem("playeroScore")) || 0;
const winConditions = [
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
        let cellOneIndex = winConditions[i][0];
        let cellTwoIndex = winConditions[i][1];
        let cellThreeIndex = winConditions[i][2];
        // checking for a win condition
        if (cells[cellOneIndex].innerText != "" && cells[cellOneIndex].innerText === cells[cellTwoIndex].innerText && cells[cellOneIndex].innerText === cells[cellThreeIndex].innerText) {
            winner = currentPlayer;
            highlightCells([cellOneIndex, cellTwoIndex, cellThreeIndex
            ]);
            winnerDiv.innerText = `Player ${currentPlayer} Won`;

            // incrementing the score of the winner
            currentPlayer === "X"
                ? playerxScore += 1
                : playeroScore += 1;
            playerxScoreSpan.innerText = playerxScore;
            playeroScoreSpan.innerText = playeroScore;

            localStorage.setItem("playerxScore", playerxScore);
            localStorage.setItem("playeroScore", playeroScore);
            return;
        };
    };

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText === "") {
            isDraw = false;
            break;
        };
    };

    if (isDraw) {
        winnerDiv.innerText = "It's a Draw";
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
};

resetGameBtn.addEventListener("click", resetGame);

resetScore.addEventListener("click", function () {
    playerxScore = 0
    playeroScore = 0

    playerxScoreSpan.innerText = playerxScore
    playeroScoreSpan.innerText = playeroScore

    resetGame()

    localStorage.setItem("playerxScore", playerxScore);
    localStorage.setItem("playeroScore", playeroScore);
});

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
};

addClickEvent();