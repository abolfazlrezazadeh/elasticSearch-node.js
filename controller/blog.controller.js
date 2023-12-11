const { elasticClient } = require("../config/elastic.config");
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
    const createBlogResult = await elasticClient.index({
      index: indexName,
      document: {
        title,
        author,
        text,
      },
    });
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
