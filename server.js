const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/Elastic-Search";
require("dotenv").config();
const PORT = process.env.PORT;
const expressEjsLayouts = require("express-ejs-layouts");
const { allRouters } = require("./router/router");

//setup mongoose
mongoose.set("strictQuery", false);
//Set up default mongoose connection
mongoose.connect(DB_URL, (error) => {
  if (error) throw error;
  console.log(`connected to db successfully ....`);
});
//config application
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("views", "views");
app.set("layout", "./layouts/master");
//config routes
app.use(allRouters);
// error handling
app.use((req, res, next) => {
  return res.status(404).json({
    status: 404,
    message: "not FOUNDDDDDDDDDDDDDDDDDDD:D",
  });
});
app.use((err, req, res, next) => {
  return res.status(err.static || 500).json({
    status: err.status || 500,
    message: err.message || "errorrr",
  });
});

server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
