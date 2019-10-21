const db = require("../db/database.js");

const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "deel18",
            desc: `Hej! Jag heter deel18 och studerar för tillfället webbprogrammering vid BTH.`
        }
    };
    res.status(200).json(data);
});


module.exports = router;
