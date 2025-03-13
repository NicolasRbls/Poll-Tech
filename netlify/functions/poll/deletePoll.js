const connectDB = require("../db/connect");
const verifyToken = require("../auth/verifyToken");

module.exports = async function deletePoll(req, res) {
  try {
    await verifyToken(req, res, async () => {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "ID du sondage requis." });
      }

      const client = await connectDB();
      const db = client.db("pollapp");
      const polls = db.collection("polls");

      // On vérifie que le sondage appartient bien à l'utilisateur
      const result = await polls.deleteOne({ id, creator_id: req.user.id });

      if (result.deletedCount === 0) {
        return res.status(403).json({ message: "Vous n'avez pas le droit de supprimer ce sondage." });
      }

      res.json({ message: "Sondage supprimé avec succès." });
    });
  } catch (err) {
    console.error("Erreur deletePoll:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
