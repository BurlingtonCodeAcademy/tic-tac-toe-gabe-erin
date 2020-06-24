let startBtn = document.getElementById('start');
let currentPlayer = 'x';
let form1 = document.getElementById('player1');
let form2 = document.getElementById('player2');
let player1 = 'x';
let player2 = 'o';
let statusBar = document.getElementById('status-bar');
let cells = document.getElementsByTagName('td');
let cellOne = document.getElementById('1')
let cellTwo = document.getElementById('2')
let cellThree = document.getElementById('3')
let cellFour = document.getElementById('4')
let cellFive = document.getElementById('5')
let cellSix = document.getElementById('6')
let cellSeven = document.getElementById('7')
let cellEight = document.getElementById('8')
let cellNine = document.getElementById('9')
let usedCellArray = [];
let cellArray = [
    cellOne,
    cellTwo,
    cellThree,
    cellFour,
    cellFive,
    cellSix,
    cellSeven,
    cellEight,
    cellNine
]

form1.addEventListener('submit', () => {
    player1 = document.getElementsByTagName()
})

let winner = false;

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    startGame();
})

let WINNING_COMBOS = {
    rowOne: [cellOne, cellTwo, cellThree],
    rowTwo: [cellFour, cellFive, cellSix],
    rowThree: [cellSeven, cellEight, cellNine],
    columnOne: [cellOne, cellFour, cellSeven],
    columnTwo: [cellTwo, cellFive, cellEight],
    columnThree: [cellThree, cellSix, cellNine],
    forwardSlash: [cellThree, cellFive, cellSeven],
    backSlash: [cellOne, cellFive, cellNine]
}

function stopPlay(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener('click', fillSquare)
    })
}

function checkWin() {
    for (let combo of Object.values(WINNING_COMBOS)) {
        if (combo[0].textContent === '') {
        } else if (
            combo[0].textContent === combo[1].textContent &&
            combo[0].textContent === combo[2].textContent
        ) {
            winner = true;
            markWinner(combo);
            statusBar.textContent = `Player ${currentPlayer} wins!`;
            startBtn.disabled = false;
            stopPlay(cellArray);
        }
    }
}

function markWinner(combo){
    for(let cell of combo){
        cell.style.backgroundColor = 'green';
        cell.style.border = '3px solid red'
    }
}

function changePlayer() {
    if (currentPlayer === 'x') {
        currentPlayer = 'o';
    } else {
        currentPlayer = 'x';
    }
    statusBar.textContent = `It's Player ${currentPlayer}'s turn!`
}

function startGame() {
    winner = false;
    for (let cell of cells) {
        cell.textContent = '';
        cell.style.backgroundColor = 'white';
        cell.style.border = '1px solid black';
        usedCellArray = [];
        cellArray = [
            cellOne,
            cellTwo,
            cellThree,
            cellFour,
            cellFive,
            cellSix,
            cellSeven,
            cellEight,
            cellNine
        ]
    }
    if(winner === false) {
        for (let cell of cells) {
            cell.addEventListener('click', (event) => {
                if(usedCellArray.includes(event.target)){
                    statusBar.textContent = "Please select an empty cell.";
                    console.log(usedCellArray)
                } else {
                cell.textContent = currentPlayer;
                usedCellArray.push(event.target);
                cellArray.splice(cellArray.indexOf(event.target), 1);
                checkWin();
                changePlayer();
            }
            })
        }
        }
}