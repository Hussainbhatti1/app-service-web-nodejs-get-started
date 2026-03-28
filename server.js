require('./telemetry');

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    app: 'FocusBoard',
    environment: process.env.APP_ENV || 'local'
  });
});

app.get('/api/info', (req, res) => {
  res.status(200).json({
    app: 'FocusBoard',
    description: 'A static-style productivity dashboard served with Node.js',
    environment: process.env.APP_ENV || 'local',
    time: new Date().toISOString()
  });
});

app.get('/api/quote', (req, res) => {
  const quotes = [
    'Small progress is still progress.',
    'Consistency beats intensity.',
    'Build discipline, not just motivation.',
    'One focused hour can change your day.',
    'Done is better than perfect.'
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  res.status(200).json({
    quote: randomQuote
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`FocusBoard app running on port ${port}`);
  });
}

module.exports = app;
