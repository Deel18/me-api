const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const reports = require("../models/reports.js");

const jwtSecret = process.env.JWT_SECRET;

//router.get("/reports", (req, res) => reports.getReports(req, res));

router.get("/reports/:week", (req, res) => reports.getReport(req, res));
router.get("/reports", (req, res) => reports.getReports(req, res));


router.post("/reports",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(req, res));

router.post("/reports/update",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.updateReport(req, res));


function checkToken(req, res, next) {
    const token = req.headers["x-access-token"];

    let data = {
        response: {
            msg: "Valid token."
        }
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            data.response.msg = "Invalid token.";
            res.status(401).json(data);
        } else {
            next();
        }
    })

}


module.exports = router;
