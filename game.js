// Game logic

const initialState = {
  board: {
    'top-left': 'empty',
    'top': 'empty',
    'top-right': 'empty',
    'left': 'empty',
    'center': 'empty',
    'right': 'empty',
    'bottom-left': 'empty',
    'bottom': 'empty',
    'bottom-right': 'empty',
  },
  player: 'x',
  winner: 'Nobody',
  winningTriple: undefined,
  finished: false,
};

function findWinningTriple(board) {
  const triples = [
    ['top-left', 'top', 'top-right'],
    ['left', 'center', 'right'],
    ['bottom-left', 'bottom', 'bottom-right'],
    ['top-left', 'left', 'bottom-left'],
    ['top', 'center', 'bottom'],
    ['top-right', 'right', 'bottom-right'],
    ['top-left', 'center', 'bottom-right'],
    ['top-right', 'center', 'bottom-left'],
  ];

  return triples.find(triple =>
    board[triple[0]] === board[triple[1]] &&
    board[triple[0]] === board[triple[2]]
  );
}

function makeMove(location, state) {
  if (state.board[location] !== 'empty') {
    return state;
  }

  const newBoard = Object.assign({}, state.board, {[location]: state.player});
  const newPlayer = state.player === 'x' ? 'o' : 'x';
  const winningTriple = findWinningTriple(newBoard);
  const winner = winningTriple ? newBoard[winningTriple[0]] : 'Nobody';
  const finished =
    winner !== undefined ||
    Object.values(newBoard).every(item => item !== 'empty');

  return {
    board: newBoard,
    player: newPlayer,
    winner,
    winningTriple,
    finished,
  }
}

// Presentation

const $squares = {};
document.querySelectorAll('.board td').forEach(square => $squares[square.id] = square);
const $message = document.querySelector('#message');
const $winner = document.querySelector('#winner');

function render(state) {
  Object.entries(state.board)
    .forEach(([location, content]) =>
      $squares[location].className = content
    );

  if (!state.finished) return;

  $message.className = 'show';
  $winner.textContent = state.winner;

  // TODO: render winning triple
}

let s = initialState;
s = makeMove('top', s);
s = makeMove('left', s);
s = makeMove('center', s);
s = makeMove('right', s);
s = makeMove('bottom', s);
render(s);