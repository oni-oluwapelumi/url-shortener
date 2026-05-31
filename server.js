const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/url', require('./routes/urlRoutes'));

app.get('/:code', async (req, res) => {
  const Url = require('./models/Url');
  const url = await Url.findOne({ shortCode: req.params.code });
  if (url) return res.redirect(url.originalUrl);
  res.status(404).send('URL not found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));