<template>
	<view class="zccx_thcx">
		<!-- 搜索框 -->
		<view class="search">
			<search-top @search="search()"><text>同行查询</text></search-top>
		</view>

		<!-- 未查询到结果 -->
		<view class="noData" v-if="!thcxData.name">
			没有找到相关内容，换个公司名称试试吧~
		</view>

		<!-- 同行查询列表 -->
		<view class="thcxBox" v-else>
			<view class="gsName">
				{{thcxData.name}}
			</view>
			<view class="thcxList">
				<view class="item">
					<view class="title">
						法人姓名:
					</view>
					<view class="content">
						{{thcxData.operName}}
					</view>
				</view>
				<view class="item">
					<view class="title">
						注册时间:
					</view>
					<view class="content">
						{{thcxData.startDate}}
					</view>
				</view>
				<view class="item">
					<view class="title">
						注册资本：
					</view>
					<view class="content">
						{{thcxData.registCapi}}
					</view>
				</view>
				<view class="item">
					<view class="title">
						登记机关：
					</view>
					<view class="content">
						{{thcxData.belongOrg}}
					</view>
				</view>
				<view class="item">
					<view class="title">
						注册地址：
					</view>
					<view class="content">
						{{thcxData.address}}
					</view>
				</view>
				<view class="item">
					<view class="title">
						经营范围：
					</view>
					<view class="content">
						{{thcxData.scope}}
					</view>
				</view>
			</view>
		</view>

		<!-- 补贴明细 -->
		<view class="gsmdMain">
			<view class="mxje">
				<text class="title">资助总额：</text><text class="total">{{totalM}}万元</text>
			</view>
			<view class="tabsList">
				<view class="tableFirst">
					<view class="firstItem" v-for="(item, index) in firstItem" :key="index">
						{{item}}
					</view>
				</view>

				<view class="tabContent" v-for="(item, index) in subsidylist" :key="index"
					:style="{'background-color' : (index % 2) == 0 ? '#FFFFFF' : '#E4E9F2'}">
					<view class="qymc">
						<view class="">
							{{item.title}}
						</view>
					</view>
					<view class="dq">
						<view class="">
							{{item.amount}}
						</view>
					</view>
					<view class="je">
						<view class="">
							{{item.publicityTime}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchTop from '../../components/searchTop/searchTop.vue';
	export default {
		onLoad(options) {
			if (options.search) {
				this.gsName = options.search;
				this.search(options.search);
			}

		},
		data() {
			return {
				gsName: '',
				thcxData: {},
				totalM: 0,

				// 补贴明细表
				subsidylist: [],

				firstItem: ['项目名称', '立项金额', '资助时间'],

			}
		},
		methods: {
			async search(val) {
				this.gsName = val;
				console.log(val)

				// 根据公司名称查询公司信息
				let {
					data: res
				} = await this.$request({
					url: '/qcc/getBasicDetailsByName',
					method: 'get',
					data: {
						keyword: val
					}
				})

				console.log(res)
				if (res.data.Status == 201) {
					uni.showToast({
						icon: 'error',
						title: '查询失败，请检查公司名称！'
					})
					return;
				}

				this.thcxData = res.data;

				// 根据公司名称查询资助金额
				let {
					data: res1
				} = await this.$request({
					url: '/subsidy/total',
					method: 'get',
					data: {
						searchParam: val
					}
				})

				console.log(res1)
				// if(res1.)
				this.totalM = (res1.data.totalAmount / 10000).toFixed(2);

				this.getListData();
			},

			async getListData() {
				let {
					data: res
				} = await this.$request({
					url: `/subsidy/list`,
					method: 'GET',
					data: {
						searchParam: this.gsName
					}
				})

				console.log(res);

				this.subsidylist = res.rows;

				for (let item of this.subsidylist) {
					item.publicityTime = item.publicityTime.split(' ')[0];
					item.amount = (item.amount / 10000).toFixed(2) + '万'
				}
			}
		},
		components: {
			searchTop,
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F6F7F9;
	}

	.zccx_thcx {
		padding: 30rpx 0;
		height: 100%;
	}

	.noData {
		width: 600rpx;
		height: 600rpx;
		background-image: url('../../static/index/noData.png');
		background-size: 100% 100%;
		margin: 100rpx auto;
		color: #256BFF;
		text-align: center;
		font-size: 25rpx;
		line-height: 1000rpx;
	}

	.thcxBox {
		width: 620rpx;
		background-color: #FFFFFF;
		margin: 30rpx auto;
		padding: 30rpx;
		border-radius: 10rpx;

		.gsName {
			text-align: center;
			font-size: 40rpx;
			color: #333333;
			font-weight: 500;
		}

		.thcxList {
			margin: 30rpx 0;
			font-size: 28rpx;
			line-height: 50rpx;

			.item {
				display: flex;

				.title {
					width: 150rpx;
				}

				.content {
					flex: 1;
					width: 0;
				}
			}
		}
	}


	// 表格
	.gsmdMain {
		.mxje {
			text-align: center;
			font-size: 28rpx;

			.title {
				color: #999999;
			}

			.total {
				font-size: 34rpx;
				font-weight: 600;
				color: #256BFF;
			}
		}

		.tabsList {
			width: 680rpx;
			margin: 30rpx auto;

			.tableFirst {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #E4E9F2;
				text-align: center;
				font-size: 30rpx;
				font-weight: 800;
				display: flex;

				.firstItem:nth-child(1) {
					flex: 2
				}

				.firstItem:nth-child(2) {
					flex: 2
				}

				.firstItem:nth-child(3) {
					flex: 2
				}
			}

			.tabContent {
				width: 680rpx;
				line-height: 60rpx;
				background-color: #E4E9F2;
				text-align: center;
				font-size: 25rpx;
				display: flex;

				view {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.qymc {
					flex: 2;
					width: 0;
				}

				.dq {
					flex: 2;

					width: 0;
				}

				.je {
					flex: 2;
					width: 0;
					color: #256BFF;
				}

			}
		}
	}
</style>
