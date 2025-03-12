const connectDB = require("../db/connect");
const verifyToken = require("../auth/verifyToken");

module.exports = async function getUserPolls(req, res) {
  try {
    await verifyToken(req, res, async () => {
      const client = await connectDB();
      const db = client.db("pollapp");
      const polls = db.collection("polls");

      const userPolls = await polls.find({ creator_id: req.user.id }).toArray();
      res.json(userPolls);
    });
  } catch (err) {
    console.error("Erreur getUserPolls:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
