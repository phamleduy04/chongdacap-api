const express = require('express');
const router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: 'Server is running okay!' });
});

module.exports = router;
