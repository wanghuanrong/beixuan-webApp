<template>
	<view class="zccx_zcrl_zcxq">
		<view class="zcxqMain">
			<view class="title">
				{{contextMain.title}}
			</view>

			<view class="zcxqTab">
				<view class="tabItem" v-for="(item, index) in zcxqTab" :key="index"
					:class="tabIndex == index ? 'tabIs' : 'tabNo'" @click="tabClick(index)">
					{{item}}
				</view>
			</view>

			<view class="contextMain">
				<view class="context" v-html="contextMain.context">
				</view>

				<view class="" style="width: 500rpx; margin: auto;">
					<van-button round type="info" block color='#6394FD'>项目辅导</van-button>
				</view>
				
				<view class=""  style="width: 500rpx; margin: 30rpx auto;" v-if="tabIndex == 1">
					<van-button round type="info" block>客服咨询</van-button>
				</view>

				<view class="ywlj_n">
					原文链接：<text @click="ywljNClick()">点击前往</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.policyId = options.id;

			this.getpolicyId()
		},
		data() {
			return {
				zcxqTab: ['政策原文', '政策解析', '公示名单'],
				tabIndex: 0,
				policyId: '',
				contextMain: '',
			};
		},
		methods: {
			
			async getpolicyId() {
				let {
					data: res
				} = await this.$request({
					url: `/policy/${this.policyId}`,
					method: 'get'
				})

				console.log(res);
				this.contextMain = res.data;
			},

			tabClick(index) {
				this.tabIndex = index;
				
				if(index == 2){
					this.tabIndex = 0;
					uni.navigateTo({
						url:`../zccx_zcrl_gsmd/zccx_zcrl_gsmd?id=${this.contextMain.policyId}&name=${this.contextMain.title}`
					})
				}
			},

			// 原文链接
			ywljNClick() {
				console.log(this.contextMain.contextUrl)
				uni.navigateTo({
					url:"../wbHttp/wbHttp?url=" + this.contextMain.contextUrl
				})
			},
		}
	}
</script>

<style lang="less">
	.zccx_zcrl_zcxq {
		padding: 30rpx 0;
	}

	.title {
		width: 550rpx;
		margin: auto;
		font-weight: 800;
		text-align: center;
		line-height: 50rpx;
	}

	.context {
		width: 680rpx;
		color: #666666;
		margin: 50rpx auto;
		font-size: 20rpx;
	}


	.zcxqTab {
		width: 580rpx;
		height: 60rpx;
		margin: 20rpx auto;
		display: flex;
		justify-content: space-between;

		view {
			width: 160rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 25rpx;
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
