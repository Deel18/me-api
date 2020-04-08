process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");
var token;

chai.should();

chai.use(chaiHttp);

describe("Get /", () => {
    it("Test get index", (done) => {
        chai.request(server)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            done();
        });
    });
});

describe("Register", () => {
    describe("POST /register", () => {
        it("Test registration for user", (done) => {
            const body = {
                name: "Testsson",
                email: "test@testsson.se",
                password: "password",
                dob: "11112011"
            };

            chai.request(server)
            .post("/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an("object");
                done();
            });
        });

        it("Test faulty registration for user", (done) => {
            const body = {
                email: "x@x.1"
            };

            chai.request(server)
            .post("/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });

        it("Test if user exists", (done) => {
            const body = {
                email: "test@testsson.se",
                password: "password",
            };

            chai.request(server)
            .post("/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);

                done();
            });
        });
    });
});

describe("Login", () => {
    describe("Post /login", () => {
        it("Test user login", (done) => {
            const body = {
                email: "test@testsson.se",
                password: "password",
            };

            chai.request(server)
            .post("/login")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                token = res.body.response.token;
                done();
            });
        });

        it("Test user login failure", (done) => {
            const body = {
                email: "not@registered.com",
                password: "drivel11",
            };

            chai.request(server)
            .post("/login")
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });
});

describe("Reports", () => {
    describe("GET /reports", () => {
        it("GET all reports", (done) => {
            chai.request(server)
            .get("/reports")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                done();
            });
        });
    });

    describe("GET /reports/1", () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
            .get("/reports/1")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.response.should.be.an("object");
                done();
            });
        });

        it("400 UNHAPPY PATH", (done) => {
            chai.request(server)
            .get("/reports/458")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an("object");
                res.body.response.should.be.an("object");

                done();

            });
        });
    });

    describe("POST /reports", () => {
        it("Test add report", (done) => {
            const body = {
                week: "23",
                text: "Test123"
            };

            chai.request(server)
            .post("/reports")
            .set("x-access-token", token)
            .send(body)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });

        it("Test add report failure", (done) => {
            chai.request(server)
            .post("/reports")
            .set("x-access-token", token)
            .send("")
            .end((err, res) => {
                res.should.have.status(400)
                done();
            });
        });
    });

    describe("POST /reports/update", () => {
        it("Test update report", (done) => {
            const body = {
                week: "23",
                text: "Updated test"
            };

            chai.request(server)
            .post("/reports/update")
            .set("x-access-token", token)
            .send(body)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });

        it("Test update available report", (done) => {
            const body = {
                week: "23",
                text: "Modified"
            };

            chai.request(server)
            .post("/reports/update")
            .set("x-access-token", token)
            .send("body")
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });

        it("Test to update with invalid token", (done) => {
            const body = {
                week: "23",
                text: "Modified"
            };

            chai.request(server)
            .post("/reports/update")
            .set("x-access-token", "Fail")
            .send(body)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
    });
});

describe("Invalid route", () => {
    it("Test for invalid route", (done) => {
        chai.request(server)
        .get("/404")
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });
});
