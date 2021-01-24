const express = require('express');
const {
  create,getAll,getById,editOne,delte,getByTitle,getByTag,
} = require('../controllers/blog');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body ,user: { id }} = req;
  try {
    const  blog= await create({...body, userId: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
  try {
    const blogs = await getAll({ userId: id });
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const blogs = await getById(id);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;

  try {
    const blogs = await editOne(id, body);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { params: { id } } = req;

  try {
    const blogs = await delte(id);
    res.json("deleted");
  } catch (e) {
    next(e);
  }
});
router.get('/title/:title', async (req, res, next) => {
  const { params: { title } } = req;
  try {
      const blogs = await getByTitle({ title });
      res.json(blogs);
  } catch (e) {
      next(e);
  }
});
router.get('/tag/:name', async (req, res, next) => {

  try {
      const tages = req.params.name;
      const blogs = await getByTag({ tages: { "$regex": tages, "$options": "i" } });
      res.json(blogs);

  } catch {

      next(e);
  }
})


module.exports = router;
