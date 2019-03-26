//express_demo.js 文件


// var {findAll}=require('./mongo.js')
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/teacherdb";

var app = express();

app.get('/', function (req, res) {
  
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("teacherdb");
    dbo.collection("teacherdb"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        var resultArr=[...result]
        res.send(resultArr)
    });
});
  
   
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})