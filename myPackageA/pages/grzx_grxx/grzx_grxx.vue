<template>
	<view class="grzx_grxx">
		<!-- 个人中心 -->
		<view class="grzlMain">
			<view class="itemBox" @click="avatarClick()">
				<view class="title">
					头像
				</view>
				<view class="info">
					<view class="img">
						<image :src="userInfo.avatar" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="itemBox" @click="nameClick()">
				<view class="title">
					昵称
				</view>
				<view class="info">
					{{userInfo.nickName}}
				</view>
			</view>
			<view class="itemBox" @click="phoneClick()">
				<view class="title">
					手机号码
				</view>
				<view class="info">
					{{userInfo.username}}
				</view>
			</view>
			<view class="itemBox">
				<view class="title">
					会员等级
				</view>
				<view class="info">
					{{userInfo.roles[0].roleKey == 'vip' ? 'VIP会员' : '普通用户' }}
				</view>
			</view>
			<view class="itemBox">
				<view class="title1">
					公司名称
				</view>
				<view class="info1">
					{{userInfo.companyName}}
				</view>
				<view class="rzIcon1">
					<text class="iconfont icon-renzheng"></text>已认证
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// onLoad() {
		// 	this.userInfo = uni.getStorageSync('userInfo');
		// },
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
		},
		data() {
			return {
				userInfo: '',
			}
		},
		methods: {
			avatarClick() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: async (res) => {
						console.log(res);

						uni.uploadFile({
							url: this.$http + '/uploadAvatar',
							filePath: res.tempFilePaths[0], //图片地址
							name: 'avatarfile',
							header: {
								Authorization: uni.getStorageSync('token'), //加入token
							},
							success: (uploadFileRes) => {
								this.getUersInfo();
								
							}
						})

					}
				})
			},
			phoneClick() {
				uni.navigateTo({ 
					url: '../grzx_grxx_phone/grzx_grxx_phone'
				})
			},
			nameClick() {
				uni.navigateTo({
					url: '../grzx_grxx_name/grzx_grxx_name'
				})
			},
			async getUersInfo() {
				let {
					data: res
				} = await this.$request({
					url: '/bxGetWebInfo',
					method: 'get'
				})
			
				console.log(res);
				if (res.user.avatar != '') {
					res.user.avatar = this.$http + res.user.avatar;
				}
			
				uni.setStorageSync('userInfo', res.user);
				this.userInfo = uni.getStorageSync('userInfo');
				// uni.navigateBack()
			},
		}
	}
</script>

<style lang="less">
	.grzlMain {
		width: 670rpx;
		padding: 20rpx 40rpx;

		.itemBox {
			height: 60rpx;
			line-height: 60rpx;
			display: flex;
			justify-content: space-between;
			color: #5b5b5b;
			font-size: 28rpx;
			border-bottom: 2rpx solid #EDEDED;
			padding: 20rpx 0;
			position: relative;

			.title {}

			.info {
				padding-right: 50rpx;

				.img {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			&::after {
				content: '\e71a';
				font-family: 'iconfont';
				width: 12rpx;
				height: 12rpx;
				position: absolute;
				right: 20rpx;
				top: 20rpx;
			}

			&:last-child::after{
				content: '';
			}

			// 公司名称
			.title1 {
				width: 150rpx;
			}

			.info1 {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.rzIcon1 {
				width: 150rpx;
				color: #256BFF;
				text-align: right;
			}
		}

	}
</style>
