const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require('./api/connection');
const contactRoutes = require("./api/routes/ContactRoutes");
const claimRoutes = require('./api/routes/Claim');

const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");  // NEW

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // NEW
app.use(useragent.express()); // NEW

var cors = require("cors");

app.use(cors());
app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
     );
     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
     if (req.method === "OPTIONS") {
          res.header("Access-Control-Allow-Methods", "*");
          res.header("Access-Control-Allow-Credentials: true");
          return res.status(200).json({});
     }
     next();
});

app.get('/', (req, res) => {
     res.json({ massage: "Welcome to Claim Your Claim. " });
});

/* ============================================================
   🔥 STEP 3 — Add a middleware to capture details
   ============================================================ */
app.use((req, res, next) => {

     // 1️⃣ REMOTE IP
     req.clientIp =
          req.headers["x-forwarded-for"]?.split(",")[0] ||
          req.connection.remoteAddress ||
          "Unknown IP";

     // 2️⃣ DEVICE ID (Create if missing)
     if (!req.cookies.deviceId) {
          const id = crypto.randomUUID();
          res.cookie("deviceId", id, {
               httpOnly: true,
               maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
          });
          req.deviceId = id;
     } else {
          req.deviceId = req.cookies.deviceId;
     }

     // 3️⃣ BROWSER + OS (express-useragent)
     req.userBrowser = req.useragent.browser;
     req.userOS = req.useragent.os;

     next();
});

/* ============================================================
   🔥 STEP 4 — PASS INFO TO ROUTES (contact & claims)
   ============================================================ */

app.use("/contact", contactRoutes);
app.use("/claims", claimRoutes);

/* ============================================================
   ERROR HANDLERS
   ============================================================ */
app.use((req, res, next) => {
     const error = new Error("Not found");
     error.status = 404;
     next(error);
});

app.use((error, req, res, next) => {
     console.log(error);
     res.status(error.status || 500);
     res.json({
          error: {
               message: error.message
          }
     });
});

module.exports = app;
