const Blog = require('../models/Blog');

const create = (blog) => Blog.create(blog);
const getAll = (query) => Blog.find({query}).exec();
const getById = (id) => Blog.findById(id).exec();
const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();
const delte =(id) => Blog.findByIdAndRemove(id).exec();
const getByTitle = (title) => Blog.find({title}).exec();
 const getByTag =(id)=> Blog.findById(id).exec();

module.exports = {
  create,
  getAll,
  getById,
  editOne,
  delte,
  getByTitle,
  getByTag,
  
};
//600aea2069ff6e520cb90961
//600aec360c54ac481436a267