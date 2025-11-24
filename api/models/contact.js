const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // === Your Existing Fields ===
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String },

    // === NEW Tracking Info ===
    trackingInfo: {
      ip: { type: String },
      deviceId: { type: String },
      browser: { type: String },
      os: { type: String },
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
