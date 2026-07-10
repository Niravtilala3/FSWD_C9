const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/info',(req, res)=>{
  res.send('user info page');
});


router.get('/info/:userID',(req, res)=>{
  res.send('user info page'+ req.params.userID);
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      address: req.body.address,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        name: req.body.name,
        address: req.body.address,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:userId', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.userId);
  if (!deletedUser) return res.status(404).json({ error: 'User not found' });

  res.json(deletedUser);
});

module.exports = router;