var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/teacherdb";

module.exports = {
    findAll() { 
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("teacherdb");
        dbo.collection("teacherdb"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            var resultArr=[...result]
            return resultArr
        });
    });
},
insertUser(userInfo){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("teacherdb");
        // var myobj = {Tname: "苗鑫", Tsex : "女", Tage : 25, TprofessionalTitle : "教师", Tyear : 2, Tphone : "15032317445", Tsalary : 5000 }
        dbo.collection("teacherdb").insertOne(userInfo, function(err, res) {
            if (err) throw err;
            console.log(myobj.Tname+'文档插入成功');
            db.close();
        });
    });
}
}

