<template>
	<view class="content">
		
			<view class="ad"> 
					<uni-notice-bar scrollable="true" show-icon="true"  :single="true" text="积分可以兑换折扣,智能停车,方便你我他" />
					
				</view>
		
		<uni-popup ref="popup" type="bottom"><image style="height: 500rpx; width: 600rpx; margin-left: 10%;" src="../../static/images/parking_space_A.jpg"></image></uni-popup>
			
		  <view class="border">
			  <!-- <o-divider textColor="gray" lineColor="rgba(192, 192, 192, 0.5)">请填写车牌信息</o-divider> -->
		<uni-forms :modelValue="formData" ref="form" :rules="rules"  validate-trigger="bind">
			<uni-forms-item  name="level" >
			<uni-data-select @change="change" v-model="formData.level" :localdata="range1"  placeholder="停车层">
			</uni-data-select> 
			</uni-forms-item>
			
			<uni-forms-item  name="number" > 
			<uni-data-select @change="change1" v-model="formData.number" :localdata="range3"  placeholder="停车号">
			</uni-data-select>
			</uni-forms-item>
			
			<uni-forms-item  name="plate_number">
			<!-- <input class="input" v-model="formData.plate_number" type="text" placeholder="请输入车牌号" @input="fpNumInput" /> -->
			<car-number-input  :defaultStr="defaultNum" @numberInputResult="numberInputResult"></car-number-input>
			</uni-forms-item>
			
			</uni-forms>
		
		
	     <button class="btn" @click="submit">预约</button>
		 </view>
		 <view class="map"  @click="navi">
			 
		 	<image src="../../static/images/dingwei.png" mode=""></image>{{address}}
			
		 	</view>
		 <view class="area" @click="callphone('13820125458')">
		   	咨询电话:13820125458
			<view class="detail">个人积分：10 余额：10元</view>
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
		 			
		 		/>
		 	</view>
			
	</view>
</template>

