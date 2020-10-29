const bodyparser = require('body-parser') 
const express = require("express") 
const path = require('path') 
const app = express() 
var http = require('http');
var mongoose = require('mongoose');
const { stringify } = require('querystring');
   
var PORT = process.env.port || 3000 

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json())

app.use(express.static(__dirname + '/views'));


mongoose.connect('mongodb://localhost/Company1');
 
var Schema = new mongoose.Schema({
  name:String,
  phone:Number,
email    : String,
concern:String
});
 
var user = mongoose.model('emp', Schema);
   
app.get("/", function(req, res){ 
    res.render("index.html");
}); 

app.get("/style", function(req, res){ 
  res.render("style.css");
}); 
app.post('/saveData', (req, res) => { 
    new user({
      name    : req.body.name,
      phone    : req.body.phone,
      email    : req.body.email,
      concern    : req.body.concern
        }).save(function(err, doc){
        if(err) res.json(err);
        else    res.send('Successfully inserted!');
        });
    console.log("Using Body-parser: ", req.body.email) 
}) 

app.listen(PORT, function(error){ 
    if (error) throw error 
    console.log("Server created Successfully on PORT", PORT) 
}) 