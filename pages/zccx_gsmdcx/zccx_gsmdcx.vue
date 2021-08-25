<template>
	<view class="zccx_gsmdcx">
		<view class="top">
			<!-- 搜索框 -->
			<view class="search">
				<search-top @search="search()"><text>公示名单</text></search-top>
			</view>

			<view class="scBox">
				<view class="scBoxItem" @click="ztInputClick()">
					年份选择<text class="iconfont icon-xia"></text>
				</view>
				<view class="scBoxItem" @click="scClick()">
					其他筛选<text class="iconfont icon-xia"></text>
				</view>
			</view>

			<view class="selectBox" v-if="selectIs">
				<van-picker title="年份选择" show-toolbar :columns="nfList" @confirm="onConfirm" @cancel="onCancel"
					@change="onChange" />
			</view>
		</view>
		
		<!-- 主要表格 -->
		<view class="gsmdMain">
			<view class="tabsList">
				<view class="tableFirst">
					<view class="firstItem" v-for="(item, index) in firstItem" :key="index">
						{{item}}
					</view>
				</view>
		
				<view class="tabContent" v-for="(item, index) in tableData" :key="index"
					:style="{'background-color' : (index % 2) == 0 ? '#FFFFFF' : '#E4E9F2'}">
					<view class="qymc">
							{{item.title}}
					</view>
					<view class="dq">
						<text v-if="item.policyBeginTime && item.policyEndTime">
							{{item.policyBeginTime}}至{{item.policyEndTime}}
						</text>
							
					</view>
				</view>
			</view>
		</view>

		<view class="sxMain" v-if="sxShowIs">
			<view class="sxBox">
				<view class="twoBtn">
					<view class="cz">
						<van-button round block type="info" @click="czClick()">重置</van-button>
					</view>
					<view class="qd">
						<van-button round block type="info" @click="submitClick()">确定</van-button>
					</view>
				</view>
				<view class="sxList">
					<scroll-view class="scroll-view_H" scroll-y="true" scroll-x="true">
						<view class="Listitem">
							<view class="title">
								地区分类
							</view>
							<view class="list">
								<view class="xzItem" :class="{'xzItemIs' : mainData.areaCode == item.areaCode}"
									@click="xzClick(item.areaCode)" v-for="(item, index) in dqList" :key="index">
									{{item.areaName}}
								</view>
							</view>
						</view>

						<view class="Listitem">
							<view class="title">
								部委分类
							</view>
							<view class="list">
								<view class="xzItem"
									:class="{'xzItemIs' : mainData.departmentIds.toString().indexOf(item.departmentId) != -1}"
									@click="bwClick(item.departmentId)" v-for="(item, index) in bwList" :key="index">
									{{item.area.areaName ? item.area.areaName : ''}}{{item.departmentName}}
								</view>
							</view>
						</view>

						<view class="Listitem">
							<view class="title">
								行业分类
							</view>
							<view class="list">
								<view class="xzItem"
									:class="{'xzItemIs' : mainData.categoryIds.toString().indexOf(item.categoryId) != -1}"
									@click="hyClick(item.categoryId)" v-for="(item, index) in hyList" :key="index">
									{{item.categoryName}}
								</view>
							</view>
						</view>

						<view class="Listitem">
							<view class="title">
								项目分类
							</view>
							<view class="list">
								<view class="xzItem"
									:class="{'xzItemIs' : mainData.projectIds.toString().indexOf(item.projectId) != -1}"
									@click="xmClick(item.projectId)" v-for="(item, index) in xmList" :key="index">
									{{item.projectName}}
								</view>
							</view>
						</view>

						<view class="Listitem" style="margin-bottom: 50rpx;">
							<view class="title">
								主体分类
							</view>
							<view class="list">
								<view class="xzItem"
									:class="{'xzItemIs' : mainData.subjectIds.toString().indexOf(item.subjectId) != -1}"
									@click="ztClick(item.subjectId)" v-for="(item, index) in ztList" :key="index">
									{{item.subjectName}}
								</view>
							</view>
						</view>

					</scroll-view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import searchTop from '../../components/searchTop/searchTop.vue';
	export default {
		onLoad() {
			this.getMainDataFun();


			this.getdqDataFun();
			this.getbwDataFun();
			this.gethyDataFun();
			this.getxmDataFun();
			this.getztDataFun();
		},
		data() {
			return {
				firstItem: ['申报项目名称', '申报时间'],
				tableData: [],

				// 选择条件列表
				sxShowIs: false,
				// 地区
				dqList: [],
				// 部委
				bwList: [],
				page: {
					// pageNum: 1,
					// pageSize: 10,
					areaCode: '',
				},
				// 行业
				hyList: [],
				// 项目：
				xmList: [],
				// 主体
				ztList: [],
				// 年份
				selectIs: false,
				nfList: [{
						id: '',
						text: "全部"
					}, {
						id: 2017,
						text: "2017年"
					},
					{
						id: 2018,
						text: "2018年"
					},
					{
						id: 2019,
						text: "2019年"
					},
					{
						id: 2020,
						text: "2020年"
					},
					{
						id: 2021,
						text: "2021年"
					},
				],

				// 查询列表对象
				mainData: {
					areaCode: '',
					categoryIds: [' '],
					departmentIds: [' '],
					pageNum: 1,
					pageSize: 20,
					projectIds: [' '],
					subjectIds: [' '],
					title: '',
					year: '',
				},
				mainTotal: 0,
			}
		},
		methods: {
			// 搜索
			async search(val) {
				console.log(val);
				this.mainData.title = val;
				
				// 清空数组，并重置翻页
				this.tableData = [];
				this.mainData.pageNum = 0;
				
				this.getMainDataFun()
			},
			// 得到主要表格列表信息******、
			async getMainDataFun() {
				// 处理请求条件
				let data = {};
				for (let item in this.mainData) {
					if (this.mainData[item] instanceof Array) {
						// console.log(this.mainData[item].toString())
						if (this.mainData[item] == ' ') {
							data[item] = ""
						} else {
							data[item] = this.mainData[item].toString();
						}
					} else {
						data[item] = this.mainData[item];
					}
				}

				console.log(data);

				let {
					data: res
				} = await this.$request({
					url: `/policy/list`,
					method: 'GET',
					data: data
				})

				console.log(res);

				// this.tableData = res.rows;
				for (let item of res.rows) {
					this.tableData.push(item)
				}
				this.mainTotal = res.total;
			},
			// 筛选
			scClick() {
				this.sxShowIs = true;
			},
			// 得到地区列表数据-----------------------------------------
			async getdqDataFun() {
				// 地区查询
				let {
					data: res1
				} = await this.$request({
					url: `/area/list`,
					method: 'GET',
				})

				console.log('地区', res1);
				// 把“全部”拼入
				res1.rows.splice(0, 0, {
					areaId: '',
					areaCode: '',
					areaName: '全部'
				})
				this.dqList = res1.rows;
			},

			// 得到部委列表数据
			async getbwDataFun() {
				// 部委查询
				let {
					data: res2
				} = await this.$request({
					url: `/department/list`,
					method: 'GET',
					data: this.page,
				})

				console.log('部委', res2);
				// 把“全部”拼入
				res2.rows.splice(0, 0, {
					departmentId: ' ',
					departmentName: '全部'
				})
				this.bwList = res2.rows;

			},

			async gethyDataFun() {
				// 行业查询
				let {
					data: res3
				} = await this.$request({
					url: `/category/list `,
					method: 'GET',
				})

				console.log('行业', res3);
				// 把“全部”拼入
				res3.rows.splice(0, 0, {
					categoryId: ' ',
					categoryName: '全部'
				})
				this.hyList = res3.rows;
			},

			async getxmDataFun() {
				// 项目查询
				let {
					data: res4
				} = await this.$request({
					url: `/project/list `,
					method: 'GET',
				})

				console.log('项目', res4);
				// 把“全部”拼入
				res4.rows.splice(0, 0, {
					projectId: ' ',
					projectName: '全部'
				})
				this.xmList = res4.rows;
			},

			async getztDataFun() {
				// 主体查询
				let {
					data: res5
				} = await this.$request({
					url: `/subject/list`,
					method: 'GET',
				})

				console.log('主体', res5);
				// 把“全部”拼入
				res5.rows.splice(0, 0, {
					subjectId: ' ',
					subjectName: '全部'
				})
				this.ztList = res5.rows;
			},

			// 年份选择------------------------------------------
			ztInputClick() {
				this.selectIs = true;
			},
			onConfirm(value, index) {
				console.log(value.detail.value)

				this.mainData.year = value.detail.value.id;
				
				// 清空数组，并重置翻页
				this.tableData = [];
				this.mainData.pageNum = 0;
				
				
				this.getMainDataFun();
				this.selectIs = false;
			},
			onChange(picker, value, index) {},
			onCancel() {
				this.selectIs = false;
			},


			// 筛选单机事件-----------------------------------------
			// 地区
			xzClick(areaCode) {
				console.log(areaCode);
				// 根据areaCode 来得到对应‘部委’的数据
				this.page.areaCode = areaCode ? areaCode : '';
				this.getbwDataFun();

				// 清空‘部委’
				this.mainData.departmentIds = [' '];

				this.mainData.areaCode = areaCode;
			},
			// 部委
			bwClick(id) {
				console.log(id)
				if (id == ' ') {
					this.mainData.departmentIds = [' '];
					return;
				}

				if (this.mainData.departmentIds.indexOf(' ') != -1) {
					this.mainData.departmentIds.splice(this.mainData.departmentIds.indexOf(' '), 1);
				}
				if (this.mainData.departmentIds.indexOf(id) != -1) {
					this.mainData.departmentIds.splice(this.mainData.departmentIds.indexOf(id), 1);
				} else {
					this.mainData.departmentIds.push(id);
				}
			},
			// 行业
			hyClick(id) {
				console.log(id)

				if (id == ' ') {
					this.mainData.categoryIds = [' '];
					return;
				}

				if (this.mainData.categoryIds.indexOf(' ') != -1) {
					this.mainData.categoryIds.splice(this.mainData.categoryIds.indexOf(' '), 1);
				}
				if (this.mainData.categoryIds.indexOf(id) != -1) {
					this.mainData.categoryIds.splice(this.mainData.categoryIds.indexOf(id), 1);
				} else {
					this.mainData.categoryIds.push(id);
				}
			},
			// 项目
			xmClick(id) {
				console.log(id)


				if (id == ' ') {
					this.mainData.projectIds = [' '];
					return;
				}

				if (this.mainData.projectIds.indexOf(' ') != -1) {
					this.mainData.projectIds.splice(this.mainData.projectIds.indexOf(' '), 1);
				}
				if (this.mainData.projectIds.indexOf(id) != -1) {
					this.mainData.projectIds.splice(this.mainData.projectIds.indexOf(id), 1);
				} else {
					this.mainData.projectIds.push(id);
				}
			},
			// 主体
			ztClick(id) {
				console.log(id)


				if (id == ' ') {
					this.mainData.subjectIds = [' '];
					return;
				}

				if (this.mainData.subjectIds.indexOf(' ') != -1) {
					this.mainData.subjectIds.splice(this.mainData.subjectIds.indexOf(' '), 1);
				}
				if (this.mainData.subjectIds.indexOf(id) != -1) {
					this.mainData.subjectIds.splice(this.mainData.subjectIds.indexOf(id), 1);
				} else {
					this.mainData.subjectIds.push(id);
				}
			},

			// 重置按钮
			czClick() {
				for (let item in this.mainData) {
					if (this.mainData[item] instanceof Array) {
						this.mainData[item] = [' '];
					}
				}
				this.mainData.areaCode = '';
			},

			// 确认按钮
			submitClick() {
				// 清空数组，并重置翻页
				this.tableData = [];
				this.mainData.pageNum = 0;
				
				this.getMainDataFun();
				this.sxShowIs = false;
			}
		},
		onReachBottom() {
			if (this.mainTotal > (this.mainData.pageNum * this.mainData.pageSize)) {
				this.mainData.pageNum = this.mainData.pageNum + 1;
				this.getMainDataFun();
			} else {
				console.log('没有了！')
			}
		},
		components: {
			searchTop,
		}
	}
