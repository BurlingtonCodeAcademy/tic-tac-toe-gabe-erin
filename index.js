// load();

// function load() {
//   alert("Get ready to play the coolest game you've ever played!")
// }

// assigning variables
let playerOne = "";
let playerTwo = "";
let clockCount = 0;
let interval;
let timer = 0;
let currentPlayer = "x";
let usedCellArray = [];
let gameMode = "twoPlayer";

// initializing variables with DOM scripting
let startBtn = document.getElementById("start");
let onePlayer = document.getElementById("onePlayer");
let twoPlayer = document.getElementById("twoPlayer");
let playerOneName = document.getElementById("playerOne");
let playerTwoName = document.getElementById("playerTwo");
let status = document.getElementById("status-bar");
let clock = document.getElementById("clock");
let cells = Array.from(document.getElementsByTagName("td"));
let cellOne = document.getElementById("cell-1");
let cellTwo = document.getElementById("cell-2");
let cellThree = document.getElementById("cell-3");
let cellFour = document.getElementById("cell-4");
let cellFive = document.getElementById("cell-5");
let cellSix = document.getElementById("cell-6");
let cellSeven = document.getElementById("cell-7");
let cellEight = document.getElementById("cell-8");
let cellNine = document.getElementById("cell-9");

startBtn.disabled = true;

twoPlayer.addEventListener("click", () => {
  twoPlayer.disabled = true;
  onePlayer.disabled = true;
  startBtn.disabled = false;
});

onePlayer.addEventListener("click", () => {
  twoPlayer.disabled = true;
  onePlayer.disabled = true;
  startBtn.disabled = false;
  gameMode = "onePlayer";
});

startBtn.addEventListener("click", () => {
  start();
  onePlayer.disabled = true;
  twoPlayer.disabled = true;
});

twoPlayer.addEventListener("mouseover", (event) => {
  event.target.style.color = "#42aff7";
});

twoPlayer.addEventListener("mouseout", (event) => {
  event.target.style.color = "black";
});

onePlayer.addEventListener("mouseover", (event) => {
  event.target.style.color = "#42aff7";
});

onePlayer.addEventListener("mouseout", (event) => {
  event.target.style.color = "black";
});

startBtn.addEventListener("mouseover", (event) => {
  event.target.style.color = "#42aff7";
});

startBtn.addEventListener("mouseout", (event) => {
  event.target.style.color = "black";
});

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
  cellNine,
];

// all the possible combinations to win the game
let WINNING_COMBOS = {
  rowOne: [cellOne, cellTwo, cellThree],
  rowTwo: [cellFour, cellFive, cellSix],
  rowThree: [cellSeven, cellEight, cellNine],
  columnOne: [cellOne, cellFour, cellSeven],
  columnTwo: [cellTwo, cellFive, cellEight],
  columnThree: [cellThree, cellSix, cellNine],
  forwardSlash: [cellThree, cellFive, cellSeven],
  backSlash: [cellOne, cellFive, cellNine],
};

function capitalize(string) {
  string = string[0].toUpperCase() + string.slice(1).toLowerCase();
  return string;
}

// function to add to the unclicked cell
function clicked(event) {
  event.target.textContent = currentPlayer;
  // currentPlayer === 'x' ? 'o' : 'x';
  event.target.removeEventListener("click", clicked);
  event.target.addEventListener("click", alreadyClicked);
  usedCellArray.push(event.target);

  let win = checkWin();

  if (win) {
    if (currentPlayer === "x") {
      status.textContent = `${capitalize(playerOne)} wins!`;
    } else if (currentPlayer === "o") {
      status.textContent = `${capitalize(playerTwo)} wins!`;
    }
    stopPlay(cellArray);
    endGame();
    clearInterval(interval);
    clockCount = 0;
    startBtn.disabled = true;
  } else if (parseInt(usedCellArray.length) === 9) {
    status.textContent = `It's a draw!`;
    stopPlay(cellArray);
    endGame();
    clearInterval(interval);
    clockCount = 0;
  } else {
    if (gameMode === "onePlayer") {
      if (currentPlayer === "x") {
        stopPlay(cellArray);
        currentPlayer = "o";
        status.textContent = `${capitalize(playerTwo)}'s turn!`;
        let randomCell = cellArray[Math.floor(Math.random() * 9)];
        while (randomCell.textContent !== "" && randomCell) {
          randomCell = cellArray[Math.floor(Math.random() * 9)];
        }
        randomCell.removeEventListener("click", alreadyClicked);
        randomCell.addEventListener("click", clicked);
        randomCell.click();
        if (checkWin()) {
          stopPlay(cellArray);
          endGame();
          clearInterval(interval);
          clockCount = 0;
          startBtn.disabled = true;
        } else {
          currentPlayer = "x";
          status.textContent = `${capitalize(playerOne)}'s turn!`;
          cellArray.forEach(function (cell) {
            cell.addEventListener("click", alreadyClicked);
            cell.addEventListener("click", clicked);
          });
        }
      } else if (currentPlayer === "o") {
        currentPlayer = "x";
        status.textContent = `${capitalize(playerOne)}'s turn!`;
        cellArray.forEach(function (cell) {
          cell.addEventListener("click", alreadyClicked);
        });
      }
    } else if (gameMode === "twoPlayer") {
      if (currentPlayer === "x") {
        currentPlayer = "o";
        status.textContent = `${capitalize(playerTwo)}'s turn!`;
      } else {
        currentPlayer = "x";
        status.textContent = `${capitalize(playerOne)}'s turn!`;
      }
    }
  }
}

//if the player clicks on an occupied square it alerts them to this
function alreadyClicked() {
  if (gameMode === "onePlayer" && currentPlayer === "o") {
    let randomCell = cellArray[Math.floor(Math.random() * cellArray.length)];
    randomCell.click();
  }
  status.textContent = "Please select an empty cell.";
}

// function to remove event listener on cells after someone has won, also enables relevant buttonage
function stopPlay(cellArray) {
  cellArray.forEach(function (cell) {
    cell.removeEventListener("click", clicked);
    cell.removeEventListener("click", alreadyClicked);
  });
}

function endGame() {
  onePlayer.disabled = false;
  twoPlayer.disabled = false;
  playerOneName.disabled = false;
  playerTwoName.disabled = false;
  currentPlayer = "x";
}

// function to check whether or not the player has won
function checkWin() {
  for (let combo of Object.values(WINNING_COMBOS)) {
    if (combo[0].textContent === "") {
    } else if (
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
    cell.style.backgroundColor = "#a1f4f3";
    cell.style.border = "3px solid #42aff7";
  }
}

// function that starts the game
function start() {
  playerOne = playerOneName.value === "" ? "x" : playerOneName.value;
  playerTwo = playerTwoName.value === "" ? "o" : playerTwoName.value;
  playerOneName.disabled = true;
  playerTwoName.disabled = true;
  startBtn.disabled = true;
  onePlayer.disabled = true;
  twoPlayer.disabled = true;
  clearBoard();
  status.textContent = `${capitalize(playerOne)}'s turn!`;
  cells.forEach((cell) => {
    cell.addEventListener("click", clicked);
  });
  interval = setInterval(() => {
    updateClock();
  }, 1000);
}

// resets the board when someone clicks the start game button
function clearBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
    cell.style.border = "1px solid black";
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
      cellNine,
    ];
  });
}
// our interval
function updateClock() {
  clock.textContent = clockCount;
  clockCount += 1;
}
