const createHttpEror = require("http-errors")
const { elasticClient } = require("../config/elastic.config")
async function createIndex(req, res, next){
    try {
        const {indexName} = req.body
        if(!indexName) throw createHttpEror.BadRequest("Invalid value of index")
        // create name of elastic
        const result = await elasticClient.indices.create({index : indexName})
        console.log(result);
        return res.status(201).json({
            statusCode : 201,
            result,
            message : "index created"
        })
    } catch (error) {
        next(error)
    }
}

async function removeIndex(req, res, next){
    try {
        const {indexName} = req.params;
        if(!indexName) throw createHttpEror.BadRequest("value ofindexName is not correct")
         await elasticClient.indices.delete({index : indexName})
        return res.status(200).json({
            statusCode : 200,
            message : "index deleted successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

async function getIndices(req, res, next){
    try {
        const indices = await elasticClient.indices.getAlias()
        return res.status(200).json({
            statusCode : 200, 
            indices : Object.keys(indices)
        })
    } catch (error) {
        next(error)
    }
}

module.exports= {
    createIndex,
    removeIndex,
    getIndices
}