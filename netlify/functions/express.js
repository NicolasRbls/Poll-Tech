const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const signup = require("./auth/signup");
const login = require("./auth/login");
const verifyToken = require("./auth/verifyToken");
const getPoll = require("./poll/getPoll");
const submitVote = require("./poll/submitVote");
const getResults = require("./poll/getResults");
const createPoll = require("./poll/createPoll");
const getUserPolls = require("./poll/getUserPolls");
const deletePoll = require("./poll/deletePoll");
const updatePoll = require("./poll/updatePoll");




// ➤ Routes publiques
app.post("/api/signup", signup);
app.post("/api/login", login);

// ➤ Exemple de route sécurisée
app.get("/api/secure-test", verifyToken, (req, res) => {
  res.json({ message: `Bienvenue, ${req.user.email} !` });
});

// ➤ Route test simple
app.get("/api/test", (req, res) => {
  res.json({ message: "API Express fonctionne !" });
});

app.get("/api/getPoll", getPoll);
app.post("/api/submitVote", submitVote);
app.get("/api/getResults", getResults);
app.post("/api/createPoll", createPoll);
app.get("/api/getUserPolls", getUserPolls);
app.delete("/api/deletePoll", deletePoll);
app.put("/api/updatePoll", updatePoll);


module.exports.handler = serverless(app);
