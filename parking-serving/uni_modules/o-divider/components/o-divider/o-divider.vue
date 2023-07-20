<template>
	<view :class="['o-divider', Align,Dashed,lineClass, textClass]" :style="lineStyle + Mar">
		<view :class="['o-text']" :style="textStyle" v-if="$slots.default"><slot /></view>
	</view>
</template>

<script>
	export default {
		name:'o-divider',
		props:{
			textColor:{
				type:String,
				default:''
			},
			lineColor:{
				type:String,
				default:''
			},
			dashed:{
				type:Boolean,
				default:false
			},
			align:{
				type:String,
				default:''
			},
			margin:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				lineClass:'',
				lineStyle:'',
				textClass:'',
				textStyle:'',
			}
		},
		created() {
			this.oLine();
			this.oText();
			console.log(this.Mar);
		},
		methods:{
			oLine(){
				if(this.lineColor.includes('#') || this.lineColor.includes('rgb(')|| this.lineColor.includes('rgba(')) {
					this.lineStyle = 'border-color:' + this.lineColor + '!important;'
				} else if(this.lineColor) {
					this.lineClass = this.lineColor
				}
			},
			oText(){
				if (this.textColor.includes('#') || this.textColor.includes('rgb(') || this.textColor.includes('rgba(')) {
					this.textStyle = 'color:' + this.textColor + '!important;'
				} else{
					this.textClass = this.textColor
				}
			}
		},
		computed:{
			Dashed(){
				if(!this.dashed) return ''
				else return 'dashed'
			},
			Align(){
				if(this.align=='left' || this.align=='right') return this.align;
				else return ''
			},
			Mar(){
				if(this.margin.endsWith('px')) return 'margin:'+this.margin+' 0'
				else return ''
			}
		}
	}
</script>

<style lang="scss">

	.o-divider{
		display: flex;
		align-items: center;
		color: #969798;
		font-size: 28rpx;
		line-height: 40rpx;
		border-color: #ebedef;
		border-style: solid;
		border-width: 0;
		margin: 32rpx 0;
		&.dashed{border-style: dashed;}
		.o-text{
			padding: 0 24rpx;
			text-align: center;
		}
		&::before,&::after{
			content: '';
			display: block;
			flex: 1;
			box-sizing: border-box;
			border-color: inherit;
			border-style: inherit;
			border-width: 1rpx 0 0;
		}
		&.left::before,&.right::after{
			max-width: 48rpx;
		}
	}
</style>