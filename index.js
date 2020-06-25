let playerOne = '';
let playerTwo = '';
let clockCount = 0;
let interval;

let startBtn = document.getElementById('start');
let playerOneName = document.getElementById('playerOne')
let playerTwoName = document.getElementById('playerTwo')
let player = 'x';
let status = document.getElementById('status-bar');
let clock = document.getElementById('clock');
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
        if (player === 'x') {
            status.textContent = `${playerOne} wins!`
        } else {
            status.textContent = `${playerTwo} wins!`
        }
        cells.forEach((cell) => {
            cell.removeEventListener('click', clicked);
            cell.removeEventListener('click', alreadyClicked)
        })
        clearInterval(interval);
        clockCount = 0;
    } else {
        if (player === 'x') {
            player = 'o';
            status.textContent = `It's ${playerTwo}'s turn!`
        } else {
            player = 'x';
            status.textContent = `It's ${playerOne}'s turn!`
        }

    }
}

function alreadyClicked() {
    status.textContent = 'Please select an empty cell.';
}

startBtn.addEventListener('click', () => {
    start();
})

function stopPlay(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener('click', clicked)
    })
}

function checkWin() {
    for (let combo of Object.values(WINNING_COMBOS)) {
        if (combo[0].textContent === '') {
        } else if (
            combo[0].textContent === combo[1].textContent &&
            combo[0].textContent === combo[2].textContent
        ) {
            markWinner(combo);
            status.textContent = `Player ${player} wins!`;
            startBtn.disabled = false;
            stopPlay(cellArray);
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

function start() {
    playerOne = (playerOneName.value === '' ? 'x' : playerOneName.value);
    playerTwo = (playerTwoName.value === '' ? 'o' : playerTwoName.value);
    playerOneName.value
    playerOneName.disabled = true;
    playerTwoName.disabled = true;
    player = playerOne;
    startBtn.disabled = true;
    clearBoard();
    status.textContent = `Player ${player}'s turn!`
    cells.forEach((cell)=> {
        cell.addEventListener('click', clicked)
    })
    interval = setInterval(()=>{updateClock()}, 1000)
}

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
//our interval 
function updateClock() {
    clock.textContent = clockCount;
    clockCount += 1;
}