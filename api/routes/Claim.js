const express = require('express');
const Claim = require('../models/Claim');
const router = express.Router();

// ✅ CREATE Claim
router.post('/', async (req, res) => {
  try {
    const claim = new Claim(req.body);
    await claim.save();
    res.status(201).json(claim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET All Claims
router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find(); // Fetch all claims
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
