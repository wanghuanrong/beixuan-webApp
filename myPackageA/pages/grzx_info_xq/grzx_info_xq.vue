<template>
	<view class="grzx_info_xq">
		<!-- 信息详情 -->
		<view class="time">
			{{time}}
		</view>
		<view class="contentBox">
			<rich-text :nodes="content">
				
			</rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options)
			this.time = options.time;
			this.content = options.context;
			
			console.log(this.time)
			console.log(this.content)
		},
		data() {
			return {
				time:'',
				content: '',
			};
		}
	}
</script>

<style lang="less">
	.grzx_info_xq{
		padding: 30rpx;
	}
	.time{
		line-height: 50rpx;
		height: 50rpx;
		color: #999999;
		font-size: 25rpx;
	}
	
	.contentBox{
		font-size: 30rpx;
		color: #333333;
		line-height: 50rpx;
	}
</style>
