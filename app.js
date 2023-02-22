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

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, printBoard };
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
  };
}

//create player objects with a factory
const Player = (name) => {
  //pick a square
};

//make a gameplay object
const gamePlay = (function () {
  //keep track of who's turn
  //can't play the same square twice
  //declare winner and disable gameplay
})();
