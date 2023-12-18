const { elasticClient } = require("../config/elastic.config");
const { blogModel } = require("../model/blog");
const { createBlogSchema } = require("../validator/blog.validator");
const createError = require("http-errors");
const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();
let indexName = "blog";
async function getAllBlogs(req, res, next) {
  try {
    const value = req.params.value;
    const blogs = await elasticClient.search({
      index: indexName,
      // query
      q: value,
    });
    return res.status(200).json({
      statusCode: 200,
      // return main value
      blogs: blogs.hits.hits,
    });
  } catch (error) {
    next(error);
  }
}

async function createNewBlog(req, res, next) {
  try {
    const blogBody = await createBlogSchema.validateAsync(req.body);
    const { title, author, text } = blogBody;
    const createBlogResult = await blogModel.create({ title, text, author });
    // save to elastic too
    if (createBlogResult) {
      // we can do here some queries
      // const finalData = await blogModel.aggregate([
      //   {$match : {author : 1, title : 1 , text : 1, _id : 0}},
      //   {$lookup : {}},
      //   {$unwind : {}}
      // ])
      await saveToElastic(createBlogResult);
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

async function removeBlog(req, res, next) {
  try {
    const { mongoID } = req.params;
    await findBlogInMongodb(mongoID);
    const mongoDeleteResult = await blogModel.deleteOne({ _id: mongoID });
    if (mongoDeleteResult.deletedCount == 0) {
      throw createError.BadRequest("failed please try again");
    }
    await deleteFromElastic(mongoID);
    return res.status(200).json({
      statusCode: 200,
      message: "blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function updateBlogInMongoDB(req, res, next) {
  try {
    const { mongoID } = req.params;
    const data = req.body;
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key];
      if (typeof data[key] == "string") data[key] = data[key].trim();
    });
    await findBlogInMongodb(mongoID);
    const updateResult = await blogModel.updateOne(
      { _id: mongoID },
      { $set: data }
    );
    if (updateResult.modifiedCount == 0)
      throw createError.BadRequest("failed please try again");
    await updateBlogInElastic(mongoID, data);
    return res.status(200).json({
      statusCode: 200,
      message: "blog updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateBlogInElastic(mongoID, data) {
  const elasticBlog =
    //find blog in elastic
    (
      await elasticClient.search({
        index: indexName,
        query: { match: { mongoID: mongoID } },
      })
    ).hits.hits?.[0] || {};
  // main content
  const payload = elasticBlog._source || {};
  // updating
  await elasticClient.index({
    index: indexName,
    id: elasticBlog._source.mongoID,
    document: { ...payload, ...data },
  });
  // second way to update in elastic

  // const updateElasticBlog = await elasticClient.update({
  //   index: indexName,
  //   id: elasticBlog._source.mongoID,
  //   doc: data ,
  // });
}

async function searchByTitle(req, res, next) {
  try {
    const { title } = req.query;
    const result = await elasticClient.search({
      index: indexName,
      query: {
        match: {
          title: title,
        },
      },
    });
    return res.status(200).json({
      statusCode: 200,
      result: result.hits.hits,
    });
  } catch (error) {
    next(error);
  }
}

async function searchByMultyFeild(req, res, next) {
  try {
    const { search } = req.query;
    const result = await elasticClient.search({
      index: indexName,
      query: {
        multi_match: {
          query: search,
          fields: ["title", "text", "author"],
        },
      },
    });
    return res.status(200).json({
      statusCode : 200,
      result : result.hits.hits
    })
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

async function saveToElastic(data) {
  const createResult = await elasticClient.index({
    index: indexName,
    document: {
      title: data.title,
      text: data.text,
      author: data.author,
      mongoID: data._id,
    },
  });
  if (createResult) return console.log("save to elastic is successfull");
}

async function deleteFromElastic(mongoID) {
  await elasticClient.deleteByQuery({
    index: indexName,
    query: {
      match: {
        mongoID: mongoID,
      },
    },
  });
}

async function findBlogInMongodb(mongoID) {
  const findBlogInMongo = await blogModel.findOne({ _id: mongoID });
  if (!findBlogInMongo) throw createError.NotFound("blog is not exist");
  return findBlogInMongo;
}

module.exports = {
  getAllBlogs,
  createNewBlog,
  removeBlog,
  searchByTitle,
  searchByMultyFeild,
  searchByRegex,
  updateBlogInMongoDB,
};
