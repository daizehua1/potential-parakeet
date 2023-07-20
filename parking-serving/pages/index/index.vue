<template>
	<view class="content">
		<view class="car">
			 <swiper class="swiper" 
			        indicator-dots="true" 
			        autoplay="true" 
			        interval="5000" 
			        duration="1500"  
					circular="true">
			        <swiper-item v-for="(item , index) in homeSlide" :key="index">
			            <image :src="item.img"></image>
			        </swiper-item>
			    </swiper>
				
		</view>
		
		  
         
		 <view class="border">
		    <o-divider textColor="gray" lineColor="rgba(192, 192, 192, 0.5)">请填写车牌信息</o-divider>
		    <uni-forms :modelValue="formData" ref="form" :rules="rules" >
			<uni-forms-item  name="common" >
			<uni-data-select @change="change" v-model="formData.common" :localdata="range3"  placeholder="常用车牌">
			</uni-data-select> 
			</uni-forms-item>
			<uni-forms-item  name="province" >
			<uni-data-select v-model="formData.province" :localdata="range1"  placeholder="选择地区">
			</uni-data-select>
			</uni-forms-item>
			<uni-forms-item  name="area">
			<uni-data-select v-model="formData.area" :localdata="range2"  placeholder="选择城市字母">
			</uni-data-select> </uni-forms-item>
			<uni-forms-item class="input-style" name="plate_number">
			<input class="input" v-model="formData.plate_number" type="text" placeholder="请输入车牌号" >
			</uni-forms-item>
			
			</uni-forms>
			</view>
	     <button class="btn" @click="submit">查询车位号</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			
			return {
				// avatarUrl: defaultAvatarUrl,
				formData:{
					province:"鲁",
					area:'',
					plate_number:'',
					common:''
				},
				homeSlide:[
				            {img:'/static/images/swiper/parking_1.jpg'},
				            {img:'/static/images/swiper/parking_2.jpg'},
				            {img:'/static/images/swiper/parking_3.jpg'},    
				               ],
					rules:{
						plate_number:{
							rules:[
								{
								required:true,
								errorMessage:'请输入车牌号',
							},
							{minLength:5,
							maxLength:6,
							errorMessage:'车牌号长度在{minLength}到{maxLength}个字符'}
							]
						}
					},
					
				
					
				

				range1:[
					{value:0,text:"京"},{value:1,text:"津"},
					{value:2,text:"冀"},{value:3,text:"晋"},
					{value:4,text:"蒙"},{value:5,text:"辽"},
					{value:6,text:"吉"},{value:7,text:"黑"},
					{value:8,text:"沪"},{value:9,text:"苏"},
					{value:10,text:"浙"},{value:11,text:"皖"},
					{value:12,text:"闽"},{value:13,text:"赣"},
					{value:14,text:"鲁"},{value:15,text:"豫"},
					{value:16,text:"鄂"},{value:17,text:"湘"},
					{value:18,text:"粤"},{value:19,text:"桂"},
					{value:20,text:"琼"},{value:21,text:"渝"},
					{value:22,text:"川"},{value:23,text:"贵"},
					{value:24,text:"云"},{value:25,text:"藏"},
					{value:26,text:"陕"},{value:27,text:"甘"},
					{value:28,text:"青"},{value:29,text:"宁"},
					{value:30,text:"新"}
				],
				range2:[
					{value:0,text:"A"},{value:1,text:"B"},
					{value:2,text:"C"},{value:3,text:"D"},
					{value:4,text:"E"},{value:5,text:"F"},
					{value:6,text:"G"},{value:7,text:"H"},
					{value:8,text:"J"},{value:9,text:"K"},
					{value:10,text:"L"},{value:11,text:"M"},
					{value:12,text:"N"},{value:13,text:"P"},
					{value:14,text:"Q"},{value:15,text:"R"},
					{value:16,text:"S"},{value:17,text:"T"},
					{value:18,text:"U"},{value:19,text:"V"},
					{value:20,text:"W"},{value:21,text:"X"},
					{value:22,text:"Y"},{value:23,text:"Z"},
					
				],
				range3:
				[
					{value:0,text:"无"},{value:1,text:"无"}
				]
			}
		},
		onLoad() {
			const userphone=uni.getStorageSync('userphone')
			console.log(userphone)
			if(uni.getStorageSync('islogining')){
				
				uni.request({
					url:'http://localhost:3000/common_plate',
					data:{
						userphone:userphone
					},  
					method:'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res,"获得常用车牌")
						this.range3[0].text=res.data[0].common_plate
						this.range3[1].text=res.data[1].common_plate	
					},
					
				          });
			}


		},
		
					
		methods: {
			change(e){
				
				const plate=this.range3[e].text
				console.log(this.range3[e].text)
			    uni.navigateTo({
			    	url:`/pages/parking_picture/parking_picture?plate=${plate}`,
			    })
			},
			
			submit(){
				// console.log(uni.getStorageSync('islogining'))
				if(!uni.getStorageSync('islogining')){
					uni.navigateTo({
						url:`/pages/login/login`,
						
					})
				}
				else{
					this.$refs.form.validate().then(res=>{
						const plate=this.range1[res.province].text+this.range2[res.area].text+res.plate_number
						console.log('车牌号',plate)
						uni.navigateTo({
							url:`/pages/parking_picture/parking_picture?plate=${plate}`,
							
						})
					
					})
				}
				
			},
			
			

		}
	}
</script>

<style>

	.content {
		display: flex;
		flex-direction: column;
		/* 按照列布局 */
		align-items: center;
		justify-content: center;
        background: linear-gradient(rgb(254, 187, 78),rgb(254, 239, 213));
	     height: 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.car_size{
		width: 700rpx;
		height: 300rpx;
	}
	.btn{
		width: 40%;
		border-radius:20rpx ;
		background-color: #fec465;
		color: white;
		margin-top: 7%;
		margin-bottom: 3%;
		border-color: white;
		
	},
	.border{
		width: 90%;
		padding-top:5% ;
		padding-bottom: 5%;
		/* box-shadow:0px 0px 10px 5px #fbe0b4 ; */
		margin-top: 10%;
		border-radius: 20rpx;
		background-color: white;
	},
	.swiper{
	        width: 680upx;
	        height: 350upx; 
	    }
	 
	    
	    .swiper-item image{
	        width: 100%;
	        height: 100%;
	}
</style>
