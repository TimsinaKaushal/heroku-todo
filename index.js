//to use installed packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//use express method and create middlewares
const app = express();

//to use bodyparser for read data from requests
app.use(bodyParser.urlencoded({ extended: true }));

//all static files in public folder
app.use(express.static("public"));

//frontend in ejs so ve is ejs
app.set("view engine", "ejs");



// Make sure you did not use any special
// characters(e.g. @) in your user-name
// or password
mongoose.connect(
    "mongodb+srv://kaushal:timsina@cluster0.k1a2u.mongodb.net/todoDB?retryWrites=true&w=majority");
      
    // Defining the schema or structure of
    // a single item in mongodb
    const taskSchema = {
        name: {
            type: String,
            required: true
        }
    };
      
    // Using the following code, node.js 
    // creates a collection named 
    // 'tasks' using the taskSchema
    const Task = mongoose.model("Task", taskSchema);



    app.get("/", function (req, res) {

        let today = new Date();
        let options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };
        
        
        let day = today.toLocaleDateString("en-US", options);
    
        
        Task.find({}, function (err, foundTasks) {
            if (err) {
                console.log(err)
            }
            else {
    
                res.render("index", { today: day, tasks: foundTasks });
            }
        })
    });
    

    app.post("/", function (req, res) {
        const taskName = req.body.newTask;
        if (taskName) {
            const task = new Task({
                name: taskName,
            });

            task.save()
                .then(() => {
                    res.redirect("/");
                });
        } else {
            res.redirect("/");
        }
    });




    app.post("/delete", function (req, res) {
        const checkedItemId = req.body.checkbox;
        Task.findByIdAndRemove(checkedItemId, function (err) {
            if (!err) {
            console.log("Successfully deleted checked item.");
            res.redirect("/");
            }
        });
        });
        
        app.listen(3000, function () {
            console.log("listening on port 3000.");
          });