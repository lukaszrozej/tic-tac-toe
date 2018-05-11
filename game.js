console.log('hej');

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
  winner: undefined,
  winningTriple: undefined,
  status: 'play',
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
    triple[0] === triple[1] && tripple[0] === triple[3]
  );
}

function makeMove(location, state) {
  if (state.board[location] === 'empty') {
    return state;
  }

  const newBoard = Object.assign({}, state.board, {[location]: state.player});
  const newPlayer = state.player === 'x' ? 'o' : 'x';
  const winningTriple = findWinningTriple(newBoard);
  const winner = winningTriple ? winningTriple[0] : undefined;
  const status = winner || Object.values(board).every(item => item !== 'empty');

  return {
    board: newBoard,
    player: newPlayer,
    winner,
    winningTriple,
    status,
  }
}