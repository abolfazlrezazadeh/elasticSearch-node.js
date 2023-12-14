const { elasticClient } = require("../config/elastic.config");
const { blogModel } = require("../model/blog");
const { createBlogSchema } = require("../validator/blog.validator");
let indexName = "blog";
async function getAllBlogs(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function createNewBlog(req, res, next) {
  try {
    const blogBody = await createBlogSchema.validateAsync(req.body);
    const { title, author, text } = blogBody;
    const createBlogResult = await blogModel.create({title , text, author})
    return res.status(201).json({
      statusCode: 201,
      message: "blog created successfully",
      createBlogResult,
    });
  } catch (error) {
    next(error);
  }
}

async function removeBlog(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function searchByTitle(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function searchByMultyFeild(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function searchByRegex(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBlogs,
  createNewBlog,
  removeBlog,
  searchByTitle,
  searchByMultyFeild,
  searchByRegex,
};
