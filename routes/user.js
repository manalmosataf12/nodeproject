const express = require('express');

const authMiddleware = require('../middlewares/auth');
const {
  create,login,getAll,editOne,getById,
} = require('../controllers/user');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const users = await editOne(id, body);
    res.json(users);
  } catch (e) {
    next(e);
  }
});
router.get('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const users = await getById(id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//600c2ad38b04ef385067bc92

router.post('/follow/:id',authMiddleware, async (req, res, next) => {
  try {
    const usr1=await getById(req.params.id);
    const usr2=req.user;
    usr2.following.push(usr1._id);
    usr1.followers.push(usr2._id);
     await editOne(usr2._id, {...usr2});
     await editOne(usr1._id, {...usr1});
    res.json(usr2);
  } catch (e) {
    next(e);
  }
});

router.post('/unfollow/:id',authMiddleware, async (req, res, next) => {
  try {
    const usr1=await getById(req.params.id);
    const usr2=req.user;
    usr2.following.pull(usr1._id);
    usr1.followers.pull(usr2._id);
     await editOne(usr2._id, {...usr2});
     await editOne(usr1._id, {...usr1});
    res.json(usr2);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
