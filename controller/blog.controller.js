const { elasticClient } = require("../config/elastic.config");
const { blogModel } = require("../model/blog");
const { createBlogSchema } = require("../validator/blog.validator");
let indexName = "blog";
async function getAllBlogs(req, res, next) {
  try {
    const value = req.params.value;
    const blogs = await elasticClient.search({
      index : indexName,
      // query
      q : value
    })
    return res.status(200).json({
      statusCode : 200,
      // return main value
      blogs : blogs.hits.hits
    })
  } catch (error) {
    next(error);
  }
}

async function createNewBlog(req, res, next) {
  try {
    const blogBody = await createBlogSchema.validateAsync(req.body);
    const { title, author, text } = blogBody;
    const createBlogResult = await blogModel.create({title , text, author});
    // save to elastic too
    if(createBlogResult){
      // we can do here some queries
      // const finalData = await blogModel.aggregate([
      //   {$match : {author : 1, title : 1 , text : 1, _id : 0}},
      //   {$lookup : {}},
      //   {$unwind : {}}
      // ])
      await saveToElastic(createBlogResult)
    }
    return res.status(201).json({
      statusCode: 201,
      message: "blog created successfully",
      createBlogResult,
    });
  } catch (error) {
    next(error);
  }
}

async function saveToElastic(data){
  const createResult = await elasticClient.index({
    index : indexName,
    document : {
      title : data.title,
      text : data.text,
      author : data.author
    }
  })
  if(createResult) return console.log("save to elastic is successfull")
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
