const express = require('express');
const router = express.Router();
const { User } = require('../models');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/* GET user by id. */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

/* POST create new user */
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        details: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email already exists'
      });
    }
    next(err);
  }
});

/* PUT update user */
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        details: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }
    next(err);
  }
});

/* DELETE user */
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;


