<template>
	<view class="grzx_hydd_xq">
		<!-- 会员订单-订单详情 -->
		<view class="xqTop">
			<view class="title">
				订单信息
			</view>
			<view class="hang">
				<text>订单编号：</text>{{ddData.parentOrderId}}
			</view>
			<view class="hang" v-if="ddData.payDate">
				<text>下单时间：</text>{{ddData.payDate}}
			</view>
			<view class="hang" v-if="ddData.cancelDate">
				<text>取消时间：</text>{{ddData.cancelDate}}
			</view>
			<view class="hang" v-if="ddData.payMethod">
				<text>支付方式：</text>{{ddData.payMethod}}
			</view>
			<view class="hang">
				<text>订单状态：</text>{{status == '1' ? '已完成' : '已取消'}}
			</view>
			<view class="hang">
				<text v-if="status == '1'">实付金额：</text>
				<text v-else>应付金额：</text>
				<text class="red">{{ddData.totalPrice}}元</text>
			</view>
		</view>

		<view class="xmmx">
			项目明细
		</view>
		<view class="childrenItem">
			<view class="itemBox" v-for="(item, index) in ddData.mallChildrenOrder" :key="index">
				<view class="hang">
					<text>项目名称：</text>{{item.goodsName}}
				</view>
				<view class="hang">
					<text>项目单价：</text>{{item.goodsPrice}}
				</view>
				<view class="hang">
					<text>购买数量：</text>{{item.number}}
				</view>
				<view class="hang">
					<text v-if="status == '1'">实付金额：</text>
					<text v-else>应付金额：</text>
					<text class="red">{{item.goodsPrice * item.number}}元</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.id = options.id;
			this.status = options.status;
			this.getDdItemFun();
		},
		data() {
			return {
				id: '',
				status: '',
				ddData: '',
			};
		},
		methods: {
			async getDdItemFun() {
				let {
					data: res
				} = await this.$request({
					method: 'get',
					url: '/order/list',
					data: {
						pageNum: '',
						pageSize: '',
						status: '-1',
						orderId: this.id
					}
				})

				console.log(res);
				// 处理支付方式
				switch (res.rows[0].payMethod) {
					case 1:
						res.rows[0].payMethod = '支付宝支付';
						break;
					case 2:
						res.rows[0].payMethod = '微信支付';
						break;
					case 3:
						res.rows[0].payMethod = '银行转账';
						break;
				}
				this.ddData = res.rows[0];
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F8FA;
	}

	.grzx_hydd_xq {
		padding: 30rpx;
		font-size: 26rpx;
		color: #666666;
	}

	.xqTop {
		background-color: #FFFFFF;
		padding: 30rpx;
		width: 600rpx;
		margin: 30rpx auto;
		border-radius: 10rpx;

		.title {
			font-size: 30rpx;
			color: #333333;
			padding-left: 30rpx;
			line-height: 60rpx;
			height: 60rpx;
			position: relative;

			&::after {
				content: '';
				width: 8rpx;
				height: 26rpx;
				background-color: #256BFF;
				position: absolute;
				top: 18rpx;
				left: 6rpx;
			}
		}
	}

	.hang {
		color: #333333;
		height: 50rpx;
		line-height: 50rpx;
	}

	.xmmx {
		padding-left: 30rpx;
		font-weight: 600;
	}

	.childrenItem {
		.itemBox {
			background-color: #FFFFFF;
			padding: 30rpx;
			width: 600rpx;
			margin: 30rpx auto;
			border-radius: 10rpx;
		}
	}

	.red {
		color: red;
	}
</style>
