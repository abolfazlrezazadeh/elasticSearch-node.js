const { createIndex, getIndices, removeIndex } = require("../controller/indices.controller");

const indicesRoute = require("express").Router();

indicesRoute.post("/create", createIndex);
indicesRoute.get("/list", getIndices);
indicesRoute.delete("/delete/:indexName", removeIndex);

module.exports = {
  indicesRoute,
};
