const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// SMTP accounts - App Passwords stored in .env
const smtpAccounts = {
  "help@claimyourclaims.com": {
    user: "help@claimyourclaims.com",
    pass: process.env.BHAGYAS_PASS,
  },
};

// ALLOWED WEBSITE LINKS (ONLY TWO)
const allowedLinks = [
  "www.claimyourclaims.com/",
  "www.casesettlementnow.com",
];

// -----------------------------
// ✅ Send Email (POST)
// -----------------------------
router.post("/", async (req, res) => {
  try {
    const { fromEmail, toEmail, websiteLink } = req.body;

    // Validate TO email
    if (!toEmail || !toEmail.includes("@")) {
      return res.status(400).json({ message: "Invalid TO email" });
    }

    // Validate sender
    const selectedSender = smtpAccounts[fromEmail];
    if (!selectedSender) {
      return res.status(400).json({ message: "Sender email not configured" });
    }

    // Validate website link
    if (!allowedLinks.includes(websiteLink)) {
      return res.status(400).json({
        message: "Website link not allowed",
      });
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: selectedSender.user,
        pass: selectedSender.pass,
      },
    });

    // Email HTML (UNCHANGED STRUCTURE)
    const emailBody = `
      <p>Hello,</p>
      <p>Please find the website link below:</p>
      <p>
        Website Link:
        <a href="${websiteLink}" target="_blank">${websiteLink}</a>
      </p>
      <p>
        We wanted to inform you about the latest updates and improvements.
      </p>
      <p>If you have any questions, feel free to contact us.</p>
      <br/>
      <p>Thank you!<br/>Your Team</p>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Your Team" <${fromEmail}>`,
      to: toEmail,
      subject: "Website Update",
      html: emailBody,
    });

    return res.status(200).json({ message: "Mail sent successfully" });

  } catch (error) {
    console.log("Mail Error:", error);

    let errorMessage = "Something went wrong!";

    if (error.response && error.response.includes("550")) {
      errorMessage = "Recipient email address does not exist!";
    }

    if (error.code === "EAUTH") {
      errorMessage = "Authentication failed! Wrong app password.";
    }

    return res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
});

// -----------------------------
// Health Check
// -----------------------------
router.get("/", (req, res) => {
  res.json({ message: "SendMail API working" });
});

// -----------------------------
// Get list of Senders
// -----------------------------
router.get("/senders", (req, res) => {
  res.status(200).json(Object.keys(smtpAccounts));
});

// -----------------------------
// Get list of Allowed Links
// -----------------------------
router.get("/links", (req, res) => {
  res.status(200).json(allowedLinks);
});

module.exports = router;
