const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//const signup = require("./auth/signup");
//const login = require("./auth/login");

//app.post("/api/signup", signup);
//app.post("/api/login", login);
app.get("/api/test", async (req, res) => {
    try {
      res.json({ message: "API Express fonctionne !" });
    } catch (err) {
      console.error("Erreur dans /api/test :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
   

module.exports.handler = serverless(app);
