const express = require('express');
const router = express.Router();
const { getArr, set } = require('../database/database');
const { APIKEY } = process.env;

/* GET blaclist */
router.get('/blacklist', async (req, res, next) => {
    const { type = "json" } = req.query;
    const stuff = await getArr();
    if (type == 'array') return res.status(200).send(stuff);
    return res.status(200).json({ success: true, response: stuff, length: stuff.length });
});

router.post('/upload', async (req, res, next) => {
    const apiKey = req.headers.authorization;
    if (!apiKey || !apiKey.startsWith('Bearer') || apiKey.replace('Bearer', '').trim() != APIKEY) return res.sendStatus(401);
    const { ID, tagName, evidence = [] } = req.body;
    const check = await get(ID);
    if (check) return res.status(409);
    if (!ID || !tagName) return res.status(400);
    delete req.body.ID;
    await set(ID, { tagName: tagName, evidence: evidence });
    return res.json({ success: true });
});
module.exports = router;
