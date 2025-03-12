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


module.exports.handler = serverless(app);
