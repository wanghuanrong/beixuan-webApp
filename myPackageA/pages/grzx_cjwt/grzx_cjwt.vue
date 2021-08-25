<template>
	<view class="grzx_cjwt">
		<!-- 常见问题 -->
		<view class="cjwtBox">
			<view class="cjwtItem" v-for="(item, index) in listTitleData" :key="index">
				<view class="title" @click="titleClick(index)">
					<view class="QBox">
						Q
					</view>
					<view class="titleBox">
						{{item.title}}
					</view>
					<view class="zkBox">
						<text class="iconfont icon-xia" v-if="index != indexItem"></text>
						<van-icon name="arrow-up" v-else/>
					</view>
				</view>
				<view class="content" :style="{'height': index != indexItem ? '0' : ''}">
					<view class="ABox">
						A
					</view>
					<view class="titleBox">
						<rich-text :nodes="item.content"></rich-text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getlistTitle();
		},
		data() {
			return {
				listTitleData:[],
				indexItem: 0,
			};
		},
		methods:{
			async getlistTitle() {
				let {
					data: res
				} = await this.$request({
					method: 'post',
					url: '/question/listTitle',
					data:{
						questionId:'',
						title:'',
						content:'',
						typeId: '',
						createTime:''
					}
				})
				
				console.log(res);
				this.listTitleData = res.data;
			},
			titleClick(index){
				this.indexItem = index;
			}
		}
	}
</script>

<style lang="less">
page{
	background-color: #F7F8FA;
}

.cjwtItem{
	width: 680rpx;
	margin: 30rpx auto;
	background-color: #FFFFFF;
	border-radius: 6rpx;
	padding: 20rpx;
	.title{
		display: flex;
		color: #333333;
		font-size: 28rpx;
		.QBox{
			width: 30rpx;
			height: 30rpx;
			background-color: #a0beff;
			color: #FFFFFF;
			text-align: center;
			line-height: 30rpx;
			border-radius: 8rpx;
			font-size: 25rpx;
			margin-right: 10rpx;
			margin-top: 5rpx;
		}
		.titleBox{
			flex: 1;
		}
		
		.zkBox{
			width: 30rpx;
			height: 30rpx;
			margin: 0 0 0 10rpx;
			font-size: 20rpx;
			text{
				font-size: 20rpx;
			}
		}
	}
	
	.content{
		// height: 0;
		overflow: hidden;
		padding-top: 30rpx;
		display: flex;
		color: #333333;
		font-size: 25rpx;
		.ABox{
			width: 30rpx;
			height: 30rpx;
			background-color: #4f95ff;
			color: #FFFFFF;
			text-align: center;
			line-height: 30rpx;
			border-radius: 8rpx;
			font-size: 25rpx;
			margin-right: 10rpx;
			margin-top: 5rpx;
		}
		.titleBox{
			flex: 1;
			line-height: 40rpx;
		}
	}
	
}
</style>
