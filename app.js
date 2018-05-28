const express = require('express');
const app = express();

//
const dbTools = require('./tools.js');

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

//添加

// dbTools.add({ name: '小柯', sex: '男', age: 27 }, (err, result) => {
//     if (err) {
//         console.log('添加失败');
//         res.send(err.message);
//     } else {
//         console.log('添加成功');
//         res.send({ 'code': 200, ret: 'success', info: '添加成功', data: result });
//     }
// })

//删除数据

// dbTools.remove(4, (err, result) => {
//     if (err) {
//         console.log('删除失败');
//         res.send(err.message);
//     } else {
//         console.log('删除成功');
//         res.send({ 'code': 200, ret: 'success', info: '删除成功', data: result });
//     }
// })

//修改数据

// dbTools.update({ name: '小柯', sex: '男', age: 27, id: 3 }, (err, result) => {
//     if (err) {
//         console.log('修改失败');
//         res.send(err.message);
//     } else {
//         console.log('修改成功');
//         res.send({ 'code': 200, ret: 'success', info: '修改成功', data: result });
//     }
// })



app.get('/index', function (req, res) {
    dbTools.finds({ pageNum: 1, pageSize: 10},(err,result)=>{
        if(err){
            console.log('查询失败');
            res.send(err.message);
        }else{
            console.log('查询成功');
            res.send({ 'code': 200, ret: 'success', info: '查询成功', data: result});
        }     
    })
});