const express = require('express');
const Claim = require('../models/Claim');
const router = express.Router();

// Create a claim
router.post('/', async (req, res) => {
  try {
    const claim = new Claim(req.body);
    await claim.save();
    res.status(201).json(claim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

