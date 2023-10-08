export async function get(req) {
    let game = ["", "", "", "", "", "", "", "", ""]
    let player = "X"
    return {
        session: {
            game: game,
            player: player,
            done: false,
        }
    }
}