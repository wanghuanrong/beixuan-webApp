<template>
	<view class="grzx_wddy">
		<!-- 我的订阅 -->
		<view class="emailBox">
			<view class="title">
				订阅通知
			</view>
			<view class="checkBox">
				<checkbox-group @change="checkboxChange(val, $event)">
					<label>
						<view class="">
							<checkbox value="Y" :checked="checked.email == 1" /><text>邮箱通知</text>
						</view>
					</label>
				</checkbox-group>
			</view>
		</view>

		<view class="dyListBox">
			<view class="zccxItem" v-for="(item, index) in dataList" :key="index">
				<view class="objhang">
					<view class="nameTitle">
						创建时间:
					</view>
					<view class="nameContent">
						{{item.createTime}}
					</view>
				</view>
				<view class="objhang">
					<view class="nameTitle">
						项目名称:
					</view>
					<view class="nameContent">
						{{item.title}}
					</view>
				</view>
				<view class="objhang">
					<view class="nameTitle">
						申报部门:
					</view>
					<view class="nameContent">
						{{item.departmentName}}
					</view>
				</view>
				<view class="objhang">
					<view class="nameTitle">
						申报地区:
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
							创建时间:
						</view>
						<view class="nameContent">
							{{item.createTime}}
						</view>
					</view>
					<view class="objhang">
						<view class="nameTitle">
							项目名称:
						</view>
						<view class="nameContent">
							{{item.title}}
						</view>
					</view>
					<view class="objhang">
						<view class="nameTitle">
							申报部门:
						</view>
						<view class="nameContent">
							{{item.departmentName}}
						</view>
					</view>
					<view class="objhang">
						<view class="nameTitle">
							申报地区:
						</view>
						<view class="nameContent">
							{{item.areaName}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.vipIs = uni.getStorageSync('userInfo').roles[0].roleKey == 'vip'
			this.getEmailData();
			this.getDyDataFun();
		},
		data() {
			return {
				checked: null,
				vipIs: false,
				page: {
					pageNum: 1,
					pageSize: 10
				},
				pageTotal: 0,

				// dataList只用来保存前三个数据
				dataList: [],
				// dataList用来保存后面的数据，和拼接的数据
				dataList2: [],

			};
		},
		methods: {
			// 获取邮箱通知数据
			async getEmailData() {
				let {
					data: res
				} = await this.$request({
					url: `/push/sendTypeList`,
					method: 'GET',
				});

				console.log(res);
				this.checked = res.data[0];
			},
			// 获取列表数据
			async getDyDataFun() {
				let {
					data: res
				} = await this.$request({
					url: `/push/subscripList`,
					method: 'GET',
					data: this.page,
				})

				console.log(res);

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

				this.pageTotal = res.total;

				// 处理数据
				for (let item of this.dataList) {
					// 将时间转换为需要的格式
					item.createTime = this.$date(item.createTime).split(' ')[0].replace(/-/g, '.');
				}
				for (let item of this.dataList2) {
					// 将时间转换为需要的格式
					item.createTime = this.$date(item.createTime).split(' ')[0].replace(/-/g, '.');
				}
			},
			async checkboxChange(val, $event) {
				if ($event.detail.value[0]) {
					this.checked.email = 1;
				} else {
					this.checked.email = 0;
				}

				let {
					data: res
				} = await this.$request({
					url: `/push/update`,
					method: 'GET',
					data: this.checked,
				})
				
				console.log(res);
				
				if(res.code != 200){
					uni.showToast({
						icon: 'error',
						title: '操作失败'
					})
					return;
				}
				
				uni.showToast({
					title: '操作成功'
				})
			}
		},
		onReachBottom() {
			if (!this.vipIs) {
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

	.grzx_wddy {
		padding: 30rpx 0;
	}

	.emailBox {
		width: 600rpx;
		height: 100rpx;
		background: #FFFFFF;
		margin: 30rpx auto;
		padding: 0 30rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
			backdrop-filter: blur(2px);
			background-color: rgba(255, 255, 255, 0.52);
		}

		.vipTs {
			margin-top: 100rpx;
			text-align: center;
			font-weight: 600;
		}
	}
</style>
