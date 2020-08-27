// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// Start up server port
const port = process.env.PORT || 3000;
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Callback function to complete GET '/all'
app.get('/all', (req , res) => {
  res.send(projectData);
  projectData = {};
});

// Post Route
app.post('/add', (req , res) => {
  projectData = {
    temp : req.body.temp,
    date : req.body.date,
    feel : req.body.feel
  }
});

// Setup Server
app.listen(port, console.log(`Server running on port ${port}...`));
