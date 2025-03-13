const connectDB = require("../db/connect");
const verifyToken = require("../auth/verifyToken");

module.exports = async function updatePoll(req, res) {
  try {
    await verifyToken(req, res, async () => {
      const { id, question, options } = req.body;

      if (!id || !question || !options || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ message: "ID, question et au moins 2 options sont requis." });
      }

      const client = await connectDB();
      const db = client.db("pollapp");
      const polls = db.collection("polls");

      const poll = await polls.findOne({ id });

      if (!poll) {
        return res.status(404).json({ message: "Sondage introuvable." });
      }

      if (poll.creator_id !== req.user.id) {
        return res.status(403).json({ message: "Accès refusé." });
      }

      const votesOk = poll.votes.every(v => v === 0);
      if (!votesOk) {
        return res.status(400).json({ message: "Impossible de modifier un sondage déjà voté." });
      }

      const newVotes = new Array(options.length).fill(0);

      await polls.updateOne(
        { id },
        {
          $set: {
            question,
            options,
            votes: newVotes,
            updated_at: new Date().toISOString()
          }
        }
      );

      res.json({ message: "Sondage modifié avec succès." });
    });
  } catch (err) {
    console.error("Erreur updatePoll:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
