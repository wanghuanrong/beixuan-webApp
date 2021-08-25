<template>
	<view class="zccx_zcrl">
		<view class="zcrlBox">
			<view class="tab">
				<view class="tab1" v-for="(item,index) in tabList" :key="index"
					:class="tabIndex == index ? 'tabIs' : 'tabNo'" @click="tabClick(index)">
					{{item}}
				</view>
			</view>

			<view class="zcrlMain">
				<calendar :calendarList='calendarList' v-if="tabIndex == 0"></calendar>
				<calendar :calendarList='calendarList2' v-else></calendar>
			</view>
		</view>
	</view>
</template>

<script>
	// 政策日历
	import calendar from '../../components/calendar/calendar.vue';
	export default {
		onLoad() {
			this.getcalendar();

			this.getnewsPoli();
		},
		data() {
			return {
				// 政策日历
				tabList: ['政策日历', '最新政策'],
				tabIndex: 0,
				calendarList: [],
				calendarList2: [],

				// 触底加载
				page: {
					pageNum: 1,
					pageSize: 5,
					total: 0
				},
				page2: {
					pageNum: 1,
					pageSize: 5,
					total: 0
				}
			};
		},
		methods: {
			// 政策日历tab
			tabClick(index) {
				this.tabIndex = index;

				// if (index == 0) {
				// 	this.getcalendar();
				// } else {
				// 	this.getnewsPoli();
				// }
			},
			// 获取‘政策日历’数据集
			async getcalendar() {
				let {
					data: res
				} = await this.$request({
					url: '/calendar/list',
					method: 'get',
					data: {
						pageNum: this.page.pageNum,
						pageSize: this.page.pageSize,
					}
				})

				console.log(res)
				if (res.code != 200) {
					uni.showToast({
						icon: 'error',
						title: '政策日历查询失败'
					})
				}

				for (let item of res.rows) {
					this.calendarList.push(item);
				}

				this.page.total = res.total;
			},
			// 最新政策
			async getnewsPoli() {
				let {
					data: res
				} = await this.$request({
					url: '/news/policy',
					method: 'get',
					data: {
						pageNum: this.page2.pageNum,
						pageSize: this.page2.pageSize,
					}
				})
				
				console.log(res)
				if (res.code != 200) {
					uni.showToast({
						icon: 'error',
						title: '最新政策查询失败'
					})
				}
				
				for (let item of res.rows) {
					this.calendarList2.push(item);
				}

				this.page2.total = res.total;
			},
		},
		// 触底事件
		onReachBottom() {
			console.log(this.tabIndex);

			if (this.tabIndex == 0) {
				if (this.page.total > (this.page.pageNum * this.page.pageSize)) {
					this.page.pageNum = this.page.pageNum + 1;
					this.getcalendar();
				} else {
					console.log('1没有了！')
				}

			}else{
				if (this.page2.total > (this.page2.pageNum * this.page2.pageSize)) {
					this.page2.pageNum = this.page2.pageNum + 1;
					this.getnewsPoli();
				} else {
					console.log('2没有了！')
				}
			}
		}
	}
</script>

<style lang="less">
	// page{
	// 	background-color: #F6F7F9;
	// }
	.zcrlBox {
		width: 620rpx;
		margin: auto;
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 10rpx;

		.zcrlTop {
			height: 60rpx;
			line-height: 60rpx;
			display: flex;
			justify-content: space-between;

			.zcrlTitle {
				font-size: 36rpx;
				font-weight: 900;
				position: relative;

				&::after {
					content: '';
					width: 6rpx;
					height: 30rpx;
					background-color: #256BFF;
					position: absolute;
					left: -14rpx;
					top: 14rpx;
				}
			}

			.gd {
				font-size: 24rpx;
				color: #999999;
			}
		}

		.tab {
			width: 500rpx;
			height: 70rpx;
			margin: 20rpx auto;
			display: flex;
			justify-content: space-between;

			view {
				width: 200rpx;
				border-radius: 40rpx;
				text-align: center;
				line-height: 70rpx;
				font-size: 30rpx;
			}

			.tabIs {
				background-color: #256BFF;
				box-shadow: 0px 0px 6px #256BFF;
				color: #FFFFFF;
			}

			.tabNo {
				background-color: #E4E9F2;
				box-shadow: 0px 0px 6px #E4E9F2;
				color: #333333;
			}
		}
	}
</style>
