//make a gameboard object
function Gameboard() {
  //keep track of x's and o's
  //const boardArray = ["X", "X", , "O", "O", , , "X", "O"]
  const rows = 3;
  const columns = 3;
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const playerMark = (column, row, player) =>
    board[column][row].markCell(player);

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, printBoard, playerMark };
  //link array to divs
}

function Cell() {
  let value = " ";

  const markCell = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    getValue,
    markCell,
  };
}

//make a gameplay module
function gameController() {
  const board = Gameboard();

  const players = [
    {
      name: "X",
    },
    {
      name: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewTurn = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  /* const checkEnd = () => {
    if() winner();
    if() draw();
  } */

  const takeTurn = (column, row) => {
    if (board.getBoard()[column][row].getValue() !== " ") return;
    console.log(`${getActivePlayer().name} is marking ${column}, ${row} `);
    board.playerMark(column, row, getActivePlayer().name);

    //checkEnd();

    switchPlayerTurn();

    printNewTurn();
  };

  printNewTurn();

  return { takeTurn, getBoard: board.getBoard };
}

function ScreenController() {
  //refactor to close up the above functions
  const game = gameController();
  const board = game.getBoard();

  boardDiv = document.querySelector(".board");
  //display who's turn

  //render board squares
  const updateScreen = () => {
    boardDiv.textContent = "";

    board.forEach((row) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.rowIndex = index;
        cellButton.dataset.colIndex = board.indexOf(row);
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };
  //for each cell, create a button, with coordinate dataset
  //use css grid to organize the cells

  function boardClickHandler(e) {
    console.log(e.target.dataset.colIndex);
    col = e.target.dataset.colIndex;
    row = e.target.dataset.rowIndex;

    game.takeTurn(col, row);
    updateScreen();
  }
  updateScreen();
  boardDiv.addEventListener("click", boardClickHandler);
}

ScreenController();
