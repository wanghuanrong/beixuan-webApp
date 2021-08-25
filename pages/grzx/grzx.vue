<template>
	<view class="grzx">
		<!-- 个人中心 -->
		<view class="grzxTop">
			<view class="bigYuan"></view>
			<view class="smallYuan"></view>

			<view class="infoBox" @click="grxxClick()">
				<!-- 头像 -->
				<!-- :style="'background-image:url('+ (userInfo.avatar == '' ? '/static/index/header.png' : userInfo.avatar) +')'" -->
				<view class="avatar">
					<image :src="userInfo.avatar == '' ? '/static/index/header.png' : userInfo.avatar" mode="widthFix">
					</image>
				</view>

				<!-- 个人信息 -->
				<view class="grInfo">
					<view class="hang1">
						<view class="name">
							{{userInfo.nickName}}
						</view>
						<view class="vip" v-if="userInfo.roles[0].roleKey == 'vip'">
							<text class="iconfont icon-VIP"></text>VIP
						</view>
					</view>
					<view class="phone">
						{{userInfo.username}}
					</view>
				</view>
			</view>

		</view>

		<view class="threeItem">
			<view class="item" v-for="(item, index) in threeItemList" :key="index" @click="itemUrlClick(item.url)">
				<view class="itemImg">
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>

		<!-- 导航选项-->
		<view class="objTwoItem">
			<view class="item" v-for="(item, index) in objOne" :key="index"  @click="itemUrlClick(item.url)">
				<view class="img">
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>


		<view class="objTwoItem">
			<view class="item" v-for="(item, index) in objTwo" :key="index" @click="itemUrlClick(item.url)">
				<view class="img">
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
		
		<view class="tuichu">
			<van-button type="danger" size="large" @click="tuichuClick()">退出登录</van-button>
		</view>
		
		<uni-popup ref="pick" type="dialog">
			<uni-popup-dialog type="input" title="确定退出" message="确定退出:" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		// onLoad() {
		// 	this.userInfo = uni.getStorageSync("userInfo");
		// },
		onShow() {
			this.userInfo = uni.getStorageSync("userInfo");
		},
		data() {
			return {
				userInfo: {},

				threeItemList: [{
						name: '匹配历史',
						img: '/static/index/three1.png',
						url: '/myPackageA/pages/grzx_ppls/grzx_ppls'
					},
					{
						name: '我的订阅',
						img: '/static/index/three2.png',
						url: '/myPackageA/pages/grzx_wddy/grzx_wddy'
					},
					{
						name: '我的资料',
						img: '/static/index/three3.png',
						url: '/myPackageA/pages/grzx_wdzl/grzx_wdzl'
					},
				],

				objOne: [{
						name: '会员订单',
						img: '/static/index/grzxIcon/one1.png',
						url:'/myPackageA/pages/grzx_hydd/grzx_hydd'
					},
					// {
					// 	name: '评测报告',
					// 	img: '/static/index/grzxIcon/one2.png',
					// 	url:'/myPackageA/grzx_pcbg/grzx_pcbg'
					// },
				],


				objTwo: [{
						name: '我的客服',
						img: '/static/index/grzxIcon/two1.png',
						url: '/myPackageA/pages/grzx_kf/grzx_kf'
					},
					{
						name: '我的消息',
						img: '/static/index/grzxIcon/two2.png',
						url: '/myPackageA/pages/grzx_info/grzx_info'
					},
					{
						name: '常见问题',
						img: '/static/index/grzxIcon/two3.png',
						url: '/myPackageA/pages/grzx_cjwt/grzx_cjwt'
					},
					{
						name: '意见反馈',
						img: '/static/index/grzxIcon/two4.png',
						url: '/myPackageA/pages/grzx_yjfk/grzx_yjfk'
					},
					{
						name: '关于我们',
						img: '/static/index/grzxIcon/two5.png',
						url: '/myPackageA/pages/grzx_about/grzx_about'
					},
				],
			}
		},
		methods: {
			// 个人信息
			grxxClick() {
				uni.navigateTo({
					url: '/myPackageA/pages/grzx_grxx/grzx_grxx'
				})
			},
			// 选项单击跳转
			itemUrlClick(url){
				// if(url == 'xxx'){
				// 	uni.showToast({
				// 		icon:'error',
				// 		title:'正在开发中。。。'
				// 	})
				// }
				uni.navigateTo({
					url:url
				})
			},
			tuichuClick(){
				this.$refs.pick.open() 
				
			},
			close(){
				this.$refs.pick.close()
			},
			confirm(){
				uni.removeStorageSync("token");
				uni.removeStorageSync("userInfo");
				uni.reLaunch({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="less">
	.grzx {
		background-color: #F7F8FA;
	}

	.grzxTop {
		width: 100%;
		height: 250rpx;
		background-image: url('../../static/index/grzx_top.png');
		background-size: 100% 100%;
		overflow: hidden;
		position: relative;
		background-color: #FFFFFF;

		.bigYuan {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			background-color: rgba(134, 218, 254, 0.2);
			position: absolute;
			right: -60rpx;
			top: 30rpx;
		}

		.smallYuan {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-color: rgba(134, 218, 254, 0.2);
			position: absolute;
			bottom: 0;
			right: calc(50% - 30rpx);

		}

		.infoBox {
			width: 500rpx;
			height: 150rpx;
			margin-top: 50rpx;
			display: flex;
			align-items: center;

			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-left: 40rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.grInfo {
				flex: 1;
				padding-left: 30rpx;
				color: #FFFFFF;

				.hang1 {
					display: flex;
					align-items: center;

					.vip {
						width: 60rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 5rpx;
						background-color: #3F434E;
						color: #F8D264;
						font-size: 20rpx;
						text-align: center;
						margin-left: 10rpx;
						border-radius: 30rpx;

						text {
							font-size: 25rpx;
						}
					}
				}

				.phone {
					margin-top: 20rpx;
					font-size: 25rpx;
				}
			}
		}

	}

	.threeItem {
		width: 750rpx;
		height: 140rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		padding-top: 30rpx;
		font-size: 28rpx;

		.item {
			width: 180rpx;
			text-align: center;

			.itemImg {
				width: 70rpx;
				margin: auto;

				// height: 80rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.objTwoItem {
		background-color: #FFFFFF;
		width: 650rpx;
		margin-top: 25rpx;
		padding: 20rpx 50rpx;

		.item {
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #EDEDED;
			position: relative;
			color: #5b5b5b;
			margin: 10rpx 0;

			.img {
				width: 40rpx;
				height: 65rpx;
				margin: 0 10rpx 0 40rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				font-size: 26rpx;
			}

			&:after {
				content: '\e71a';
				font-family: 'iconfont';
				font-size: 25rpx;
				width: 12rpx;
				height: 12rpx;
				position: absolute;
				right: 60rpx;
				top: 0rpx;
			}
		}
	}


.tuichu{
	width: 400rpx;
	margin: 20rpx auto;
	van-button{
		width: 500rpx;
	}
	.van-button--large{
		height: 80rpx !important;
		font-size: 24rpx !important;
	}
}
	
</style>
