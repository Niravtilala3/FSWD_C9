const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoUri = 'mongodb://127.0.0.1:27017/FSWD_C9';

const userRoute = require('./routes/userRoute');
const empRoute = require('./routes/empRoute');
const userViewRoute = require('./routes/userViewRoute');
const studentRoute = require('./routes/studnetRoute');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/users', userViewRoute);
app.use('/emp', empRoute);
app.use('/students', studentRoute);



// Error handling middleware

app.get('/error', (req, res) => {
  throw new Error('BROKEN'); // Express will catch this on its own.
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   //
//   res.status(500).send('Something broke!');
// });

// 404 
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 Not Found' });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(`3300`,()=>{
      console.log('Server is running on port http://localhost:3300');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();