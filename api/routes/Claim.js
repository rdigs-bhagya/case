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
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET a single Claim by ID
router.get('/:id', async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: 'Claim not found' });
    res.status(200).json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE a Claim by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedClaim = await Claim.findByIdAndDelete(req.params.id);
    if (!deletedClaim)
      return res.status(404).json({ message: 'Claim not found' });
    res.status(200).json({ message: 'Claim deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
