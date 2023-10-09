import getCache from "../lib/cache.mjs"
export async function get(req) {
    if (!fs.existsSync("data.json")) {
        fs.writeFileSync("data.json", "{}")
    }
}