<template>
	<view class="content">
		<view class="line">
			            
		</view>
		<view class="orders" v-for="(item,index) in items">
			<view class="status" @click="paid(index)">
				{{item.start_time}}
				<view v-if="item.paid==1" >
					未支付(点击支付)
				</view>
				<view v-if="!item.paid">
					已完成
				</view>
				<view v-if="item.paid == 2">
					进行中
				</view>
			</view>
		   <view class="parking_time">
		   	<!-- {{item.end_time}} {{item.start_time}} -->
			<view v-if="item.all_time" class="time">
				停车时间：{{item.all_time}}分钟
			</view>
			
			<view v-if="!item.end_time" class="time">
				停车时间：{{item.now_time}}分钟
			</view>
	        
			
				<view v-if="item.total_fee" class="money">
					{{item.total_fee}}元
				</view>
						
		  
		   </view>
		   
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[]
			}
		},
		onLoad(){
		   const userphone=uni.getStorageSync('userphone')
		   uni.request({
		   	url:'http://localhost:3000/all_orders',
			data:{
				userphone:userphone
			},
			method:'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				console.log(res,"获得全部订单信息")
				this.items=res.data
			},
			
		   })	
		},
		methods: {
			paid(index){
				const data=this.items[index]
				// console.log(data,"获得item")
				uni.navigateTo({
					url:'/pages/paid/paid?data='+JSON.stringify(data)
				})
			}
		}
	}
</script>

<style>
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
	
}
.time{
	
}
.parking_time{
	color: #524444;
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
</style>
