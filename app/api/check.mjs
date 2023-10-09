import getCache from "../lib/cache.mjs";
import data from '@begin/data';
function isWinner(game) {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < wins.length; i++) {
        const win = wins[i];
        const a = game[win[0]];
        const b = game[win[1]];
        const c = game[win[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            return true
        }
    }
    return false;
}
/**
 * 
 * @param {*} req - the query id is the game identification
 *   
 * @returns 
 */
export async function get(req) {
    //Get existing game using the query id 
    let gameObj = await data.get({
        table: 'games',
        key: req.query.id
    });

    let message = "Tic Tac Toe";

    //check status
    let winner = isWinner(gameObj.game)
    let full = !gameObj.game.includes('');

    //Simple button w/ action to reload
    let button = '<button onclick="location.reload()">Again?</button>'

    //Do we have a winner or is the game over?
    if (winner) {
        let player = gameObj.player === 'X' ? "O" : "X";
        message = `Winner ${player} ${button}`
    } else if (full) {
        message = `Game over ${button}`;
    }
    //Update so clicked won't allow interaction
    if (winner || full) {
        await data.set({
            table: 'games',
            key: req.query.id,
            game: gameObj.game,
            player: gameObj.player,
            done: true
        })
    }
    //Provide the status
    return {
        headers: {
            'cache-control': getCache(),
        },
        text: message
    }
}