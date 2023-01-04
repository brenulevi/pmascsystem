require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3333);