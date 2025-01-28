var express = require('express');
var todoController = require('./controllers/todoController');


var app = express();

// set up template engine
app.set('view engine', 'ejs');

// fire controllers

todoController(app)

app.use(express.static('./public'));

app.listen(3000);
console.log('Iam listening to port port 3000');