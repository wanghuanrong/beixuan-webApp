<template>
	<view class="zccx">
		<!-- 搜索框 -->
		<view class="search">
			<search-top @search="search()"><text>同行查询</text></search-top>

			<!-- 遮罩层 -->
			<!-- <view class="zzcBox" @click="searchZzcClick()">
				
			</view> -->
		</view>

		<!-- 文字 -->
		<view class="topFont">
			<text class="ptFont">深圳市获得资助企业</text><text class="lsFont">{{totalNum}}家+</text>
			<text class="ptFont">，资助总金额</text><text class="lsFont">{{totalPrice}}万元</text>
		</view>

		<!-- 大图 -->
		<view class="topImg">
			产业政策大数据智能云平台
		</view>

		<!-- 四个菜单 -->
		<view class="fiveItemBox">
			<view class="itemBox" v-for="(item, index) in fiveItemList" :key="index" @click="towClickN(item.url)">
				<view class="itemImg" :style="'background-image:url('+ require('@/static/index/' + item.img) +')'">

				</view>
				<view class="itemTitle">
					{{item.title}}
				</view>
			</view>
		</view>

		<!-- 两个菜单 -->
		<view class="twoItemBox">
			<view class="itemBox" v-for="(item, index) in twoItemList" :key="index" @click="towClickN(item.url)">
				<view class="itemTitle">
					<view class="bigTitle">
						{{item.title}}
					</view>
					<view class="smallTitle">
						更多推荐
					</view>
				</view>
				<view class="itemImg">
					<image :src="'../../static/index/' + item.img" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<!-- 政策日历 -->
		<view class="zcrlBox">
			<view class="zcrlTop">
				<view class="zcrlTitle">
					政策日历
				</view>
				<view class="gd" @click="zcrlGd()">
					更多<text class="iconfont icon-you"></text>
				</view>
			</view>

			<view class="tab">
				<view class="tab1" v-for="(item,index) in tabList" :key="index"
					:class="tabIndex == index ? 'tabIs' : 'tabNo'" @click="tabClick(index)">
					{{item}}
				</view>
			</view>

			<view class="zcrlMain">
				<calendar :calendarList='calendarList'></calendar>
			</view>
		</view>


		<!-- 政策新闻 -->
		<view class="zcrlBox">
			<view class="zcrlTop">
				<view class="zcrlTitle">
					政策新闻
				</view>
				<view class="gd" @click="newsGdClick()">
					更多<text class="iconfont icon-you"></text>
				</view>
			</view>

			<view class="zcrlMain">
				<!-- <calendar :calendarList='calendarList'></calendar> -->
				<news :newsList='newsList'></news>
			</view>
		</view>

	</view>
</template>

