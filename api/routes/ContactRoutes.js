const express = require('express');
const router = express.Router();
const Contact = require('../models/contact')

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
