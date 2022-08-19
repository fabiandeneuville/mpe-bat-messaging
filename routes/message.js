// MESSAGE ROUTER CONFIGRATION

const express = require('express');
const router = express.Router();

const messageControl = require('../controllers/message');

router.post('/', messageControl.postMessage);

module.exports = router;