const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');

// Shorten URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  try {
    let url = await Url.findOne({ originalUrl });
    if (url) return res.json(url);
    const shortCode = shortid.generate();
    url = new Url({ originalUrl, shortCode });
    await url.save();
    res.json(url);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all URLs
router.get('/', async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
});

module.exports = router;