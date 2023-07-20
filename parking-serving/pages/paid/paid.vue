<template>
	<view class="content">
		<view class="detail">
			<view class="plate">
				车牌 ：  {{data.plate}}
			</view>
			<view class="start_time">
				开始时间：{{data.start_time}}
			</view>

			<view class="paid" v-if="data.paid == 1">
				订单状态：   未支付
			 <button class="button" @click="paid" type="default">支付</button>
			</view>
			
			<view class="paid" v-if="data.paid == 2">
				订单状态：   订单进行中
			 <!-- <button class="button" @click="paid" type="default">支付</button> -->
			</view>
			
			<view class="paid" v-if="!data.paid">
				订单状态：   已支付
				<view class="fee">
					金额：     {{data.total_fee}}
				</view>
				<view class="end_time">
					结束时间：{{data.end_time}}
				</view>
				<view class="all_time" >
					停车时长：    {{data.all_time}} 分钟
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:""
			}
		},
		methods: {
			paid(){
				const userphone=uni.getStorageSync("userphone")
				const id=this.data.id
				uni.request({
					
					url:'http://localhost:3000/pay',
					data:{
						userphone:userphone,
						id:id
					},
					method:'POST',
					header: {
						"Content-Type":"application/json"
					},
					success: (res) => {
						console.log("支付成功")
					},
					
				}),
				uni.reLaunch({
					url:'/pages/usercenter/usercenter'
				})
				uni.showToast({
					title:"支付成功",
					duration:2000
				})
			}
		},
		onLoad(option){
			var data=JSON.parse(option.data)
			this.data=data
			console.log(data)
		}
	}
</script>

<style>
.content{
	margin-left: 2%;
	margin-right: 2%;
	margin-top: 2%;
	/* display: inline-block; */
}
.plate{
	justify-content:space-between;
}
.button{
	margin-top: 10%;
	width: 50%;
	height: 100rpx;
	padding-bottom: 2%;
	color: white;
	background-color: #fec465;
}
.detail{
	box-shadow:0px 0px 10px 5px #E4E4E4;
	padding-left: 2%;
	padding-right: 2%;
	padding-top: 2%;
}
</style>
