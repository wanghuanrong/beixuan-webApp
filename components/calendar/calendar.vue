<template>
	<view class="calendar">
		<view class="calendarBox" v-for="(item, index) in calendarList" :key="index" @click="calendarClick(item.policyId)">
			<!-- 左侧 -->
			<view class="calendarLeft">
				<view class="title">
					{{item.title}}
				</view>
				<view class="departmentName">
					{{item.departmentName}}
				</view>
				<view class="time">
					申报时间：{{item.policyBeginTime}}-{{item.policyEndTime}}
				</view>
			</view>

			<!-- 右侧 -->
			<view class="calendarRight">
				<view class="djsBox" v-if="item.days || item.days == 0">
					<view class="djsTop">
						<text class="iconfont icon-daojishi"></text>倒计时
					</view>
					<view class="djsMain">
						{{item.days}}天
					</view>
				</view>
				
				<view class="scsjBox" v-else>
					<view class="scsjTop">
						上传时间
					</view>
					<view class="scsjMain">
						{{item.createDate}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "calendar",
		props: ['calendarList'],
		data() {
			return {

			};
		},
		methods:{
			calendarClick(policyId){
				uni.navigateTo({
					url:"../../pages/zccx_zcrl_zcxq/zccx_zcrl_zcxq?id=" + policyId,
					
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.calendarBox {
		height: 240rpx;
		width: 100%;
		border-bottom: 6rpx dashed #DDDDDD;
		margin-top: 30rpx;
		display: flex;

		.calendarLeft {
			flex: 1;

			.title {
				height: 90rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				color: #333333;
			}
			
			.departmentName{
				background-color: #82a8ff;
				color: #FFFFFF;
				display: inline-block;
				padding: 4rpx;
				margin: 20rpx 0;
				font-size: 30rpx;
				border-radius: 4rpx;
			}
			
			.time{
				font-size: 25rpx;
				color: #999999;
			}
		}

		.calendarRight {
			width: 160rpx;

			// 倒计时
			.djsBox {
				width: 140rpx;
				height: 140rpx;
				margin: 45rpx 0 0 20rpx;
				overflow: hidden;
				border-radius: 16rpx;

				.djsTop {
					text-align: center;
					color: #FFFFFF;
					height: 50rpx;
					font-size: 25rpx;
					line-height: 50rpx;
					background-color: #95AAD5;
					
					text{
						vertical-align: bottom;
					}
				}

				.djsMain {
					height: 90rpx;
					background-color: #F4F5F9;
					text-align: center;
					line-height: 90rpx;
					font-size: 40rpx;
					color: #666666;
				}
			}
			
			// 上传时间
			.scsjBox {
				width: 140rpx;
				height: 140rpx;
				margin: 45rpx 0 0 20rpx;
				overflow: hidden;
				border-radius: 16rpx;

				.scsjTop {
					text-align: center;
					color: #FFFFFF;
					height: 50rpx;
					font-size: 25rpx;
					line-height: 50rpx;
					background-color: #95AAD5;
				}

				.scsjMain {
					height: 90rpx;
					background-color: #F4F5F9;
					text-align: center;
					line-height: 90rpx;
					font-size: 20rpx;
					color: #666666;
				}
			}
		}
	}
</style>
