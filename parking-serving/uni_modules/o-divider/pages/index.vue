<template>
	<view class="p-3">
		<view>基础用法 默认渲染一条水平分割线</view>
		<o-divider />
		
		<view>展示文字 通过插槽在可以分割线中间插入内容</view>
		<o-divider>文字默认用法</o-divider>
		
		<view>内容位置 通过 align 指定内容所在位置。</view>
		<o-divider align="left">居左效果</o-divider>

		<view>野径云俱黑，江船火独明。晓看红湿处，花重锦官城。</view>
		<o-divider align="right" textColor="#f90">居右效果</o-divider>

		<view>好雨知时节，当春乃发生。随风潜入夜，润物细无声。野径云俱黑，江船火独明。晓看红湿处，花重锦官城。</view>
		<o-divider textColor="Red" lineColor="rgba(156,39,176,0.5)">自定义颜色</o-divider>

		<view>好雨知时节，当春乃发生。随风潜入夜，润物细无声。野径云俱黑，江船火独明。晓看红湿处，花重锦官城。</view>
		<o-divider dashed lineColor="lineBlue">虚线</o-divider>

		<view>好雨知时节，当春乃发生。随风潜入夜，润物细无声。</view>
		<o-divider lineColor="#39f">
			<view class="Red">多行效果</view>
			<view class="">第二行文字长点看看</view>
		</o-divider>

	</view>
</template>

<style lang="scss">
	page{background-color: #fff;}
	.Red{color: #f00;font-weight: 500;}
	.Blue{color:blue;}
	.lineBlue{border-color: dodgerblue;}
</style>
