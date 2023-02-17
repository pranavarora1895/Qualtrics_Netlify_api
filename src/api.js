require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const uniqid = require("uniqid");

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const router = express.Router();

router.post("/", (req, res) => {
  const username = req.body.username;
  const user = {
    study: "4a415f49-0897-43af-8e49-42b6979e7a9b",

    roles: ["respondent"],

    studyAccess: ["sugarmun"],

    version: 20,

    user: username,

    language: "eng",

    exp: 1676657197, // This will automatically expire the jwt once it is created and used for ASA24. Comment this to run the simulation.

    iss: "sugarmun",

    redirect: "http://www.examplesurveysite.com/",
  };

  const qualtricsJWT = jwt.sign(user, process.env.SECRET);
  return res.json({ qualtricsJWT, id: uniqid("mun-") });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
