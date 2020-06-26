// assigning variables
let playerOne = '';
let playerTwo = '';
let clockCount = 0;
let interval;
let turnCount = 0;

// initializing variables with DOM scripting
let startBtn = document.getElementById('start');
startBtn.disabled = true;
let onePlayer = document.getElementById('onePlayer');
let twoPlayer = document.getElementById('twoPlayer');
let playerOneName = document.getElementById('playerOne')
let playerTwoName = document.getElementById('playerTwo')
let currentPlayer = 'x';
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
let gameMode = '';

function capitalize(string) {
    string = string[0].toUpperCase() + string.slice(1).toLowerCase();
    return string;
}

// assigning individual cells on your game board
// possible clicks
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

// all the possible combinations to win the game
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

twoPlayer.addEventListener('click', () => {
    twoPlayer.disabled = true;
    onePlayer.disabled = true;
    startBtn.disabled = false;
    gameMode = 'twoPlayer';
})

onePlayer.addEventListener('click', () => {
    twoPlayer.disabled = true;
    onePlayer.disabled = true;
    startBtn.disabled = false;
    gameMode = 'onePlayer'
})

// function to add to the unclicked cell 
function clicked(event) {
    cellArray.forEach(function (cell) {
        cell.addEventListener('click', clicked);
        cell.addEventListener('click', alreadyClicked);
    })
    console.log(usedCellArray);
    console.log(usedCellArray.length);
    event.target.textContent = currentPlayer;
    // currentPlayer === 'x' ? 'o' : 'x';
    event.target.removeEventListener('click', clicked);
    event.target.addEventListener('click', alreadyClicked);
    usedCellArray.push(event.target);
    checkWin();


    let win = checkWin();

    if (win) {
        if (currentPlayer === 'x') {
            status.textContent = `${capitalize(playerOne)} wins!`
        } else {
            status.textContent = `${capitalize(playerTwo)} wins!`
        }
        stopPlay(cellArray)
        clearInterval(interval);
        clockCount = 0;
        startBtn.disabled = true;
        onePlayer.disabled = false;
        twoPlayer.disabled = false;
        playerOneName.disabled = false;
        playerTwoName.disabled = false;
    } else if (parseInt(usedCellArray.length) === 9) {
        status.textContent = `It's a draw!`;
        onePlayer.disabled = false;
        twoPlayer.disabled = false;
        playerOneName.disabled = false;
        playerTwoName.disabled = false;
        stopPlay(cellArray)
        clearInterval(interval);
        clockCount = 0;
    } else {
        if (gameMode === 'onePlayer') {
            if (currentPlayer === 'x') {
                stopPlay(cellArray);
                currentPlayer = 'o';
                status.textContent = `${playerTwo}'s turn!`
                let randomCell = cellArray[Math.floor(Math.random() * 9)];
                while (randomCell.textContent !== '' && randomCell) {
                    randomCell = cellArray[Math.floor(Math.random() * 9)];
                }
               setTimeout(()=>{
                   randomCell.addEventListener('click', clicked);
                   randomCell.click()
               }, 1000);
            } else {
                currentPlayer = 'x';
                status.textContent = `${capitalize(playerOne)}'s turn!`;
            }
            } else if (gameMode === 'twoPlayer') {
                if (currentPlayer === 'x') {
                    currentPlayer = 'o';
                    status.textContent = `${capitalize(playerTwo)}'s turn!`
                } else {
                    currentPlayer = 'x';
                    status.textContent = `${capitalize(playerOne)}'s turn!`;
                }
            }
    }
    turnCount += 1;
}

// function that tells the player to select an empty cell if they've selected one that's 
// already in use
function alreadyClicked() {
    if(gameMode === 'onePlayer' && currentPlayer === 'o') {
        let randomCell = cellArray[Math.floor(Math.random() * cellArray.length)];
        randomCell.click();
    }
    status.textContent = 'Please select an empty cell.';
}

startBtn.addEventListener('click', () => {
    start();
    onePlayer.disabled = true;
    twoPlayer.disabled = true;
})

// function to remove event listener on cells after someone has won
function stopPlay(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener('click', clicked);
        cell.removeEventListener('click', alreadyClicked);
    })
}

// function to check whether or not the player has won
function checkWin() {
    for (let combo of Object.values(WINNING_COMBOS)) {
        if (combo[0].textContent === '') { } else if (
            combo[0].textContent === combo[1].textContent &&
            combo[0].textContent === combo[2].textContent
        ) {
            markWinner(combo);
            status.textContent = `${capitalize(currentPlayer)} wins!`;
            startBtn.disabled = false;
            stopPlay(cellArray);
            return true;
        }
    }
}

// function that highlights the winning squares 
function markWinner(combo) {
    for (let cell of combo) {
        cell.style.backgroundColor = '#a1f4f3';
        cell.style.border = '3px solid #42aff7'
    }
}

// function that 
function start() {
    playerOne = (playerOneName.value === '' ? 'x' : playerOneName.value);
    playerTwo = (playerTwoName.value === '' ? 'o' : playerTwoName.value);
    playerOneName.disabled = true;
    playerTwoName.disabled = true;
    startBtn.disabled = true;
    clearBoard();
    status.textContent = `${capitalize(playerOne)}'s turn!`;
    cells.forEach((cell) => {
        cell.addEventListener('click', clicked)
    })
    interval = setInterval(() => {
        updateClock()
    }, 1000)
}

// resets the board when someone clicks the start game button
function clearBoard() {
    cells.forEach((cell) => {
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
// our interval 
function updateClock() {
    clock.textContent = clockCount;
    clockCount += 1;
}