</script>

<style lang="less">
	.zccx_gsmdcx {
		// padding: 30rpx 0;
	}

	.top {
		padding-top: 30rpx;
		background-color: #F6F7F9;

		.scBox {
			height: 50rpx;
			line-height: 50rpx;
			padding: 20rpx;
			margin: auto;
			font-size: 26rpx;
			text-align: center;
			display: flex;

			.scBoxItem {
				flex: 1;
				position: relative;

				&::after {
					content: "|";
					color: #cccccc;
					position: absolute;
					right: 0;
					top: 2rpx;
				}

				&:last-child::after {
					content: "";
				}
			}

			text {
				font-size: 22rpx;
			}
		}
	}


	.selectBox {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		z-index: 999;
	}


	// 筛选“页面”
	.sxMain {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #7d7d7d66;
		z-index: 99;

		.sxBox {
			width: 100%;
			height: 1300rpx;
			background-color: #FFFFFF;
			position: absolute;
			bottom: 0;

			.twoBtn {
				padding-top: 20rpx;
				height: 100rpx;
				// border: 1rpx solid red;
				// box-shadow: 1px 1px 1px black;
				border-bottom: 1rpx solid #e5e5e5;
				display: flex;
				justify-content: space-around;
				position: relative;
				left: 0;
				top: 0;

				>view {
					width: 200rpx;
				}
			}

			// 列表
			.sxList {

				.Listitem {

					.title {
						margin-top: 20rpx;
						padding-left: 30rpx;
						font-weight: 600;
					}

					.list {
						display: flex;
						flex-wrap: wrap;

						.xzItem {
							height: 60rpx;
							line-height: 60rpx;
							padding: 0 20rpx;
							margin: 10rpx 0 0 20rpx;
							font-size: 24rpx;
							color: #333333;
							background-color: #F4F5F8;
							border-radius: 30rpx;
						}

						.xzItemIs {
							background-color: #256BFF;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
	
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
				// text-align: center;
				font-size: 30rpx;
				font-weight: 800;
				display: flex;
	
				.firstItem:nth-child(1) {
					flex: 2;
					text-align: left;
					padding-left: 20rpx;
				}
	
				.firstItem:nth-child(2) {
					flex: 2;
					text-align: right;
					padding-right: 20rpx;
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
				}
	
				.qymc {
					flex: 2;
					width: 0;
					text-align: left;
					padding-left: 20rpx;
				}
	
				.dq {
					flex: 2;
					width: 0;
					text-align: right;
					padding-right: 20rpx;
					text{
						flex: 1;
						text-align: right;
					}
				}
	
			}
		}
	}

	.scroll-view_H {
		height: 1200rpx;
	}
</style>