<script>
	// 搜索框
	import searchTop from '../../components/searchTop/searchTop.vue';

	// 政策日历
	import calendar from '../../components/calendar/calendar.vue';

	// 新闻
	import news from '../../components/news/news.vue'


	export default {
		onLoad() {
			this.getAllMoney();

			this.getcalendar();

			this.getNewsList();

		},
		data() {
			return {
				totalNum: 0,
				totalPrice: 0,

				// 四个菜单
				fiveItemList: [{
						title: '同行查询',
						img: 'five1.png',
						url: '../zccx_thcx/zccx_thcx',
					},
					{
						title: '申报通知查询',
						img: 'five2.png',
						url: 'xxx',
					},
					{
						title: '公示名单查询',
						img: 'five3.png',
						url: '../zccx_gsmdcx/zccx_gsmdcx',
					},
					{
						title: '政策图谱',
						img: 'five4.png',
						url: 'xxx',
					},
				],

				// 两个菜单
				twoItemList: [{
						title: '云课堂',
						img: 'two1.png',
						url: '../zccx_ykt/zccx_ykt'
					},
					{
						title: '项目辅导',
						img: 'two2.png',
						url: '../zccx_xmfd/zccx_xmfd'
					},
				],

				// 政策日历
				tabList: ['政策日历', '最新政策'],
				tabIndex: 0,
				calendarList: [],

				// 新闻
				newsList: [],
			}
		},
		methods: {
			// 搜索框遮罩层点击事件
			// searchZzcClick(){
			// 	uni.navigateTo({
			// 		url:'../zccx_thcx/zccx_thcx'
			// 	})
			// },
			search(e) {
				console.log(e);
				uni.navigateTo({
					url: '../zccx_thcx/zccx_thcx?search=' + e
				})
			},
			// 获取‘文字’数据
			async getAllMoney() {
				let {
					data: res
				} = await this.$request({
					url: '/subsidy/history/total',
					method: 'GET'
				})

				console.log(res);
				this.totalNum = res.data.totalNum;
				this.totalPrice = (res.data.totalPrice / 10000).toFixed(0)
			},

			// two模块单击事件
			towClickN(url) {
				if(url == 'xxx'){
					uni.showToast({
						title:'正在开发中。。。'
					})
				}
				console.log(url);
				uni.navigateTo({
					url: url
				})
			},

			// 政策日历“更多”
			zcrlGd() {
				uni.navigateTo({
					url: '../zccx_zcrl/zccx_zcrl'
				})
			},

			// 政策日历tab
			tabClick(index) {
				this.tabIndex = index;

				if (index == 0) {
					this.getcalendar();
				} else {
					this.getnewsPoli();
				}
			},
			// 获取‘政策日历’数据集
			async getcalendar() {
				let {
					data: res
				} = await this.$request({
					url: '/calendar/list',
					method: 'get',
					data: {
						pageNum: 1,
						pageSize: 5,
					}
				})

				console.log(res)
				if (res.code != 200) {
					uni.showToast({
						icon: 'error',
						title: '政策日历查询失败'
					})
				}
				this.calendarList = res.rows;
			},
			// 最新政策
			async getnewsPoli() {
				let {
					data: res
				} = await this.$request({
					url: '/news/policy',
					method: 'get',
					data: {
						pageNum: 1,
						pageSize: 5,
					}
				})

				this.calendarList = res.rows;
			},

			// 新闻‘更多’单击事件
			newsGdClick() {
				uni.navigateTo({
					url: '../zccx_news/zccx_news'
				})
			},

			// 新闻
			async getNewsList() {
				let {
					data: res
				} = await this.$request({
					url: '/listWebNews',
					method: 'get',
					data: {
						pageNum: 1,
						pageSize: 5,
					}
				})

				console.log(res)
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

				this.newsList = res.data;
			}
		},
		components: {
			searchTop,
			calendar,
			news,
		}
	}
</script>

<style lang="less" scoped>
	.zccx {
		display: hidden;
		background-color: #F6F7F9;
		padding: 30rpx 0;
	}

	// 搜索框
	.search {
		width: 750rpx;
		height: 75rpx;
		position: relative;

		.zzcBox {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 9999;
		}
	}

	// 文字提示
	.topFont {
		width: 90%;
		margin: 20rpx auto;
		font-size: 22rpx;
		text-align: center;

		.lsFont {
			color: #256BFF;
		}
	}

	.topImg {
		width: 680rpx;
		height: 160rpx;
		background-image: url('../../static/index/topImg.png');
		background-size: 100% 100%;
		margin: 40rpx auto;
		text-align: center;
		line-height: 160rpx;
		font-size: 45rpx;
		color: #FFFFFF;
	}

	.fiveItemBox {
		width: 680rpx;
		height: 160rpx;
		margin: 30rpx auto;
		display: flex;
		justify-content: space-between;

		.itemBox {
			flex: 1;

			.itemImg {
				width: 100rpx;
				height: 100rpx;
				margin: 0rpx auto;
				background-size: 100% 100%;
			}

			.itemTitle {
				text-align: center;
				font-size: 25rpx;
				margin-top: 10rpx;
			}
		}
	}

	.twoItemBox {
		width: 680rpx;
		height: 160rpx;
		margin: 30rpx auto;

		display: flex;
		justify-content: space-between;

		.itemBox {
			width: 300rpx;
			box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
			background-color: #FFFFFF;
			border-radius: 10rpx;
			display: flex;

			.itemTitle {
				flex: 1;
				width: 0;
				text-align: center;

				.bigTitle {
					height: 80rpx;
					line-height: 110rpx;
					font-size: 28rpx;
				}

				.smallTitle {
					height: 80rpx;
					line-height: 60rpx;
					font-size: 20rpx;
					color: #999999;
				}
			}

			.itemImg {
				flex: 1;
				width: 0;
				text-align: center;

				image {
					width: 80%;
					margin-top: 40rpx;
				}
			}
		}
	}

	.zcrlBox {
		width: 620rpx;
		margin: 40rpx auto;
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

				text {
					line-height: 60rpx;
					vertical-align: bottom;
				}
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
