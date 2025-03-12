const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../db/connect");

module.exports = async function signup(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    const client = await connectDB();
    const db = client.db("pollapp");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      email,
      passwordHash,
      created_at: new Date().toISOString(),
    };

    await users.insertOne(newUser);

    const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.status(201).json({ token, email });
  } catch (err) {
    console.error("Erreur signup :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
