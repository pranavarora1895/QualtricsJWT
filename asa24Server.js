require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const survey = [
  {
    username: "sugarmun",
    question1: "Question 1 of Survey",
    question2: "Question 2 of Survey",
  },
];

app.get("/asaSurvey", authenticationToken, (req, res) => {
  // Get User JSON
  res.json(survey.filter((user) => user.username === req.user.iss));
});

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(4000);
