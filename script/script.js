let cells = document.querySelectorAll(".cell");
cells = Array.from(cells);

let currentPlayer = "X";
let winner = "";
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

function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        if (cells[winConditions[i][0]].innerText != "" && cells[winConditions[i][0]].innerText === cells[winConditions[i][1]].innerText && cells[winConditions[i][1]].innerText === cells[winConditions[i][2]].innerText) {
            winner = currentPlayer;
            highlightCells([winConditions[i][0], winConditions[i][1], winConditions[i][2]
            ]);
        }
    }
};

function highlightCells(combination) {
    for (let i = 0; i < combination.length; i++) {
        cells[combination[i]]
            .classList
            .add("highlight");
    }
}

cells
    .forEach(function (cell) {
        cell
            .addEventListener('click', function () {
                if (cell.innerText.trim() != "") 
                    return;
                cell.innerText = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer == "X"
                    ? "O"
                    : "X";
            })
    })