const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock database of AI models
const aiModels = [
  { id: 1, name: 'DALL-E 3', category: 'Image Generation', description: 'Generate stunning images from text prompts.', logo: '/dalle-logo.png', price: 'Free', demoEndpoint: '/api/demo/dalle3' },
  { id: 2, name: 'GPT-4', category: 'Text Generation', description: 'Advanced text generation for any use case.', logo: '/gpt-logo.png', price: '$20/month', demoEndpoint: '/api/demo/gpt4' },
  { id: 3, name: 'Jukebox', category: 'Music Generation', description: 'Create music in any style or genre.', logo: '/jukebox-logo.png', price: 'Free', demoEndpoint: '/api/demo/jukebox' },
];

// GET all AI models
app.get('/api/models', (req, res) => {
  res.json(aiModels);
});

// GET a single AI model by ID
app.get('/api/models/:id', (req, res) => {
  const modelId = parseInt(req.params.id);
  const model = aiModels.find((m) => m.id === modelId);
  if (!model) return res.status(404).json({ error: 'Model not found' });
  res.json(model);
});

// POST to interact with AI model demo
app.post('/api/demo/:modelName', (req, res) => {
  const modelName = req.params.modelName;
  const userInput = req.body.input;

  // Simulate AI model response
  let response;
  if (modelName === 'dalle3') {
    response = `You said: "${userInput}". DALL-E 3 generates an image based on your prompt.`;
  } else if (modelName === 'gpt4') {
    response = `You said: "${userInput}". GPT-4 responds: "Hello, I'm a large language model!"`;
  } else if (modelName === 'jukebox') {
    response = `You said: "${userInput}". Jukebox creates music based on your prompt.`;
  } else {
    return res.status(404).json({ error: 'Demo not available for this model' });
  }

  res.json({ response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});