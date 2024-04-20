const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Endpoint
app.get('/gpt/:prompt', async (req, res) => {
  try {
    const prompt = req.params.prompt;
    const response = await generateText(prompt, 0.7); // Menggunakan temperatur 0.7
    res.send(response.data.choices[0].text);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Terjadi kesalahan saat memproses permintaan.');
  }
});

// Fungsi untuk menghasilkan teks dari OpenAI
async function generateText(prompt, temperature) {
  const openaiApiKey = 'YOUR_OPENAI_API_KEY';
  const url = 'https://api.openai.com/v1/completions';
  const data = {
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 50,
    temperature: temperature // Menambahkan temperatur untuk mengontrol kreativitas
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openaiApiKey}`
  };
  return await axios.post(url, data, { headers: headers });
}

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
