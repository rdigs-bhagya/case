const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    xxTrustedFormCertUrl: { type: String },
    serviceAnswers: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: mongoose.Schema.Types.Mixed, required: true },
        },
      ],
      _id: false, // No _id for each array item
    },
  },
  { timestamps: true }
);

const Claim =  mongoose.models.Claim || mongoose.model("Claim", ClaimSchema);
module.exports = Claim;