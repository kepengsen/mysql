`use strict`
const mysql = require('mysql');
let config = {
    host: 'localhost', //服务器
    port: '3306',      //端口号
    user: 'root',      //用户名
    password: 'root',  //密码
    database: 'study'  //数据库库名
};
let tools = {};
let connection;
//创建链接
function dbConnection() {
    connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) {
            console.log('连接失败' + err);
            return;
        } else {
            console.log('连接成功');
        }
    });
}

//添加数据 
tools.add = function (dataArr, callback) {
    dbConnection();
    let sql = 'insert into user(name,sex,age) VALUES(?,?,?)';
    let params = [dataArr.name, dataArr.sex, dataArr.age];
    connection.query(sql, params, function (err, result) {
        connection.end();
        callback(err, result)
    });
}

//删除数据
tools.remove = function (id, callback) {
    let sql = "delete from user where id =" + id;
    console.log(sql);
    connection.query(sql, function (err, result) {
        connection.end();
        callback(err, result)
    });
}

//修改数据
tools.update = function (dataArr, callback) {
    let sql = 'update user set name = ?,sex = ?,age = ? where id = ?';
    let params = [dataArr.name, dataArr.sex, dataArr.age, dataArr.id];
    connection.query(sql, params, function (err, result) {
        connection.end();
        callback(err, result)
    });
}

//查询数据
tools.finds = function (dataArr, callback) {
    dbConnection();
    let pageNum = dataArr.pageNum; //页码
    let pageSize = dataArr.pageSize; //每页显示条数
    let start = (pageNum - 1) * pageSize;
    //desc 降序 asc 升序
    let sql = 'select *,(select count(*) from user) as total from user order by id desc limit ' + start + ' , ' + pageSize + '';
    connection.query(sql, function (err, result) {
        connection.end();
        callback(err, result);
    });
}

//创建表
tools.createTable = function (callback) {
    dbConnection();
    let sql = `CREATE TABLE user(
               id int(12) NOT NULL AUTO_INCREMENT,
               name varchar(200) NOT NULL,
               sex varchar(20) DEFAULT '男',
               age varchar(20) DEFAULT '18',
               introduce varchar(1000) DEFAULT '暂无',
               createTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
               updataTime timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
               PRIMARY KEY(id)
        ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8`;
    connection.query(sql, function (err, results, fields) {
        connection.end();
        callback(err, results, fields);
    });
};

module.exports = tools;