<script>
import { NULL } from 'mysql/lib/protocol/constants/types'
	
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
		
				formData:{
					level:"",
					number:"",
					plate_number:"",
					length:0
				},
				address:"",
				rules:{
					
					level:{
						rules:[
							{
								required:true,
								errorMessage:'请选择停车层',
							}
						]
					},
		
				},
				range1:
				[
					
				],
				range2:[
					
				],
				range3:[
					{value:0,text:"无"}
				],
				range_data:{},
			}
		},
		methods: { 
			data_process(res,length){
				// console.log("data_process",res.data[0].level)
				for (var i = 0; i <length ; i++) {
					var a={value:i,text:res.data[i].level}
					this.range1.push(a)
				    // console.log("range1",this.range1)
				 }
			},
			numberInputResult(e){
			           
			           this.formData.plate_number=e
					  
		},
			
		
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
		
				callphone(tel){
					uni.makePhoneCall({
						phoneNumber: tel
					})
				},
			
			navi(){
				uni.navigateTo({
					url:'/pages/parking-map/parking-map'
				})
			},
			  otherFun(address) {
			      
			      if (address) {
					console.log(address)
			        this.address=address
			      }
			    },
			
			change(e){
				// console.log(this.range1[e].text)
				const level=this.range1[e].text
				this.formData.level=level
				// console.log(this.formData.level)
				uni.request({
					
					url:'http://localhost:3000/prereservation',
					data:{
						level:level
					},
					method:'POST',
					header: {
						"Content-Type":"application/json"
					},
					success: (res) => {
						this.range2=res.data
						this.range2.forEach((value , index) => {
							value['value'] = index
						})
						this.range3 = this.range2.map(item => ({
						            value: item.value,
						            text: item.number
						        }))
						
					},
					
				})	
				// console.log(this.formData.level,"请求之后的level")
			},
			
			change1(e){
				this.formData.number=this.range3[e].text
				// console.log(this.range1[this.formData.level].text)
				
			},
			
			submit(){
				this.length=this.formData.plate_number.length
				
				if(!uni.getStorageSync('islogining')){
					uni.navigateTo({
						url:`/pages/login/login`,
						
					})
				}
				else{
					
					this.formData.plate_number=this.formData.plate_number.trim()
					if(uni.getStorageSync("reservation_status") == 1){
						console.log("不可以预约")
					}
					
					if(uni.getStorageSync("reservation_status") != 1 && this.formData.plate_number!=null && this.formData.level!=null ){			
					
					this.$refs.form.validate().then(res=>{
						this.formData.plate_number=res.plate_number
						this.formData.number=this.range3[res.number].text
						this.formData.level=this.range1[res.level].text
						
					
					
	                uni.request({
					url:'http://localhost:3000/reservation',
					data:{
						level:this.formData.level,
						number:this.formData.number,
						userphone:uni.getStorageSync("userphone"),
						plate_number:this.formData.plate_number,
						address:uni.getStorageSync("address")
					},
					method:'POST',
					header: {
						"Content-Type":"application/json"
					},
					success: (res) => {
						console.log(res)		

					},
			
				   })
				   uni.setStorageSync("reservation_status",1)
				   // console.log("预约之后的状态",uni.getStorageSync("reservation_status"))
				   uni.showToast({
				   	title: '预约成功',
				   	duration: 2000
				   });
				   })
				   }
				   else{
					   console.log("预约失败",uni.getStorageSync("reservation_status"))
					   uni.showToast({
					   	title: '预约失败',
					   	duration: 2000,
						icon: 'none'
					   });
				   }
				
				}
				
			},

			
		},	
		
 onLoad() {
            this.address=uni.getStorageSync("address")
		    
			uni.request({
								url:'http://localhost:3000/check_reservation',
								data:{
									userphone:uni.getStorageSync("userphone"),
								},
								method:'POST',
								header: {
									"Content-Type":"application/json"
								},
								success: (res) => {
									console.log(res.data[0].number,"判断是否可以预约0为可以预约")
									if (res.data>=1){
										uni.setStorageSync("reservation_status",1);
									}
									else{
										uni.setStorageSync("reservation_status",0);
									}
									
								},
								
			})
			,
			uni.request({
								url:'http://localhost:3000/check_parking_number',
								
								method:'POST',
								header: {
									"Content-Type":"application/json"
								},
								success: (res) => {
									
									this.data_process(res,res.data.length)
									// range1:
									// [
									// 	{value:0,text:"A"},{value:1,text:"B"},{value:2,text:"C"}
									// ],
									
								},

			

								
			})	
			
        },


	}
</script>

<style>
	.ad{
		/* background: linear-gradient(rgb(254, 187, 78),rgb(254, 219, 113)); */
		width: 100%;
		height:80rpx;
		font-style: center;
	}
	.map{
		color:gray;
		margin-top: 10%;
	}
	image{
		width: 30rpx;
		height: 35rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
        background: linear-gradient(rgb(254, 187, 78),rgb(254, 219, 113));
	    height: 100%;
		
	}
	
.btn{
		width: 40%;
		border-radius:20rpx ;
		background-color: #fec465;
		color: white;
		margin-top: 10%;
	}
	.border{
		width: 100%;
		/* padding-bottom: 5%; */
		/* box-shadow:0px 0px 10px 5px #fbe0b4 ; */
		/* margin-top: 15%; */
		border-radius: 20rpx;
		background: linear-gradient(rgb(254, 187, 78),rgb(254, 239, 213));
	}
	.content{
		background: linear-gradient(rgb(254, 216, 153),rgb(254, 242, 219));
	}
   .car{
	   width: 100%;
	   
   }
	.swiper{
	        width: 683upx;
	        height: 250upx; 
	    }
	 
	    
	    .swiper-item image{
	        width: 100%;
	        height: 100%;
	}
    .area{
		/* background: white; */
		color:orange;
		display:inline;
		
		
	}
	.detail{
		font-size: 1%;
		color: gray;
		
	}
</style>
