var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost', 
    port:3306, //端口号
    user: 'root', //连接数据库时的账号
    password: '123456',//连接数据库时的密码
    database: 'uni_parking' ,//需要连接的数据库
	multipleStatements: true,  // 支持执行多条 sql 语句
});
module.exports = connection;
