const express = require('express');
const router = express.Router()

const users =[
  {id:1, name:'raj',address:'ahmedabad'},
  {id:2, name:'john',address:'delhi'},
  {id:3, name:'jane',address:'mumbai'}, 
  {id:4, name:'jill',address:'chennai'}
]


router.get('/',(req, res)=>{
  res.json(users);  
})


router.get('/:userId',(req, res)=>{
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user); 
})

router.post('/',(req, res)=>{
  console.log('req.body', req.body);
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    address: req.body.address
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:userId',(req, res)=>{
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.name = req.body.name || user.name;
  user.address = req.body.address || user.address;

  res.json(user);
});

router.delete('/:userId',(req, res)=>{
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.userId));
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});



router.get('/info',(req, res)=>{
  res.send('user info page');
})

router.get('/info/:userID',(req, res)=>{
  res.send('user info page'+ req.params.userID);
})

module.exports = router;