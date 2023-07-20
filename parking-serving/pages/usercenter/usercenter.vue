<template>
<view>
	<view class="content">
		       
				<!-- <button style="background-color: white;"  @chooseavatar="onChooseAvatar" open-type="chooseAvatar" ><image mode="widthFix" class="profile_photo" :src="avatarUrl"></image></button> -->
		  <view  class="profile_photo">
		        <open-data class="profile_photo" type="userAvatarUrl"></open-data>
		      </view>

				
			</view>
	<view class="server">
				
					<view class="title">我的订单</view>
					<view class="sorts">
		
							<view style="margin-top: -10rpx;margin-left: 60rpx;" @click="gotoFeeds(`/pages/wait_order/wait_order`)">
								<image src='@/static/images/wait_order.png' style="width: 30px;height: 30px;"></image>
							</view>
							<view style="margin-top: 60rpx;margin-left: -60rpx;margin-bottom: -20rpx;" @click="gotoFeeds(`/pages/wait_order/wait_order`)">
								<text class="icon-bill">已预约</text>
							</view>
							
							<view style="margin-top: -15rpx;margin-left: 95rpx;" @click="gotoFeeds(`/pages/all_orders/all_orders`)">
								<image src='@/static/images/all_orders.png' style="width: 40px;height: 40px;"></image>
							</view>
							<view style="margin-top: 60rpx;margin-left: -85rpx;margin-bottom: -20rpx;" @click="gotoFeeds(`/pages/all_orders/all_orders`)">
								<text class="icon-list">全部订单</text>
							</view>
						
					
				</view>
	</view>
	
			<view class="extra">
				<view class="item icon-arrow" @click="callphone('13820125458')">联系客服</view>
				<button open-type="feedback" class="item icon-arrow">意见反馈</button>
			</view>

	
			</view>
</template>

<script>
import { get } from 'express/lib/request'
	export default {
		onLoad() {
			const userphone=uni.getStorageSync("userphone")
			// console.log(userphone,"获得手机号")
			// if(uni.getStorageSync('islogining')){
			// 	uni.request({
					
			// 		url:'http://localhost:3000/default_image',
			// 		data:{
			// 			userphone:userphone,
			// 		},
			// 		method:'POST',
			// 		header: {
			// 			"Content-Type": "application/x-www-form-urlencoded"
			// 		},
			// 		success: (res) => {
			// 			console.log(res,"获得头像链接")
			// 			console.log(res.data[0].avatarUrl)
			// 			if(res.data[0].avatarUrl!=null){
			// 				this.avatarUrl=res.data[0].avatarUrl	
			// 			}
						
							
			// 		},
					
			// 	})	
			// }
			// else{
			// 	this.avatarUrl=	'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
			// }

		},
		data() {
			// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
			return {
				// nickName: null,
				// avatarUrl:defaultAvatarUrl,
				
			}
		},
		methods: {
			callphone(tel){
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			gotoFeeds(url){
				if(uni.getStorageSync('islogining')){
					uni.navigateTo({
					url:url
					});
				}
				else{
					uni.navigateTo({
					url:'/pages/login/login'
					});
				}

			},
			// onChooseAvatar(e) {
			// 	console.log(e.detail,"详细信息")
			//     this.avatarUrl  = e.detail.avatarUrl
			// 	// console.log(this.avatarUrl,"获得头像链接")
			// 	const userphone=uni.getStorageSync('userphone')
			// 	console.log(userphone)
			//     uni.request({
					
			//     	url:'http://localhost:3000/renew_detail',
			// 		data:{
			// 			avatarUrl:this.avatarUrl,
			// 			userphone:userphone,
			// 		},
			// 		method:'POST',
			// 		header: {
			// 			"Content-Type": "application/x-www-form-urlencoded"
			// 		},
			// 		success: (res) => {
			// 			console.log(res)
						
			// 		}
			//     })
			//   },
			
		}
	}
</script>

<style>
.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 10%;
	}
.profile_photo{
	   height: 100rpx ;
	   width: 100rpx;
	   
}
.weui-input{
	text-align: center;
}

button {
    margin: unset;
    padding: unset;
	
}
button:after {
	border: unset;
}
.server{
			margin: 20rpx 20rpx 0 20rpx;
			padding: 40rpx 0;
			background-color: #fff;
			border-radius: 4rpx;
}
.title {
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #333;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
			margin-top: -30rpx;
		}
.sorts {
			padding-top: 30rpx;
			text-align: center;
			display: flex;
		}
[class*="icon-"] {
			flex: 1;
			font-size: 24rpx;}
			
.extra {
		margin: 0 20rpx;
		background-color: #fff;
		border-radius: 4rpx;
}
		.item {
			line-height: 1;
			padding: 25rpx 0 25rpx 20rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 30rpx;
			color: #333;
		}

		button {
			text-align: left;
			background-color: #fff;

		}
	

</style>
