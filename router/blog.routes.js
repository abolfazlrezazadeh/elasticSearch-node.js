const { createNewBlog, getAllBlogs, removeBlog } = require("../controller/blog.controller");

const blogRouter = require("express").Router();

blogRouter.post("/create" , createNewBlog)
// ? => is meaned the value is optional
blogRouter.get("/list/:value?" , getAllBlogs)

blogRouter.delete("/delete/:mongoID?" , removeBlog)

module.exports={
    blogRouter
}