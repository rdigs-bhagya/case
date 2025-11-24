const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    // === Your Existing Claim Fields ===
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    description: { type: String },
    orderId: { type: String },

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

module.exports = mongoose.model("Claim", claimSchema);
