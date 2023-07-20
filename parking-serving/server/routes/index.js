var express = require('express');
var router = express.Router();
var config = require('./config.json');
// querystring这个模块，用来做url查询参数的解析
const querystring = require('querystring');
const request = require('request');
// 引入之后,后面的appId是在config内的appId名字
appId = config.appId;
appSecret = config.AppSecret;
var connection = require('../db/sql.js')
// const { default: usercenterVue } = require('../../pages/usercenter/usercenter.vue');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

		
// 在这里之前前端需要将登录微信小程序时给的code返回给后端，后端通过相同的/getopenid来接受code
router.post('/getopenid',function (req,res){
	
    
    //将请求地址的url后面的参数拼接起来
    var data = {
        'appid': appId,
        'secret': appSecret,
        'js_code': req.body.code,
        'grant_type': 'authorization_code'
    };
    // console.log(data);
    // querystring的stringify用于拼接查询
    var content = querystring.stringify(data);
    // 根据微信开发者文档给的API
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' + content;
    // 对url发出一个get请求
    request.get({
    'url': url
    }, (error, response, body) => {
    // 将body的内容解析出来
    let abody = JSON.parse(body);
    // body里面包括openid和session_key
    // console.log(abody,"abody")
    // 将请求的内容返回给前端
    res.json(abody)
  })
}) 

//更新信息
// router.post("/renew_detail", function(req, res, next) {
// 	const {avatarUrl,userphone}={...req.body};
// 	const sql =  `update miniprogramme_user set  avatarUrl='${avatarUrl}' where userphone='${userphone}'` ;
//     connection.query(sql,(err,data)=>{
// 		if(err){
// 			res.send('query error')
// 		}
// 		else{
// 			res.send('success')
// 		}
// 	})

// });

router.post('/default_image',function(req,res){
	const{userphone}={...req.body}
	const sql =  `select avatarUrl from miniprogramme_user where userphone='${userphone}'` ;
	const avatarUrl ="https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
	connection.query(sql,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{	
			res.send(data)
		}
	})
	
})

module.exports = router;

router.post('/search_paking_place',function(req,res){
	const{plate}={...req.body}
	console.log("传到后端",plate.length)
	// plate=plate+" "
	const sql =`select * from app_parking where plate="${plate}"`
	connection.query(sql,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{
			res.send(data)
		}
	})
})

router.post('/common_plate',function(req,res){
	const{userphone}={...req.body}
	
	const sql =`select common_plate from common_plate  where username='${userphone}' order by time desc LIMIT 2`
	// console.log(userphone)
	connection.query(sql,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{
			res.send(data)
		}
	})
})

router.post('/reservation',function(req,res){
	const{userphone,plate_number,level,number,address}={...req.body}
	console.log(userphone,plate_number,level,number)     
	const sqls = [`update app_parking set flag=1, plate=RTrim('${plate_number}') where level='${level}' and number='${number}'`,
	              `insert into common_plate values ('${userphone}',RTrim('${plate_number}'),now())`,
				  `insert into uni_parking.app_order(plate,number,level,start_time,flag,user_phone,address,paid) values('${plate_number}','${number}','${level}',now(),'2','${userphone}','${address}','2')`]
				  
	 for(let i = 0; i < sqls.length; i++){
	     connection.query(sqls[i],(err, data) => {
	         if(err){
	         	console.log('query err')
	         }
	         else{
	         	console.log('query success')   	
	         }
	     })
	 }   
		 
	 var url='http://localhost:3000/change_reservation'
	 var data=userphone
	 console.log(data)
	 setTimeout(function(){
	 	const sql =  [`update uni_parking.app_order set flag=0,paid=0,total_fee=0,end_time=now() where user_phone='` +data+`'and flag=2` ,
		              `update uni_parking.app_parking set pic=null,flag=0,plate=null where number='${number} 'and level='${level}'`]
	 	for(let i = 0; i < sql.length; i++){              
	 	connection.query(sql[i],(err,data)=>{
	 		if(err){
	 			res.send('query err')
	 		}
	 		else{	
	 			// res.send(data)
	 			console.log('order cancle')
	 		}
	 	})}
	 	
	 },900000)

})

