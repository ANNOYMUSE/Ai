import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔑 তোমার Gemini API Key এখানে দাও
const API_KEY = "AQ.Ab8RN6L2puu3TwoQ5Fmk5tygyPra7GxJl653bd4bVeDfLhiKCA";

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text:
`You are a smart personal AI assistant.
Reply in Bangla or English based on user.

User message: ${userMessage}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response";

        res.json({ reply });

    } catch (err) {
        res.json({ reply: "Gemini API error ⚠️" });
    }
});

app.listen(3000, () => {
    console.log("🚀 Gemini AI running on http://localhost:3000");
});