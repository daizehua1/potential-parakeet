<template>
    <view class="content">
        <view class="top">
            <input type="text" placeholder="请输入停车场地址" :value="searchKey" @input="search"/>
            <scroll-view scroll-y="true" class="option" v-show="IsOption">
                <view class='column_item' v-for='(item,index) in data' :key='index' @click="tapOption(item)" >{{item.title}}</view>
            </scroll-view>
        </view>
        <view >
            <view class="page-section page-section-gap">
              <map
                id="myMap"
                style="width: 100%; height: 280px;"
                :latitude="latitude"
                :longitude="longitude"
                :markers="markers"
                 @poitap = "poitap"
                show-location
              ></map>
			  <!-- :covers="covers" -->
            </view>
        </view>
		
		<view class="" style="text-align: center; color: orange;" @click="backres">
			确定
		</view>
    </view>
</template>

<script>
    // 引入SDK核心类
    var QQMapWX = require('../../qqmap-wx-jssdk.min.js');
    var qqmapsdk;
    var self;
    export default {
        data() {
            return {
                data:[],
                IsOption:false,
                searchKey:"",
                address:"",
                latitude: '',
                longitude:'',
                    markers: [{
                      id: 1,
                      latitude: "",
                      longitude:"",
                      name: '当前位置',
					  width:"30",
					  height:"40",
                    }],
            }
        },
        onLoad() {
            self = this
            self.mapCtx = wx.createMapContext('myMap')
            
                 // 实例化API核心类
            qqmapsdk = new QQMapWX({
                            key: 'LT2BZ-RSKED-BEH46-P7MBK-7OVF3-GLBRU'
                        });
			uni.getLocation({
				type:'gcj02',
				success:(res)=>{
					this.latitude = res.latitude;
					this.longitude= res.longitude;
					// 将获取的值赋值给markers
					this.markers[0].latitude  = this.latitude
					this.markers[0].longitude= this.longitude
				}
			});
                    
        },
        methods: {
			//给上一页返回中文地址
                 backres (){
					const address =uni.getStorageSync("address")
					console.log(address)
					let pages = getCurrentPages() // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
					let prevPage = pages[pages.length - 2] //上一页页面实例
					uni.navigateBack({
					  delta:1,
					  success:() => {
					     prevPage.$vm.otherFun(address) // 给上一页绑定方法otherFun,传参地址id
					  }
					})
				 },
				
                  search:  function(e){
                    // console.log(e,"input2")
                    self.searchKey = e.detail.value
                    var location = self.latitude+","+ self.longitude
                     self.mapSearch(self.searchKey,location).then(res => {
                                self.data = res.data
                                if(self.searchKey && self.data.length){
                                    self.IsOption = true
                                }else{
                                    self.IsOption = false
                                }
                                
                            },error => {
                               
                                console.log(error,"请求失败");
                        })
                    
                },
				
				//下拉框获取搜索位置
                tapOption:function(item){
                    self.searchKey = item.title
                    self.IsOption = false
                    self.data = []
                    var obj = {}
                    obj.latitude = item.location.lat;
                    obj.longitude = item.location.lng;
					// 本接口提供由坐标到坐标所在位置的文字描述的转换，输入坐标返回地理位置信息和附近poi列表。
					qqmapsdk.reverseGeocoder({
					    location:{
					        longitude:item.location.lng,
					        latitude:item.location.lat
					    },
					    success(res1){
					        console.log("准确位置",res1.result.formatted_addresses.recommend)
							uni.setStorageSync("address",res1.result.formatted_addresses.recommend)
							// self.address=res1.result.formatted_addresses.recommend
					    },
					    fail(err1){
					        console.log(err1)
					    }
								
					})
					
                    self.toLocation(obj)
                },
				
				//移动到新的坐标
                toLocation:function(obj){
					
                    self.mapCtx.moveToLocation(obj) 
					//将地图中心移置当前定位点
                    self.mapCtx.translateMarker({
                      markerId: 1,
                      autoRotate: false,
                      duration: 100,
                      destination: {
                        latitude:obj.latitude,
                        longitude:obj.longitude,
                      },
                      animationEnd() {
                        console.log('animation end')
						// 平移marker，带动画
                      }
                    })
                },
                // 异步查询
                 mapSearch:function(keyword,location){
                console.log(keyword,location,"keyword,location")
                    let promise = new Promise(function(resolve, reject) {
                        // 调用接口
                              qqmapsdk.search({
                                    keyword: keyword,//搜索关键词
                                    location:location ,  //设置周边搜索中心点
                                  success: function (res) {
                                     resolve(res)
                                  },
                                  fail: function (res) {
                                     reject(res)
                                  }
                          });
                    })
                    return promise
                      
                },
                // 位置授权
                 
                 
                 
                 
                 // 点击poi点查询
                 poitap: function(e){
                    // console.log(e,"poitap")
                    var obj = e.detail
					
					qqmapsdk.reverseGeocoder({
					    location:{
					        longitude:e.detail.longitude,
					        latitude:e.detail.latitude
					    },
					    success(res1){
					        console.log(res1.result.formatted_addresses.recommend)
							uni.setStorageSync("address",res1.result.formatted_addresses.recommend)
							// self.address=res1.result.formatted_addresses.recommend
					    },
					    fail(err1){
					        console.log(err1)
					    }
								
					})
					
                    self.searchKey = obj.name
                    
                    self.toLocation(obj)
                 },
				            
        }
    }
</script>

<style>
    .content {
        background-color: #F1F1F1;
        overflow: hidden;
        min-height: 100vh;
        color: #646464;
        font-size:40rpx ;
    }
    .top>input{
        height: 88rpx;
        width: 524rpx;
        margin: 40rpx auto 0;
        padding:0 40rpx;
        border: solid 2rpx #BEBEBE;
    }
    .option{
        max-height: 300rpx;
        width: 100%;
    
        line-height: 60rpx;
        position: fixed;
        top: 128rpx;
        z-index: 99999;
    }
    .column_item{
        padding:0 40rpx;
        height: 60rpx;
        width: 524rpx;
        overflow: hidden;
        margin:0rpx auto;
        background-color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .column_item:active{
        background-color: #8F8F94;
    }
    
    .page-section-gap{
      box-sizing: border-box;
      /* padding: 0 30rpx; */
      margin: 30rpx auto;
      width: 600rpx;
    }
    
</style>

