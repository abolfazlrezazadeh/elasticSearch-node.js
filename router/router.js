const { blogRouter } = require("./blog.routes");
const { indicesRoute } = require("./indices.routes");

const allRouters = require("express").Router();

allRouters.get("/", (req, res, next) => {
  return res.render("pages/index");
});
allRouters.use("/index", indicesRoute)
allRouters.use("/blog", blogRouter)

module.exports = {
  allRouters,
};
