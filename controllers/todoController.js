var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cyubahirorichard250:uTSoq8mnQWfP1pcD@todo-app.xvrfp.mongodb.net/?retryWrites=true&w=majority&appName=todo-app');

// create schema

var todoSchema = new mongoose.Schema({
  item: String
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
      res.render('todo', {todos: data})
    });


    app.post('/todo', urlencodedParser , function(req, res){
    data.push(req.body);
    res.json(data)
    }); 


    app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data)
    });

};