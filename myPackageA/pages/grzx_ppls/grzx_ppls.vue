<template>
	<view class="grzx_ppls">
		<!-- 匹配历史 -->
		<view class="selectDateTop" @click="selectClick()">
			{{ batchNoDate }} <text class="iconfont icon-xia"></text>
		</view>

		<view class="zccxBox">
			<view class="zccxItem" v-for="(item, index) in dataList" :key="index">
				<view class="objhang">
					<view class="nameTitle">
						匹配时间:
					</view>
					<view class="nameContent">
						{{item.createDate}}
					</view>
				</view>

				<view class="objhang">
					<view class="nameTitle">
						项目名称：
					</view>
					<view class="nameContent">
						{{item.title}}
					</view>
				</view>

				<view class="objhang">
					<view class="nameTitle">
						受理部门：
					</view>
					<view class="nameContent">
						{{item.departmentName}}
					</view>
				</view>

				<view class="objhang">
					<view class="nameTitle">
						申报时间：
					</view>
					<view class="nameContent">
						{{item.policyBeginTime ? item.policyBeginTime : ""}}-{{item.policyEndTime ? item.policyEndTime : ""}}
					</view>
				</view>

				<view class="objhang">
					<view class="nameTitle">
						申报地区：
					</view>
					<view class="nameContent">
						{{item.areaName}}
					</view>
				</view>
			</view>

			<!-- 只有会员可以看到的部分 -->
			<view class="vipCkBox">
				<!-- 毛玻璃效果 -->
				<view class="mblClass" v-if="!vipIs">
					<view class="vipTs">
						升级SVIP、查看更多政策
					</view>
				</view>
				<view class="zccxItem" v-for="(item, index) in dataList2" :key="index">
					<view class="objhang">
						<view class="nameTitle">
							匹配时间:
						</view>
						<view class="nameContent">
							{{item.createDate}}
						</view>
					</view>

					<view class="objhang">
						<view class="nameTitle">
							项目名称：
						</view>
						<view class="nameContent">
							{{item.title}}
						</view>
					</view>

					<view class="objhang">
						<view class="nameTitle">
							受理部门：
						</view>
						<view class="nameContent">
							{{item.departmentName}}
						</view>
					</view>

					<view class="objhang">
						<view class="nameTitle">
							申报时间：
						</view>
						<view class="nameContent">
							{{item.policyBeginTime ? item.policyBeginTime : ""}}-{{item.policyEndTime ? item.policyEndTime : ""}}
						</view>
					</view>

					<view class="objhang">
						<view class="nameTitle">
							申报地区：
						</view>
						<view class="nameContent">
							{{item.areaName}}
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="selectBox" v-if="selectIs">
			<van-picker title="历史记录" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"
				@change="onChange" />
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			this.vipIs = uni.getStorageSync('userInfo').roles[0].roleKey == 'vip'
			this.getBatchList();
		},
		data() {
			return {
				vipIs: false,
				// 选择框显示
				selectIs: false,

				// 选择框显示列表
				columns: [],

				// 批次
				batchList: [],

				// 批次对应的数据
				// dataList只用来保存前三个数据
				dataList: [],
				// dataList用来保存后面的数据，和拼接的数据
				dataList2: [],

				// 第一个批次号，时间
				batchNoDate: '',

				page: {
					batchNo: '',
					pageNum: 1,
					pageSize: 10,
				},
				pageTotal: 0,
			}
		},
		methods: {
			// 获取批次数据
			async getBatchList() {
				let {
					data: res
				} = await this.$request({
					method: 'GET',
					url: '/match/batchList',
				})

				console.log(res);

				for (let item of res.data) {
					let dataGL = this.$date(item.createDate);
					this.columns.push(dataGL);

					// 用于同步时间格式，在后面可以用来查找 批次号
					item.createDate = dataGL;
					this.batchList.push(item);
				}

				// 将第一个批次号放入对象，用于第一次请求数据,并附上时间
				this.page.batchNo = res.data[0].batchNo;
				this.batchNoDate = res.data[0].createDate;

				this.getRecordList();
			},
			// 通过批次号，得到表数据
			async getRecordList() {
				let {
					data: res
				} = await this.$request({
					url: `/match/recordList`,
					method: 'GET',
					data: this.page,
				})

				console.log(res)

				// 由于数据展示分为了两段,这里需要进行判断,如果是第一页(pageNum=1),则将数据分开拼接,
				// 否则直接将数据拼接到后面的dataList2

				if (this.page.pageNum == 1) {
					for (let i = 0; i < 3; i++) {
						if (res.rows[i]) {
							this.dataList.push(res.rows[i]);
						}
					}

					// console.log(res.rows.length)
					for (let i = 3; i < res.rows.length; i++) {
						// console.log(i)
						this.dataList2.push(res.rows[i]);
					}
				} else {
					for (let item of res.rows) {
						this.dataList2.push(item)
					}
				}

				// for (let item of res.rows) {
				// 	this.dataList.push(item)
				// }
				this.pageTotal = res.total;

				// 处理数据
				for (let item of this.dataList) {
					// 将时间转换为需要的格式
					item.createDate = this.$date(item.createDate).split(' ')[0].replace(/-/g, '.');
					item.policyBeginTime = this.$date(item.policyBeginTime).split(' ')[0].replace(/-/g, '.');
					item.policyEndTime = this.$date(item.policyEndTime).split(' ')[0].replace(/-/g, '.');
				}
				for (let item of this.dataList2) {
					// 将时间转换为需要的格式
					item.createDate = this.$date(item.createDate).split(' ')[0].replace(/-/g, '.');
					item.policyBeginTime = this.$date(item.policyBeginTime).split(' ')[0].replace(/-/g, '.');
					item.policyEndTime = this.$date(item.policyEndTime).split(' ')[0].replace(/-/g, '.');
				}
			},
			selectClick() {
				this.selectIs = true;
			},


			onConfirm(value, index) {
				console.log(value.detail.value)

				let pcItem = this.batchList.find((item) => {
					return item.createDate == value.detail.value;
				});


				// 赋值批次号 和 显示时间
				this.page.batchNo = pcItem.batchNo;
				this.batchNoDate = pcItem.createDate;

				// 清空数据，和请求条件pageNumber，pageTotal
				this.dataList = [];
				this.page.pageNum = 1;
				this.pageTotal = 0;
				
				this.dataList2 = [];

				this.getRecordList();

				this.selectIs = false;
			},
			onChange(picker, value, index) {
				console.log(value, index)
			},
			onCancel() {},
		},
		onReachBottom() {
			if(!this.vipIs){
				return;
			}
			if (this.pageTotal > (this.page.pageNum * this.page.pageSize)) {
				this.page.pageNum = this.page.pageNum + 1;
				this.getRecordList();
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

	.grzx_ppls {
		padding: 30rpx 0;
	}

	.selectBox {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		z-index: 999;
	}

	.selectDateTop {
		text-align: center;
		font-size: 26rpx;
		color: #999999;

		text {
			font-size: 26rpx;
			margin-left: 10rpx;
		}
	}

	.zccxItem {
		width: 600rpx;
		margin: 20rpx auto;
		padding: 30rpx;
		background-color: #FFFFFF;

		.objhang {
			font-size: 28rpx;
			margin-top: 10rpx;
			display: flex;

			.nameTitle {
				width: 150rpx;
				color: #666666;
			}

			.nameContent {
				flex: 1;
				width: 0;
				color: #363636;
			}
		}
	}

	.vipCkBox {
		position: relative;

		.mblClass {
			position: absolute;
			width: 100%;
			height: 100%;
			backdrop-filter:  blur(2px);
			background-color: rgba(255,255,255,0.52);
		}
		
		.vipTs{
			margin-top: 200rpx;
			text-align: center;
			font-weight: 600;
		}
	}
</style>
