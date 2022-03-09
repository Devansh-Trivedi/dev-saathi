const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI_ONLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("[INFO] DB Connected");
  })
  .catch((err) => {
    console.error("[ERROR] DB ERROR", err);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

fs.readdirSync("./routes/").map((routeFile) => {
  app.use("/api", require("./routes/" + routeFile));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[INFO] Api running on PORT ${port}`);
});