const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const index = require('./routes/index');
const login = require('./routes/login');
const register = require("./routes/register");
const reports = require("./routes/reports");



//development port
const app = express();
const port = 8333;


const bodyParser = require("body-parser");


app.use(cors());

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

//External routes
app.use('/', index);
//app.use('/login', login);

app.post("/login", login);
app.post("/register", register);

app.get("/reports", reports);
app.get("/reports/:week", reports);
app.post("/reports", reports);
app.post("/reports/update", reports);



// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});



// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});



// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;
