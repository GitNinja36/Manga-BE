const express = require("express");
const { generateSummary } = require('../utils/ai.js');
const router = express.Router();

router.post("/generate-summary", async (req, res) => {
  const { title, description, genre } = req.body;
  try {
    const summary = await generateSummary(title, description, genre);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;