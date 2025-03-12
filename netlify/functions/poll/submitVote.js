const connectDB = require("../db/connect");
const verifyToken = require("../auth/verifyToken");

module.exports = async function submitVote(req, res) {
  try {
    await verifyToken(req, res, async () => {
      const { id, optionIndex } = req.body;
      if (!id || typeof optionIndex !== "number") {
        return res.status(400).json({ message: "ID du sondage et option requise." });
      }

      const client = await connectDB();
      const db = client.db("pollapp");
      const polls = db.collection("polls");

      const poll = await polls.findOne({ id });

      if (!poll) return res.status(404).json({ message: "Sondage introuvable." });
      if (poll.participants.includes(req.user.id)) {
        return res.status(403).json({ message: "Vous avez déjà voté." });
      }

      const update = {
        $inc: { [`votes.${optionIndex}`]: 1 },
        $push: { participants: req.user.id }
      };

      await polls.updateOne({ id }, update);
      res.json({ message: "Vote enregistré" });
    });
  } catch (err) {
    console.error("Erreur submitVote:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
