<template>
	<view class="zcpp_zccx">
		<!-- 政策结果 -->
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
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.page.code = options.code;

			this.getRecordList();
		},
		data() {
			return {
				page: {
					code: '',
					pageNum: 1,
					pageSize: 10,
				},

				pageTotal: 0,
				code: '',
				dataList: [],
			};
		},
		methods: {
			async getRecordList() {
				let {
					data: res
				} = await this.$request({
					url: `/match/recordList`,
					method: 'GET',
					data: this.page
				})

				console.log(res)

				for (let item of res.rows) {
					this.dataList.push(item)
				}
				this.pageTotal = res.total;
				
				// 处理数据
				for(let item of this.dataList){
					// 将时间转换为需要的格式
					item.createDate = this.$date(item.createDate).split(' ')[0].replace(/-/g, '.');
					item.policyBeginTime = this.$date(item.policyBeginTime).split(' ')[0].replace(/-/g, '.');
					item.policyEndTime = this.$date(item.policyEndTime).split(' ')[0].replace(/-/g, '.');
				}
			}
		},
		onReachBottom() {
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
page{
	background-color: #F6F7F9;
}

.zcpp_zccx{
	padding: 30rpx;
}

.zccxItem{
	width: 600rpx;
	margin: 20rpx auto;
	padding: 30rpx;
	background-color: #FFFFFF;
	
	.objhang{
		font-size: 28rpx;
		margin-top: 10rpx;
		display: flex;
		
		.nameTitle{
			width: 150rpx;
			color: #666666;
		}
		
		.nameContent{
			flex: 1;
			width: 0;
			color: #363636;
		}
	}
}
</style>
