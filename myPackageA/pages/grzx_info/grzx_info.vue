<template>
	<view class="grzx_info">
		<!-- 我的信息 -->

		<view class="infoBox" v-if="infoList.length != 0">
			<view class="infoItem" v-for="(item, index) in infoList" :key="index" @click="infoXqClick(item)">
				<view class="title">
					{{item.title}}
				</view>
				<view class="smallTitle">
					{{item.context_cl}}
				</view>
				<view class="time">
					{{item.createTime}}
				</view>
			</view>
		</view>
		
		<view class="infoNo" v-else>
			暂时还没收到信息~
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log('xxx');
			this.getlistMessage();
		},
		data() {
			return {
				page: {
					pageNum: 1,
					pageSize: 10,
					status: '',
					type: '',
				},
				infoList: [],
			};
		},
		methods: {
			async getlistMessage() {
				let {
					data: res
				} = await this.$request({
					method: 'post',
					url: '/messageCenter/listMessage',
					data: this.page
				})

				for (let item of res.rows) {
					item.context_cl = item.content
						.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
						.replace(/<[^>]+?>/g, "")
						.replace(/\s+/g, " ")
						.replace(/ /g, " ")
						.replace(/>/g, " ")
						.replace("&nbsp;", "");
				}

				console.log(res);
				this.infoList = res.rows;
			},
			infoXqClick(item){
				uni.navigateTo({
					url: '../grzx_info_xq/grzx_info_xq?time=' + item.createTime + '&context=' + item.content,
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F7F8FA;
	}
	.grzx_info{
		padding: 30rpx;
	}
	
	.infoBox{
		.infoItem{
			width: 620rpx;
			height: 170rpx;
			background-color: #FFFFFF;
			margin: 35rpx auto;
			border-radius: 8rpx;
			padding: 30rpx;
			color: #666666;
			.title{
				color: #333333;
			}
			
			.smallTitle{
				height: 90rpx;
				line-height: 90rpx;
				overflow: hidden;
				font-size: 28rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			
			.time{
				font-size: 25rpx;
			}
		}
	}
	
	.infoNo{
		width: 500rpx;
		height: 500rpx;
		line-height: 700rpx;
		text-align: center;
		padding: 50rpx 0;
		color: #256BFF;
		margin: 160rpx auto;
		text-align: center;
		background-image: url('/static/index/infoNo.png');
		background-size: 100% 100%;
	}
</style>
