<template>
	<view class="content">
		<view class="line">
			            
		</view>
		<view class="without" v-if="lenth==0">
			<img class="not" src="../../static/images/without_order.png" alt="">
		</view>
		<view class="orders" v-if="item.flag==2" v-for="(item,index) in item">
			<view class="status">
				{{item.start_time}}
				<view v-if="item.flag">
					已预约
				</view>
			</view>
		   <view class="parking_time">
		   	<!-- {{item.end_time}} {{item.start_time}} -->
			<view v-if="item.level" class="time">
				停车层：{{item.level}}层
			</view>
			
			<view v-if="item.number" class="time">
				停车号：{{item.number}}号
			</view>
			<view v-if="item.number" class="time">
				车牌号：{{item.plate}}
			</view>
		   </view>
		   <button class="cancel_reservation" @click="cancel_reservation">取消预约</button>
		</view>
		

       
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:[],
				lenth:0
			}
		},
		onLoad(){
		   const userphone=uni.getStorageSync('userphone')
		   uni.request({
		   	url:'http://localhost:3000/wait_order',
			data:{
				userphone:userphone
			},
			method:'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				console.log(res,"获得已预约订单信息")
				this.item=res.data
				this.lenth=res.data.length
			},
			
		   })	
		},
		methods: {
			cancel_reservation(){
				// console.log(this.item,"获取前端item")
				const level=this.item[0].level
				const number=this.item[0].number
				uni.request({
					url:'http://localhost:3000/cancel_reservation',
					data:{
						userphone:uni.getStorageSync("userphone"),
						level:level,
						number:number
					},
					method:'POST',
					header: {
						"Content-Type":"application/json"
					},
					success: (res) => {
						console.log(res,"取消预约成功")
						
					},
				})
				uni.setStorageSync("reservation_status",0)

				uni.reLaunch({
					url:'/pages/usercenter/usercenter'
				})
				uni.showToast({
					title:"取消成功",
					duration:4000
				})
			}
		}
	}
</script>

<style>
.without{
	/* background-color: white; */
	width: 5rpx;
	height: 5rpx;
	margin-bottom:80rpx;
	text-align: center;
	
}
.not{
	width: 400rpx;
	height: 400rpx;
	padding-top: 400rpx;
	padding-left:160rpx;
}
.line{
		background-color: #f1f1f1;
		color: white;
		text-align: center;
		padding-top: 1%;
		/* font-size: 50rpx; */
	}
.content{
	background-color: #d5d5d5;
	
}
.orders{
	background-color: white;
	margin-top: 2%;
	padding-top: 3%;
	padding-bottom: 5%;
	padding-left: 5%;
	font-size: 15%;
	box-shadow:0px 0px 10px 5px #E4E4E4;
}
.time{
	
}
.parking_time{
	color: black;
	padding-top: 8%;
	display: inline-flexbox;
	display: flex;flex-flow: row nowrap;
	justify-content:space-between;
	padding-right: 5%;
}
.status{
	display: flex;flex-flow: row nowrap;
	justify-content:space-between;
	margin-right: 5%;
	/* font-size: 50%; */
}
.money{
	margin-left: 5%;
}
.cancel_reservation{
	margin-left: 200rpx;
	/* text-align: center; */
	margin-right: 250rpx;
	background-color: #fec465;
	color: white;
	margin-top:10%
	
}
</style>
