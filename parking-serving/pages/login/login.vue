<!-- 微信授权登录全程代码实现 -->
<template>
	<view class="">
		 <view class="logo">
		<image class="logo-position"   src="../../static/images/parking.png" mode=""></image>
	</view> 
		<button class="login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机号一键登录</button>
		<button @click="rollback" class="back">拒绝授权</button>		
	</view>
</template>

<script>
	import WXBizDataCrypt from '../../static/WXBizDataCrypt.js'
	var QQMapWX = require('../../qqmap-wx-jssdk.min.js');
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId: '',
				// nickName: null,
				// avatarUrl: null,
				// isloading: uni.getStorageSync('isloading')||true  ,//默认为true
				common_plate:{},
				
			};
		},
		methods: {
			rollback(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
				
			},
			login() {
				let that = this;
				uni.showLoading({
					title: '登录中...'
				});

				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						// uni.setStorageSync('isloading',false)
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.request({
							url: 'http://localhost:3000/getopenid',//接入后端提供的登录接口
							data: {
								code: code,//传入参数code获取登录凭证
							},
							method: 'post',
							
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},//请求头
							success: (res) => {
								//openId、或SessionKdy存储//隐藏loading
								// console.log(res.data.session_key,"获取session")
								uni.setStorageSync("openid", res.data.openid)
								uni.setStorageSync("session_key", res.data.session_key)
								uni.hideLoading();
								
							}
						});
						
					},
				});
				
			},
							
				getPhoneNumber(e){
						
						
						
						// console.log(uni.getStorageSync('islogining'))
						const session_key = uni.getStorageSync('session_key');
						// console.log(session_key,"拿到session——key")
						let pc = new WXBizDataCrypt('wx52c6f87e5df5cf4b',session_key);
						// console.log(e.detail.encryptedData)
						let data = pc.decryptData(e.detail.encryptedData,e.detail.iv);
						// console.log(data,"拿到手机号")       //data就是最终解密的用户信息  
						uni.setStorageSync("userphone",data.phoneNumber)
						const userphone=uni.getStorageSync("userphone");
						// console.log(userphone)
						uni.setStorageSync('islogining',true);
						// console.log(uni.getStorageSync('userphone'),"使用用户号码查询车牌")
						uni.reLaunch({
							url:'/pages/index/index'
						})
					},
					
					

				
		},
		onLoad() { //默认加载
			this.login()
			// this.getAuthorizeInfo()
			// console.log(uni.getStorageSync('islogining'))
			uni.setStorageSync("islogining",false)
			
			const qqmapsdk=new QQMapWX({
			    key:'LT2BZ-RSKED-BEH46-P7MBK-7OVF3-GLBRU'
			})
			
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
			        // console.log('当前位置的经度：' + res.longitude);
			        // console.log('当前位置的纬度：' + res.latitude);
			        qqmapsdk.reverseGeocoder({
			            location:{
			                longitude:res.longitude,
			                latitude:res.latitude
			            },
			            success(res1){
			                console.log(res1.result.formatted_addresses.recommend)
			                console.log(res1.result)
							
							uni.setStorageSync("address",res1.result.formatted_addresses.recommend)
			            },
			            fail(err1){
			                console.log(err1)
			            }
			        })
					
			    }
			});
			
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
	.login{
		margin-top: 50%;
		margin-left: 5%;
		margin-right: 5%;
		border-radius: 50rpx;
		/* border-color: green; */
		background-color: rgb(254,160,2);
		color: white;
	}
	.logo{
		margin-left: 5%;
		margin-right: 5%;
		height:200rpx ;
	}
	.logo-position{
		margin-left: 35%;
		padding-top:40% ;
		width: 200rpx;
		height: 200rpx;
	}
	.back{
		margin-top: 5%;
		margin-left: 5%;
		margin-right: 5%;
		border-radius: 50rpx;
		/* border-color: green; */
		background-color: rgb(254,160,2);
		color: white;
	}
</style>

