require("dotenv").config();
const axios = require("axios");

const HF_API_TOKEN = process.env.HF_API_TOKEN;

const generateSummary = async (title, description, genre) => {
  const inputText = `You're the best manga seller. Write an engaging 2-3 line summary to sell this manga.

Title: ${title}
Genre: ${genre}
Description: ${description}`;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        inputs: inputText,
        parameters: {
          max_length: 130,
          do_sample: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data?.[0]?.summary_text;
    return summary ? summary.trim() : "Summary could not be generated.";
  } catch (err) {
    console.error("HuggingFace Error:", err.response?.status, err.response?.data || err.message);
    return "AI generation failed.";
  }
};

module.exports = { generateSummary };