const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB || "mongodb://localhost/chongdacap");

/** Database format
 * key: userID (string)
 * value: object { tagName (string), addedDate (timestamp string), evidence: [] (string) }
 */
module.exports = {
    set: async function(key, value) {
        if (!key) throw new Error('Missing key.');
        if (!value) throw new Error('Missing value.');
        await db.set(key, value);
        // await db.set(`${key}.updated`, Date.now());
        return true;
    },
    get: async function(key) {
        if (!key) throw new Error('Missing key.');
        return await db.get(key);
    },
    getPing: async function() {
        return await db.fetchLatency();
    },
    getArr: async function() {
        const all = await db.all();
        return all.map(el => el.ID);
    },
};