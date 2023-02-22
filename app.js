//make a gameboard object
const gameboard = (function () {
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
})();

function Cell() {
  let value = 0;

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
const gamePlay = (function () {
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
    gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };
  //mark a square
  const takeTurn = (column, row) => {
    if (gameboard.getBoard()[column][row].getValue() !== 0) return;
    console.log(`${getActivePlayer().name} is marking ${column}, ${row} `);
    gameboard.playerMark(column, row, getActivePlayer().name);

    switchPlayerTurn();

    printNewTurn();
  };
  //keep track of who's turn
  return { takeTurn };
  //can't play the same square twice
  //declare winner and disable gameplay
})();
