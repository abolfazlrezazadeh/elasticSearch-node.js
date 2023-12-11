const joi = require("@hapi/joi");
const createError = require("http-errors");
 const createBlogSchema = joi.object({
    title : joi.string().min(5).error(createError.BadRequest("title  must be at least 5 char")),
    text : joi.string().min(10).error(createError.BadRequest("text must be at least 10 char"))
 })

 module.exports = {
    createBlogSchema
 }