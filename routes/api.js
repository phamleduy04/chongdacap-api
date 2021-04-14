const express = require('express');
const router = express.Router();
const { getArr, set, get } = require('../database/database');
const { APIKEY } = process.env;
const getFBID = require('get-fbid');

/* GET blaclist */
router.get('/blacklist', async (req, res, next) => {
    const { type = "json" } = req.query;
    const stuff = await getArr();
    if (type == 'array') return res.status(200).send(stuff);
    return res.status(200).json({ success: true, response: stuff, length: stuff.length });
});

/* POST /upload with auth */
router.post('/upload', async (req, res, next) => {
    const apiKey = req.headers.authorization;
    if (!apiKey || !apiKey.startsWith('Bearer') || apiKey.replace('Bearer', '').trim() != APIKEY) return res.sendStatus(401);
    const { ID, tagName, evidence = [] } = req.body;
    const check = await get(ID);
    if (check) return res.json({ success: false, duplicate: true });
    if (!ID || !tagName) return res.status(400);
    delete req.body.ID;
    await set(ID, { tagName: tagName, evidence: evidence });
    return res.json({ success: true });
});


/* GET /getID from username -> fbid */
router.get('/getID', async (req, res, next) => {
    const { username } = req.query;
    if (!username) return res.status(404).send('Not found!');
    try {
        const fbid = await getFBID(username);
        return res.status(200).send(fbid);
    }
    catch(e) {
        return res.status(404).json({ error: e });
    }
});

module.exports = router;