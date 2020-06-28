let startBtn = document.getElementById('start');
let form1 = document.getElementById('player1');
let form2 = document.getElementById('player2');
let player1 = 'x';
let player2 = 'o';
let player = 'x';
let status = document.getElementById('status-bar');
let cells = Array.from(document.getElementsByTagName('td'));
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


function clicked(event) {
    event.target.textContent = player;
    // player === 'x' ? 'o' : 'x';
    event.target.removeEventListener('click', clicked);
    event.target.addEventListener('click', alreadyClicked);
    usedCellArray.push(event);
    cellArray.splice(cellArray.indexOf(event), 1);
    checkWin();


    let win = checkWin();

    if(win) {
        for (let combo of Array.from(WINNING_COMBOS)) {
            markWinner(combo)
        }
        status.textContent = `Player ${player} wins!`
        cells.forEach((cell) => {
            cell.removeEventListener('click', clicked);
            cell.removeEventListener('click', alreadyClicked)
        })
        startBtn.disabled = false;
        startBtn.textContent = 'Play Again!'
        clearBoard();
    } else {
        changePlayer();
    }
}

function alreadyClicked() {
    status.textContent = 'Please select an empty cell.';
}

form1.addEventListener('submit', () => {
    player1 = document.getElementsByTagName('input')[0].textContent;
    console.log(player1)
})

startBtn.addEventListener('click', () => {
    start();
})

function clearBoard() {
    cells.forEach((cell)=> {
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
    })
}

function checkWin() {
    for (let combo of Object.values(WINNING_COMBOS)) {
        if (combo[0].textContent === '') {
        } else if (
            combo[0].textContent === combo[1].textContent &&
            combo[0].textContent === combo[2].textContent
        ) {
            return true;
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
    if (player === 'x') {
        player = 'o';
    } else {
        player = 'x';
    }
    status.textContent = `It's Player ${player}'s turn!`
}

function start() {
    startBtn.disabled = true;
    clearBoard();
    status.textContent = `Player ${player}'s turn!`
    cells.forEach((cell)=> {
        cell.addEventListener('click', clicked);
        cell.textContent = '';
    })

}