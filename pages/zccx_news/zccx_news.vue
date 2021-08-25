<template>
	<view class="news">
		<!-- 新闻 -->
		<view class="zcrlMain">
			<!-- <calendar :calendarList='calendarList'></calendar> -->
			<news-two :newsList='newsList'></news-two>
		</view>
	</view>
</template>

<script>
	// 新闻
	import newsTwo from '../../components/news/news2.vue'
	export default {
		onLoad() {
			this.getNewsList();
		},
		data() {
			return {
				// 新闻
				newsList: [],

				page: {
					pageNum: 1,
					pageSize: 10,
				},
				pagetotal: 0,
			}
		},
		methods: {
			// 新闻
			async getNewsList() {
				let {
					data: res
				} = await this.$request({
					url: '/listWebNews',
					method: 'get',
					data: this.page
				})

				console.log(res);
				// 过滤内容中的标签
				for (let item of res.data) {
					item.context_cl = item.context
						.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
						.replace(/<[^>]+?>/g, "")
						.replace(/\s+/g, " ")
						.replace(/ /g, " ")
						.replace(/>/g, " ")
						.replace("&nbsp;", "");

					item.image = this.$http + item.image;
				}

				for (let item of res.data) {
					this.newsList.push(item)
				}

				this.pagetotal = res.total;
			}
		},
		onReachBottom() {
			if (this.pagetotal > (this.page.pageNum * this.page.pageSize)) {
				this.page.pageNum = this.page.pageNum + 1;
				this.getNewsList();
			} else {
				console.log('没有了！')
			}
		},
		components: {
			newsTwo,
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F6F7F9;
	}

	.zcrlMain {
		width: 680rpx;
		margin: auto;
	}
</style>
