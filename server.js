const express = require("express")
const app = express();
const server = require("http").createServer(app);
const {PORT} = process.env;
const expressEjsLayouts = require("express-ejs-layouts")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set("view engine" , "ejs")
app.use(expressEjsLayouts)
