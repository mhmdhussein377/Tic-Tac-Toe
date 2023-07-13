let cells = document.querySelectorAll(".cell");
cells = Array.from(cells);

let currentPlayer = "X";

cells.forEach(function(cell) {
    cell.addEventListener('click', function() {
        if(cell.innerText.trim() != "") return;
        cell.innerText = currentPlayer;
        currentPlayer = currentPlayer == "X" ? "O" : "X";
    })
})