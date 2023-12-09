const allRouters = require("express").Router();

allRouters.get("/", (req, res, next) => {
  return res.render("pages/index");
});

module.exports = {
  allRouters,
};
