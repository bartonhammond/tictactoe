import getCache from "../lib/cache.mjs";
import fs from "fs";
export async function post(req) {
  let games = JSON.parse(fs.readFileSync("data.json"));
  let id = req.query.id;

  let gameObj;
  if (games.hasOwnProperty(id)) {
    gameObj = games[id]
  } else {
    gameObj = {};
    gameObj.game = ["", "", "", "", "", "", "", "", ""]
    gameObj.player = "X"
    gameObj.done = false;
    games[id] = gameObj;
  }

  let pos = parseInt(req.query.pos);

  //Don't allow changes if game is over
  if (!gameObj.done && gameObj.game[pos] === "") {
    gameObj.game[pos] = gameObj.player;
    gameObj.player = gameObj.player === "X" ? "O" : "X";
  }
  fs.writeFileSync("data.json", JSON.stringify(games))
  return {
    headers: {
      'cache-control': getCache(),
    },
    text: gameObj.game[pos],
  }
}
