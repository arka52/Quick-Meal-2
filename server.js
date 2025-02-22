const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const GEMINI_API_KEY = 'AIzaSyDldGUXW3Od8wKlY1hz5doA7rlUQ0F29Zg'; // Replace with your Gemini API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

app.post('/generate-recipe', async (req, res) => {
    const { ingredients } = req.body;

    try {
        const response = await axios.post(GEMINI_API_URL, {
            contents: [
                {
                    parts: [
                        {
                            text: `Generate a detailed recipe using the following ingredients: ${ingredients}. Include step-by-step instructions.`
                        }
                    ]
                }
            ]
        });

        const recipe = response.data.candidates[0].content.parts[0].text;
        res.json({ recipe });
    } catch (error) {
        console.error('Error generating recipe:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});