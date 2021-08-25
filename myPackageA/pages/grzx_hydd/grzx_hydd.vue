<template>
	<view class="grzx_hydd">
		<!-- 会员订单 -->
		<van-tabs v-model="active" color="#256BFF" sticky="true">
			<van-tab title="已完成">
				<view class="itemMain">
					<view class="itemBox" v-for="(item, index) in orderList" :key="index" @click="ddxqClickFun(item.parentOrderId, 1)">
						<view class="top">
							<view class="ddbh">
								<text>订单编号：</text>{{item.parentOrderId}}
							</view>
							<view class="zt">
								已完成
							</view>
						</view>
						<view class="content">
							<!-- <view class="hang">
								<text class="title">产品名称：</text>{{}}
							</view> -->
							<view class="hang">
								<text class="title">购买时间：</text>{{ item.payDate }}
							</view>
							<view class="hang">
								<text class="title">实付金额：</text>{{item.totalPrice}}
							</view>
						</view>
						<view class="foot">
							<text>实付金额：</text><text class="red">{{item.totalPrice}}元</text>
						</view>
					</view>
				</view>
			</van-tab>


			<van-tab title="已取消">
				<view class="itemMain">
					<view class="itemBox" v-for="(item, index) in qxList" :key="index"  @click="ddxqClickFun(item.parentOrderId, 3)">
						<view class="top">
							<view class="ddbh">
								<text>订单编号：</text>{{item.parentOrderId}}
							</view>
							<view class="zt">
								已取消
							</view>
						</view>
						<view class="content">
							<!-- <view class="hang">
								<text class="title">产品名称：</text>{{}}
							</view> -->
							<view class="hang">
								<text class="title">取消时间：</text>{{ item.cancelDate }}
							</view>
							<view class="hang">
								<text class="title">应付金额：</text>{{item.totalPrice}}
							</view>
						</view>
						<view class="foot">
							<text>应付金额：</text><text class="red">{{item.totalPrice}}元</text>
						</view>
					</view>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getOrderList();
			this.getQxList();
		},
		data() {
			return {
				active: 0,

				// 这里将'完成'和'取消' 分开处理,方便一些
				page: {
					pageNum: 1,
					pageSize: 5,
					status: '2',
				},
				pageTotal: 0,
				
				
				page2: {
					pageNum: 1,
					pageSize: 5,
					status: '3',
				},
				pageTotal2: 0,

				// 完成列表
				orderList: [],

				// 取消列表
				qxList: [],
			};
		},
		methods: {
			// 获取完成列表
			async getOrderList() {
				let {
					data: res
				} = await this.$request({
					method: 'get',
					url: '/order/list',
					data: this.page
				})

				console.log('完成', res);
				if (res.rows.length == 0) {
					uni.showToast({
						icon: 'error',
						title: '空'
					})
					return;
				}
				
				this.pageTotal = res.total;
				this.orderList = res.rows;
			},
			// 获取取消列表
			async getQxList() {
				let {
					data: res
				} = await this.$request({
					method: 'get',
					url: '/order/list',
					data: this.page2
				})

				console.log('取消', res);

				if (res.rows.length == 0) {
					uni.showToast({
						icon: 'error',
						title: '空'
					})
					return;
				}
				
				this.pageTotal2 = res.total;
				this.qxList = res.rows;
			},
			
			// 点击事件
			 ddxqClickFun(id, status){
				 uni.navigateTo({
					 url:'../grzx_hydd_xq/grzx_hydd_xq?id=' + id + '&status=' + status,
				 })
			 }
		},
		onReachBottom() {
			// 这里下拉需要先判断是完成还是取消,
			if(this.active == 0 || this.active.target.index == 0){
				if (this.pageTotal > (this.page.pageNum * this.page.pageSize)) {
					this.page.pageNum = this.page.pageNum + 1;
					this.getOrderList();
				} else {
					console.log('1没有了！')
				}
			}else if(this.active.target.index = 1){
				if (this.pageTotal2 > (this.page2.pageNum * this.page2.pageSize)) {
					this.page2.pageNum = this.page2.pageNum + 1;
					this.getQxList();
				} else {
					console.log('2没有了！')
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F8FA;
	}

	.itemMain {
		.itemBox {
			width: 620rpx;
			background-color: #FFFFFF;
			margin: 30rpx auto;
			padding: 30rpx;
			border-radius: 10rpx;
		}

		.top {
			border-bottom: 4rpx dashed #EDEDED;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;

			display: flex;
			justify-content: space-between;

			.zt {
				color: #AAAAAA;
			}
		}

		.content {
			line-height: 50rpx;
			font-size: 26rpx;
			margin-top: 30rpx;

			.hang {
				color: #333333;
				height: 50rpx;
				line-height: 50rpx;
				.title {
					color: #666666;
				}
			}
		}
		
		.foot{
			font-size: 28rpx;
			font-weight: 600;
			text-align: right;
			height: 60rpx;
			line-height: 60rpx;
			
			.red{
				color: red;
			}
		}
	}

	.van-tabs__nav {
		background-color: #E4E9F2;
	}
</style>
