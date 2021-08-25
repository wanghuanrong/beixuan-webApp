<template>
	<view class="news2">
		<view class="newsBox" v-for="(item, index) in newsList" :key="index" @click="newsClick(item.newsId)">
			<view class="img">
				<view class="imgBox">
					<image :src="item.image" mode="heightFix"></image>
				</view>
			</view>
			<view class="title">
				<view class="bigTitle">
					{{item.title}}
				</view>
				<view class="smallTitle">
					{{item.context_cl}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'news2',
		props:['newsList'],
		data() {
			return {
				
			}
		},
		methods: {
			newsClick(newsId){
				uni.navigateTo({
					url:'/pages/zccx_news_xq/zccx_news_xq?id=' + newsId
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.newsBox{
		height: 150rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top:20rpx ;
		display: flex;
		padding: 30rpx 0 ;
		.img{
			flex: 4;
			width: 0;
			text-align: center;
			.imgBox{
				width: 90%;
				height: 100%;
				margin: auto;
				overflow: hidden;
				image{
					height: 100%;
				}
			}
		}
		
		.title{
			flex: 6;
			width: 0;
			padding: 0 20rpx;
			
			.bigTitle{
				height: 80rpx;
				line-height: 40rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				color: #333333;
				font-size: 30rpx;
				font-weight: 900;
			}
			
			.smallTitle{
				height: 60rpx;
				line-height: 30rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				color: #999999;
				font-size: 20rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>

