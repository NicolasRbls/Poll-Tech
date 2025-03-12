const connectDB = require("../db/connect");

module.exports = async function getResults(req, res) {
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

    res.json({
      question: poll.question,
      options: poll.options,
      votes: poll.votes
    });
  } catch (err) {
    console.error("Erreur getResults:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
