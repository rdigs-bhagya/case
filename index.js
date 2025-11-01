const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require('./api/connection');
const contactRoutes = require('./api/routes/ContactRoutes')
const claimRoutes = require('./api/routes/Claim')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());;

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

app.use("/contact", contactRoutes);
app.use("/claims", claimRoutes);



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