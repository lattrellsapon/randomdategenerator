const express = require('express');
const connectDB = require('./config/db');
// Bring in color
const colors = require('colors');

// Initialise express
const app = express();

// Connect to the Mongo Database
connectDB();

// Init Middleware - Bodyparser so that you can take form date from the client
app.use(express.json({ extender: false }));

// Initial Route
app.get('/', (req, res) => {
  res.json({
    msg: 'Welcome to the Random Generator App API',
  });
});

// Routes to hit by the client
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dates', require('./routes/dates'));

// Port to listen to
const PORT = process.env.PORT || 8000;

// Make sure the app is listening to a port
app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`.red.underline);
});
