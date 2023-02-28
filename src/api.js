require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const uniqid = require("uniqid");

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const router = express.Router();

router.post("/", (req, res) => {
  const username = uniqid("mun-");
  const user = {
    study: "4a415f49-0897-43af-8e49-42b6979e7a9b",

    roles: ["respondent"],

    studyAccess: ["sugarmun"],

    version: 20,

    user: username,

    language: "eng",

    exp: 1708193197, // This will automatically expire the jwt once it is created and used for ASA24. Comment this to run the simulation.

    iss: "sugarmun",

    redirect: `https://mun.az1.qualtrics.com/jfe/form/SV_6MwsYx7YDSwO0rY?username=${username}&`,
  };

  const qualtricsJWT = jwt.sign(user, process.env.SECRET);
  return res.json({ qualtricsJWT, username });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
