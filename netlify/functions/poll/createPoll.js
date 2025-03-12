const connectDB = require("../db/connect");
const verifyToken = require("../auth/verifyToken");
const { v4: uuidv4 } = require("uuid");

module.exports = async function createPoll(req, res) {
  try {
    // Authentification via middleware (version adaptée à Express + Netlify Functions)
    await verifyToken(req, res, async () => {
      const { question, options } = req.body;

      if (!question || !options || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ message: "Question et au moins 2 options sont requises." });
      }

      const client = await connectDB();
      const db = client.db("pollapp");
      const polls = db.collection("polls");

      const newPoll = {
        id: uuidv4().slice(0, 6), // ID court style "abc123"
        question,
        options,
        votes: new Array(options.length).fill(0),
        creator_id: req.user.id,
        created_at: new Date().toISOString(),
        participants: [],
      };

      await polls.insertOne(newPoll);

      res.status(201).json({
        message: "Sondage créé",
        link: `/poll.html?id=${newPoll.id}`
      });
    });
  } catch (err) {
    console.error("❌ Erreur createPoll:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
