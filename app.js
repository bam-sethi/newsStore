var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');

app.use(express.static(__dirname + '/app'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/news_data_store');

require("./models/news");
var News = mongoose.model("News");

var NEWSITEM = new News({
  title: 'London NEWS',
  summary: 'bkhdfghkadsf',
  description: 'abfdf',
  image: 'http://www.mactrast.com/wp-content/uploads/2015/01/apple-macintosh-1984-history.jpg'
});


NEWSITEM.save(function(err, news) {
  if (err) console.log(err);
  console.log('NEWS Saved!');
});


// root route
app.get('/', function(req, res){
  console.log("hello world")
  res.sendFile(path.join(__dirname + 'app/index.html'))
})


app.get('/news', function(req, res){
  News.find({}, function(err, data){
    if(err){
      res.send("Error", err)
    } else {
      res.json(data)
    }
  })
})

function getGuardianApiData(){
  http.get({
    host: 'content.guardianapis.com',
    path: '/search?api-key=sn5j9ay45s4kphs5cxkm6n2y'
  }, function(response){
    console.log(response)
    var body = '';
    response.on('data', function(d){
       body += d;
    });
    response.on('end', function(){
      var res = JSON.parse(body);
      var data = res.response.results
      var title = data[0].webTitle
      console.log()
    });
  });  
}


getGuardianApiData();


app.listen(3000);
