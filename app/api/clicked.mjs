
export async function post(req) {
  let game = req.session.game
  let player = req.session.player;
  let done = req.session.done;
  let pos = parseInt(req.query.pos);

  //Don't allow changes if game is over
  if (!done && game[pos] === "") {
    game[pos] = player;
    player = player === "X" ? "O" : "X";
  }

  return {
    session: {
      game: game,
      player: player,
      done: done
    },
    text: game[pos]
  }
}
