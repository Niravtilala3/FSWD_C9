const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
    const users = await User.find();
    console.log(users);
    res.render('users/index', { title: 'Users', users });
});

router.get('/new', (req, res) => {
  res.render('users/new', { title: 'Create User' });
});

router.post('/', async (req, res, next) => {
    const user = await User.create({
      name: req.body.name,
      address: req.body.address,
    });
    // res.send('User created successfully');
    res.redirect(`/users`);
});

router.get('/:userId', async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    const title = 'User Details';
    if (!user) {
      return res.status(404).render('404', { title: 'User Not Found' });
    }

    res.render('users/show', { title, user });
});

router.get('/:userId/edit', async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).render('404', { title: 'User Not Found' });
    }

    res.render('users/edit', { title: 'Edit User', user });
});

router.post('/:userId/update', async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        name: req.body.name,
        address: req.body.address,
      }
    );

    if (!updatedUser) {
      return res.status(404).render('404', { title: 'User Not Found' });
    }

    res.redirect(`/users/${updatedUser._id}`);
});

router.post('/:userId/delete', async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).render('404', { title: 'User Not Found' });
    }

    res.redirect('/users');
});

module.exports = router;