require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://admin:admin@pmascdb.2esfv.mongodb.net/patrimony?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3333);