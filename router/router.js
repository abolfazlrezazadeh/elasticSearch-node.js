const { indicesRoute } = require("./indices.routes");

const allRouters = require("express").Router();

allRouters.get("/", (req, res, next) => {
  return res.render("pages/index");
});
allRouters.use("/index", indicesRoute)

module.exports = {
  allRouters,
};
