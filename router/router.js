const allRouters = require("express").Router();

allRouters.get("/", (req, res, next) => {
  return res.render("pages/index", {
    message: "hello every one",
  });
});

module.exports = {
  allRouters,
};
