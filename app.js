var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var app = express();
var faker = require('faker')
require("./models/news");
var News = mongoose.model("News");

app.use(express.static(__dirname + '/app'))
mongoose.connect('mongodb://localhost:27017/news_data_store');


app.get('/news', function(req, res){
  News.find({}, function(err, data){
    if(err){
      res.send("Error", err)
    } else {
      res.json(data)
    }
  });
});

var imagesArray = ['images/1.jpg', 'images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg','images/6.jpg','images/7.jpg','images/8.jpg', 'images/9.jpg', 'images/10.jpg'];


function createNewsItem(){
  var n = Math.round((Math.random() * 9))
  var news = new News({
    title: faker.lorem.word(),
    summary: faker.lorem.sentence(),
    description: faker.lorem.sentences(),
    image: imagesArray[n]
  });
  news.save(function(err, news) {
    if (err) console.log(err);
  });
}

for(var i =0; i < 10; i++){
  createNewsItem();
}

app.listen(3000);
