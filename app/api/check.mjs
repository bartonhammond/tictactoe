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
export async function get(req) {
    let game = req.session.game;

    let winner = isWinner(game)
    let full = !game.includes('');

    let message = "Tic Tac Toe";
    let button = '<button onclick="location.reload()">Again?</button>'
    if (winner) {
        let player = req.session.player === 'X' ? "O" : "X";
        message = `Winner ${player} ${button}`
    } else if (full) {
        message = `Game over ${button}`;
    }
    return {
        session: {
            game: game,
            player: req.session.player,
            done: winner
        },
        text: message
    }
}