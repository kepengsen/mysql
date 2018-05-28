const express = require("express");
const opn=require('opn');
const app = express();

//
const dbTools = require("./tools.js");

let server = app.listen(8888,'localhost', function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log("Server running at http://%s:%s", host, port);
  
  opn("http://"+host+":"+port );
});

app
  .get("/index", function(req, res) {
    //    查看数据
    dbTools.finds({ pageNum: 1, pageSize: 10 }, (err, result) => {
      if (err) {
        console.log("查询失败");
        res.send(err.message);
      } else {
        console.log("查询成功");
        res.send({ code: 200, ret: "success", info: "查询成功", data: result });
      }
    });
  })
  .get("/add", function(req, res) {
    //添加
    dbTools.add({ name: "小花猫", sex: "男", age: 27 }, (err, result) => {
      if (err) {
        console.log("添加失败");
        res.send(err.message);
      } else {
        console.log("添加成功");
        res.send({ code: 200, ret: "success", info: "添加成功", data: result });
      }
    });
  })
  .get("/remove", function(req, res) {
    //删除数据
    dbTools.remove(1, (err, result) => {
      if (err) {
        console.log("删除失败");
        res.send(err.message);
      } else {
        console.log("删除成功");
        res.send({ code: 200, ret: "success", info: "删除成功", data: result });
      }
    });
  })
  .get("/update", function(req, res) {
    //    修改数据
    dbTools.update(
      { name: "修改", sex: "男", age: 27, id: 4 },
      (err, result) => {
        if (err) {
          console.log("修改失败");
          res.send(err.message);
        } else {
          console.log("修改成功");
          res.send({ code: 200,ret: "success",info: "修改成功",data: result});
        }
      }
    );
  });
