const connectDB = require("../db/connect");

module.exports = async function getPoll(req, res) {
  try {
    const pollId = req.query.id;
    if (!pollId) {
      return res.status(400).json({ message: "ID du sondage manquant." });
    }

    const client = await connectDB();
    const db = client.db("pollapp");
    const polls = db.collection("polls");

    const poll = await polls.findOne({ id: pollId });

    if (!poll) {
      return res.status(404).json({ message: "Sondage introuvable." });
    }

    // On évite de renvoyer les participants
    const { participants, ...pollData } = poll;

    res.json(pollData);
  } catch (err) {
    console.error("Erreur getPoll:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
