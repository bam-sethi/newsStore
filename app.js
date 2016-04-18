var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var faker = require('faker')
// var http = require('http');

app.use(express.static(__dirname + '/app'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/news_data_store');

require("./models/news");
var News = mongoose.model("News");

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

function generateData(){
  var fakerObject = {
    title : faker.lorem.word(),
    summary : faker.lorem.sentence(),
    description : faker.lorem.sentences(),
    image : faker.image.cats()
  }
  return fakerObject;
}

function createNewsItem(){
  var news = new News({
    title: faker.lorem.word(),
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentences(),
    image: faker.image.image()
  });
  // console.log(news)
  news.save(function(err, news) {
    if (err) console.log(err);
    // console.log('NEWS Saved!');
  });
}

for(var i =0; i < 10; i++){
  createNewsItem()
}

app.listen(3000);
