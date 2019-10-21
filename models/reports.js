const db = require("../db/database.js");


const reports = {
    getReport: function(req, res) {
        let data = {
            response: {
                source: "/reports",
                msg: "Report loaded successfully.",
                report: {}
            }
        };

        db.all("SELECT * FROM reports WHERE week like ? LIMIT 1", req.params.week, function (err, row) {
            if(err) {
                data.response.msg = "Report failed.";
                return res.status(400).json(data);
            } else {
                data.response.report = row[0];
                return res.status(200).json(data);
            }
        })
    },

    addReport: function(req, res) {
        let data = {
            response: {
                msg: "Report added successfully."
            }
        };

        db.run("INSERT INTO reports (week, texts) VALUES (?, ?)", req.body.week, req.body.text, function(err) {
            if(err) {
                data.reponse.msg = "Failed to add report."
                return res.status(400).json(data);
            } else {
                return res.status(201).json(data);
            }
        })
    },

    updateReport: function(req, res) {
        let data = {
            response: {
                msg: "Report has been updated."
            }
        };

        db.run("UPDATE reports SET text = ? WHERE week=?", req.report, req.week, (err) => {
            if (err) {
                data.response.msg = "Update failed."
                return res.status(400).json(data);
            } else {
                return res.status(400).json(data);
            }
        })
    }

}


module.exports = reports;