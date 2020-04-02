/* global describe it */


process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");


chai.should();

chai.use(chaiHttp);

describe("Reports", () => {
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
        })
    });

    describe("GET /reports/2", () => {
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
});
