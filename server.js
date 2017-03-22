/*jshint esversion: 6 */
const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
      pageTitle: 'WELCOME',
      welcomeMSG: 'Hello, WHAT the fuck are you doing here'
    });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    status: 404,
    ErrorMessage: 'Bad request'
  });
});

// <--- BIND THE APPLICATION TO A PORT ON OUR MACHINE --->
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
