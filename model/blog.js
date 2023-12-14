const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: { type : String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});


module.exports = {
    blogModel : new mongoose.model("Blog" , blogSchema)
}