router.post('/prereservation',function(req,res){
	const{level}={...req.body}
	// console.log(level,"接口level值")
	const sqls = `select number from app_parking where flag=0 and level='${level}' order by number`
	connection.query(sqls,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{
			res.send(data)
		}
	})
})

router.post('/default_image',function(req,res){
	const{userphone}={...req.body}
	const sql =  `select avatarUrl from miniprogramme_user where userphone='${userphone}'` ;
	const avatarUrl ="https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
	connection.query(sql,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{	
			res.send(data)
		}
	})
	
})

router.post('/all_orders',function(req,res){
	const{userphone}={...req.body}
	const sql =  `select id,plate,number,level,paid,TIMESTAMPdiff(minute,start_time,now()) now_time,TIMESTAMPdiff(minute,start_time,end_time) all_time,date_format(start_time,'%Y-%m-%d %H:%i') start_time,date_format(end_time,'%Y-%m-%d %H:%i') end_time,flag,user_phone,total_fee from uni_parking.app_order where user_phone='${userphone}' and flag=0 or flag=1 order by start_time desc` ;
	connection.query(sql,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{	
			res.send(data)
		}
	})
	
})

router.post('/wait_order',function(req,res){
	const{userphone}={...req.body}
	const sql =  `select plate,number,level,date_format(start_time,'%Y-%m-%d %H:%i') start_time,flag,user_phone from uni_parking.app_order where user_phone='${userphone}' and flag=2` ;
	connection.query(sql,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{	
			res.send(data)
		}
	})
	
})

// router.post('/change_reservation',function(req,res){
// 	const{userphone}={...req.body}
// 	const sql =  `update uni_parking.order set flag=0 where user_phone='${userphone}' and flag=1` ;
// 	connection.query(sql,(err,data)=>{
// 		if(err){
// 			res.send('query err')
// 		}
// 		else{	
// 			res.send(data)
// 		}
// 	})
	
// })

router.post('/check_reservation',function(req,res){
	const{userphone}={...req.body}
	// console.log(level,"接口level值")
	const sqls = `select count(*) number from uni_parking.app_order where (flag !=0 or paid !=0 ) and user_phone='${userphone}'`
	connection.query(sqls,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{
			res.send(data)
		}
	})
})

router.post('/cancel_reservation',function(req,res){
	const{userphone,number,level}={...req.body}
	console.log(level,number,"后端获得停车位置")
	const sql =  [`update uni_parking.app_order set flag=0,paid=0,end_time=now() where user_phone='${userphone}' and flag=2`,
	             `update uni_parking.app_parking set flag=0,plate=null,pic=null where number='${number}' and level='${level}'`]
	for(let i = 0; i < sql.length; i++){   
	connection.query(sql[i],(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{	
			console.log("后端取消成功")
		}
	})
	}
	
})

router.post('/pay',function(req,res){
	const {userphone,id}={...req.body}
	console.log(id,"获得要支付的订单")
	const sql=`update uni_parking.app_order set paid=0,end_time=now(),total_fee=if(timestampdiff(hour, start_time,end_time)>=1,timestampdiff(hour, start_time,end_time)*5,5) where id='${id}' and user_phone='${userphone}'`
	connection.query(sql,(err,data)=>{
		if(err){
			res.send('query')
		}
		else{
			console.log("订单取消成功")
		}
	})
})

router.post('/check_parking_number',function(req,res){
	
	// console.log(level,"接口level值")
	const sqls = `select distinct level from uni_parking.app_parking`
	connection.query(sqls,(err,data)=>{
		if(err){
			res.send('query err')
		}
		else{
			res.send(data)
		}
	})
})
