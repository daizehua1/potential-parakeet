<template>
	<view class="center">
		<view class="pic">
		<image :src="plate_result.pic" mode=""></image>
		<view class="content">
			
			  <uni-data-select
			    v-model="value"
			    :localdata="range"
			    @change="change"
			  class="select">
			  </uni-data-select>
		</view>
		
		<view class="number">{{plate_result.number}}号</view>
		
		</view>
		<view>
				<uni-fab
					:pattern="pattern"
					:content="content"
					horizontal="right"
					vertical="bottom"
					direction="horizontal"
					:popMenu="true"
					@trigger="trigger"
					@fabClick="fabClick"
				/>
			</view>
			
	
		<uni-popup ref="popup" type="bottom"><image src="../../static/images/parking_space_A.jpg"></image></uni-popup>
		
	
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pattern: {
								color: 'gray',
								backgroundColor: '#FFFFFF',
								selectedColor: '#007AFF',
								buttonColor:'orange'
							},
							content: [
								{
									iconPath: '/static/images/fab/map.png',
									selectedIconPath: '/static/images/fab/map(1).png',
									text: '地图',
									active: true
								},
								{
									iconPath: '/static/images/fab/rule.png',
									selectedIconPath: '/static/images/fab/rule(1).png',
									text: '规则',
									active: true
								},
								
							],
						
				plate_result:{
					// id:"",
					plate:"",
					pic:"",
					type:"",
					level:"",
					number:"",
					pic_path:'../static/images/parking_space_A.jpg'
				},
				value:"A" ,
				    range: [
					{value:"A",text:"A层"},
				    {value:"B",text:"B层"},
					{value:"C",text:"C层"},
					{value:"D",text:"D层"}
				    ],
				}
			
		},
		onLoad(option){
			let {plate}=option
			console.log("传到实时照片页面",plate.length)
			uni.request({
				
				url:'http://localhost:3000/search_paking_place',
				data:{
					plate:plate,
					userphone:uni.getStorageSync("userphone")
				},
				method:'POST',
				header: {
					"Content-Type":"application/json"
				},
				success: (res) => {
					console.log(res,"获得停车位号")
					if(res.data.length==0){
						console.log("查无此车")
						this.plate_result.pic="../../static/images/ban.png"
						
					}
					else{
					const number=res.data[0].number
					const level=res.data[0].level
					this.plate_result.pic="../../static/"+res.data[0].pic 
					
					this.value=level
					// console.log(this.value)
					this.plate_result.number=number
					// this.value=id.substring(0,1)
					// if(level=="C"){
					// 	this.plate_result.pic_path="../../static/images/parking_space_C.jpg"
					// }
					// else{
					// 	this.plate_result.pic_path="../../static/images/parking_space_A.jpg"
					// }
					}
					
				},
				
			})	
			
		},
		methods: {
			trigger(e) {
				console.log(e)
				if(e.index==1){
				uni.showModal({
					title: '提示',
					content:`①负责对停车场(库)的汽车，摩托车，以及自行车管理。
			
			                ②实行 24 小时轮流值班，服从统一安排调度。
			
			               ③按规定着装，佩戴工作牌，对出入车辆按规定和程序指挥放行， 并认真填写《车辆出入登记表》。
			
			               ④遵守规章制度，按时上下班，认真做好交接班手续，不擅离职守。
			
			               ⑤负责指挥区内车辆行驶和停放，维持广场交通、停车秩序。
			
			               ⑥负责对广场道路和停车场的停放车辆进行巡视查看，保证车辆安全。`,
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				}
			else
			{
				this.$refs.popup.open('top')
			}
				
			},
		}
	}
</script>

<style>
.detail{
	display: inline;
},
.center{
	margin-top: 5%;
	text-align: center;
},
.pic{
	margin-left: 5%;
	margin-right:5% ;
	padding-top:5% ;
	padding-bottom: 5%;
	box-shadow:0px 0px 10px 5px #E4E4E4;
}
image{
	width: 80%;
	height:400rpx;
}
.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
}
.select{
	width: 40%;
}
.number{
	padding-top:20rpx ;
	padding-bottom: 20rpx;
	background-color: #fec465;
	margin-top: 5%;
	color: white;
	margin-left: 25%;
	width: 50%;
	border-radius: 10rpx;
}
</style>
