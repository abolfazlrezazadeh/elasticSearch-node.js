const { createIndex, getIndices } = require("../controller/indices.controller");

const indicesRoute = require("express").Router();

indicesRoute.post("/create", createIndex);
indicesRoute.get("/list", getIndices);

module.exports = {
  indicesRoute,
};
