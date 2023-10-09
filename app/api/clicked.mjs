import getCache from "../lib/cache.mjs";
import data from '@begin/data';

export async function post(req) {
  let gameObj = await data.get({
    table: 'games',
    key: req.query.id
  });

  if (!gameObj) {
    gameObj = {};
    gameObj.game = ["", "", "", "", "", "", "", "", ""]
    gameObj.player = "X"
    gameObj.done = false;
  }

  let pos = parseInt(req.query.pos);

  //Don't allow changes if game is over
  if (!gameObj.done && gameObj.game[pos] === "") {
    gameObj.game[pos] = gameObj.player;
    gameObj.player = gameObj.player === "X" ? "O" : "X";
  }

  await data.set({
    table: 'games',
    key: req.query.id,
    game: gameObj.game,
    player: gameObj.player,
    done: gameObj.done
  })

  return {
    headers: {
      'cache-control': getCache(),
    },
    text: gameObj.game[pos],
  }
}
