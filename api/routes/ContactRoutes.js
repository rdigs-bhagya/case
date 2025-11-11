const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// ✅ Create a new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from DB
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ (Optional) Get a single contact by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) return res.status(404).json({ message: 'Contact not found' });
//     res.status(200).json(contact);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
