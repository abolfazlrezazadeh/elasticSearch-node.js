const { createNewBlog, getAllBlogs, removeBlog } = require("../controller/blog.controller");

const blogRouter = require("express").Router();

blogRouter.post("/create" , createNewBlog)
// ? => is meaned the value is optional
blogRouter.get("/list/:value?" , getAllBlogs)


module.exports={
    blogRouter
}