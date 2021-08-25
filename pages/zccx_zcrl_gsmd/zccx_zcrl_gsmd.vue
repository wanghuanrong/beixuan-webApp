<template>
	<view class="zccx_zcrl_gsmd">
		<view class="title">
			{{title}}
		</view>

		<view class="pcTab" v-if="pcTab.length != 0">
			<view class="tabItem" v-for="(item, index) in pcTab" :key="index"
				:class="tabIndex == item.batchNo ? 'tabIs' : 'tabNo'"
				@click="tabClick(item.batchNo, item.publicListId, item.url)">
				第{{item.batchNo}}批
			</view>
		</view>
		
		<view class="ywlj_n"  v-if="pcTab.length != 0">
			原文链接：<text @click="ywljNClick()">点击前往</text>
		</view>

		<view class="gsmdMain">
			<view class="tabsList">
				<view class="tableFirst">
					<view class="firstItem" v-for="(item, index) in firstItem" :key="index">
						{{item}}
					</view>
				</view>

				<view class="tabContent" v-for="(item, index) in subsidylist" :key="index"
					:style="{'background-color' : (index % 2) == 0 ? '#FFFFFF' : '#E4E9F2'}">
					<view class="xh">
						<view class="">
							{{index + 1}}
						</view>
					</view>
					<view class="qymc">
						<view class="">
							{{item.companyName}}
						</view>
					</view>
					<view class="dq">
						<view class="">
							{{item.areaName}}
						</view>
					</view>
					<view class="je">
						<view class="">
							{{item.amount}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.id = options.id;
			this.title = options.name;
			console.log(this.id)

			this.getIdnoList();
		},
		data() {
			return {
				// 传入参数
				id: '',
				title: '',

				// 批次
				pcTab: [],
				tabIndex: 0,

				// 批次对应的请求数据的参数
				page: {
					pageNum: 1,
					pageSize: 10,
					publicListId: "",
					searchParam: "",
				},
				
				pageTotal: 0,

				// 公示名单数据
				subsidylist: [],

				firstItem: ['序号', '企业名称', '地区', '金额(万元)'],
				
				url:'',
			};
		},
		methods: {
			// 获取批次号
			async getIdnoList() {
				let {
					data: res
				} = await this.$request({
					url: `/${this.id}/noList`,
					method: 'get'
				})

				console.log(res);
				
				if(res.rows.length == 0){
					uni.showToast({
						icon: 'error',
						title: '空'
					})
					return;
				}

				this.pcTab = res.rows;
				this.tabIndex = res.rows[0].batchNo;

				this.page.publicListId = res.rows[0].publicListId;
				this.url = res.rows[0].url;
				// this.page.searchParam = res.rows[0].batchNo;

				this.getsubsidylist();
			},

			// 获取公示名单信息
			async getsubsidylist() {
				let {
					data: res
				} = await this.$request({
					url: `/subsidy/list`,
					method: 'get',
					data: this.page
				})

				console.log(res);
				for(let item of res.rows){
					this.subsidylist.push(item)
				}
				
				this.pageTotal = res.total;

				for (let item of this.subsidylist) {
					item.amount = (item.amount / 10000).toFixed(2);
				}
			},

			// 切换批次
			tabClick(pc, id, url) {
				// 切换时, 替换批次号, 替换publicListId , 替换跳转地址, 清空页码, 清空表数据
				this.tabIndex = pc;
				this.page.publicListId = id;
				this.url = url;
				
				this.page.pageNum = 1;
				this.subsidylist = [];
				
				this.getsubsidylist();
			},
			
			// 原文链接
			ywljNClick() {
				uni.navigateTo({
					url:"../wbHttp/wbHttp?url=" + this.url
				})
			},
		},
		// 触底事件
		onReachBottom(){
			console.log('xxx');
			
			if (this.pageTotal > (this.page.pageNum * this.page.pageSize)) {
				this.page.pageNum = this.page.pageNum + 1;
				this.getsubsidylist();
			} else {
				console.log('没有了！')
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F6F7F9;
	}

	.zccx_zcrl_gsmd {
		padding: 30rpx 0;
	}

	.title {
		width: 550rpx;
		margin: auto;
		font-weight: 800;
		text-align: center;
		line-height: 50rpx;
	}

	.pcTab {
		// width: 580rpx;
		height: 60rpx;
		margin: 20rpx auto;
		display: flex;
		justify-content: center;

		view {
			width: 160rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 25rpx;
			margin-left: 10rpx;
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

	// 表格
	.gsmdMain {
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
					flex: 1
				}

				.firstItem:nth-child(2) {
					flex: 3
				}

				.firstItem:nth-child(3) {
					flex: 2
				}

				.firstItem:nth-child(4) {
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

				.xh {
					flex: 1;
					width: 0;
				}

				.qymc {
					flex: 3;
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
	
	.ywlj_n{
		font-size: 20rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		text{
			color: #256BFF;
		}
	}
</style>
