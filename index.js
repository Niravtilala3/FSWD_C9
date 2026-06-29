const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const empRoute = require('./routes/empRoute');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Hey', 
      message: 'Hello there!', 
      list:[{name:'raj'},{name:'john'},{name:'jane'}] 
    });
  //res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Post request received');
});

app.use('/user', userRoute);
app.use('/emp', empRoute);

app.listen(3000,()=>{
  console.log('Server is running on port http://localhost:3000');
});