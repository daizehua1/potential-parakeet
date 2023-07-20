# 分割线组件 o-divider



### 基本用法

```html
<template>
	<view class="p-3">
		<view>基础用法 默认渲染一条水平分割线</view>
		<o-divider />
		
		<view>展示文字 通过插槽在可以分割线中间插入内容</view>
		<o-divider>文字默认用法</o-divider>
		
		<view>内容位置 通过 align 指定内容所在位置。</view>
		<o-divider align="left" margin="10rpx">居左并自定义间距</o-divider>

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

<style>
	page{background-color: #fff;}
    .p-3{padding:30rpx;}
	.Red{color: #f00;font-weight: 500;}
	.Blue{color:blue;}
	.lineBlue{border-color: dodgerblue;}
</style>
```



### API

#### oDivider Props

| 属性   | 说明                 | 类型    | 可选值                            | 默认值  |
| ------ | -------------------- | ------- | --------------------------------- | ------- |
| align  | 文字内容的位置 | String  | left / right             | center    |
| dashed | 分割线设为虚线 | Boolean | true                              | false   |
| lineColor | 分割线颜色       | String  | 支持 style / class，自动识别 | #e9e9e9 |
| textColor | 文字颜色 | String | 支持 style / class，自动识别 | #969798 |
| margin | 上下间距 | String | 支持px、rpx两种单位 | 32rpx |
