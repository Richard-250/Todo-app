var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cyubahirorichard250:uTSoq8mnQWfP1pcD@todo-app.xvrfp.mongodb.net/?retryWrites=true&w=majority&appName=todo-app');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

    app.get('/todo', async function(req, res){
      try {
        const data = await Todo.find({});
        res.render('todo', { todos: data });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.post('/todo', urlencodedParser, async function(req, res){
      try {
        const newTodo = new Todo(req.body);
        const data = await newTodo.save();
        res.json(data);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.delete('/todo/:item', async function(req, res) {
      try {
        const rawItem = req.params.item;
        const formattedItem = rawItem.replace(/-/g, " "); // Convert hyphens to spaces
    
        // Try deleting the exact item with either format
        const result = await Todo.deleteOne({
          $or: [{ item: rawItem }, { item: formattedItem }]
        });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        res.json({ message: "Item deleted successfully", deletedItem: rawItem });
      } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
      }
    });
    

};
