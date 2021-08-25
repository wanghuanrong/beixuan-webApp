<template>
	<view class="zccx_news_xq">
		<!-- 新闻详情 -->
		
		<view class="title">
			{{newMain.title}}
		</view>
		<view class="context">
			<rich-text :nodes="newMain.context"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.id = options.id;

			this.getWebNews();
		},
		data() {
			return {
				id: '',
				newMain: {},
			};
		},
		methods: {
			async getWebNews() {
				let {
					data: res
				} = await this.$request({
					url: '/getWebNews/' + this.id,
					method: 'get'
				})

				console.log(res);
				this.newMain = res.data;
			}
		},
		// filters: {
		// 	getDateYd(val) {
		// 		let getDate = new Date(val);

		// 		let mm =
		// 			getDate.getMonth() + 1 > 10 ?
		// 			getDate.getMonth() + 1 :
		// 			"0" + (getDate.getMonth() + 1);
		// 		let day =
		// 			getDate.getDate() > 10 ? getDate.getDate() : "0" + getDate.getDate();
		// 		return mm + "-" + day;
		// 	},
		// }
	}
</script>

<style lang="less">
	.zccx_news_xq{
		padding: 30rpx 0;
	}
	.title{
		width: 600rpx;
		margin: 30rpx auto;
		font-weight: 800;
		text-align: center;
	}
	
	.context{
		font-size: 25rpx;
		width: 680rpx;
		margin: 30rpx auto;
		
		.ql-align-center{
			text-align: center;
		}
	}
</style>
