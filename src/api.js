require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const uniqid = require("uniqid");

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const router = express.Router();

router.post("/", (req, res) => {
  const study = req.body.study;
  const studyAccess = req.body.studyAccess;
  const redirect = req.body.redirect;
  const username = uniqid(`${studyAccess}-`);
  const user = {
    study: study,

    roles: ["respondent"],

    studyAccess: [studyAccess],

    version: 20,

    user: username,

    language: "eng",

    exp: 1708193197,

    iss: studyAccess,

    redirect: `${redirect}?username=${username}&`,
  };

  if (studyAccess === "sugarmun") {
    const qualtricsJWT = jwt.sign(user, process.env.SUGARMUN_SECRET);
    return res.json({ qualtricsJWT, username });
  }
  if (studyAccess === "sugarmqo") {
    const qualtricsJWT = jwt.sign(user, process.env.SUGARMQO_SECRET);
    return res.json({ qualtricsJWT, username });
  }
  if (studyAccess === "sugaryth") {
    const qualtricsJWT = jwt.sign(user, process.env.SUGARYTH_SECRET);
    return res.json({ qualtricsJWT, username });
  }
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
