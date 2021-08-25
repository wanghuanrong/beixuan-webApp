<template>
	<view class="login">
		<!-- logo -->
		<view class="logo">

		</view>

		<!-- 欢迎 -->
		<view class="hyFont">您好，欢迎登录</view>

		<!-- 手机和密码 -->
		<view class="loginInput">
			<view class="login">
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-yonghu"></text>
					</view>
					<view class="input">
						<input type="text" v-model="username" placeholder="请输入手机号" />
					</view>
				</view>
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-mima"></text>
					</view>
					<view class="input">
						<input type="password" v-model="password" placeholder="请输入密码" />
					</view>
				</view>

				<view class="wjmm">
					<text @click="wjmmClick()">忘记密码</text>
				</view>

				<van-button round block type="info" @click="submit">登录</van-button>
			</view>

			<!-- 注册 -->
			<view class="register_n">
				还没有账号？<text class="regFont" @click="nReg()">免费注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: ""
			}
		},
		methods: {
			// 登录提交事件
			async submit() {
				console.log(this.username, this.password)
				let from = {
					username: this.username,
					password: this.$base64.encode(this.password)
				}
				console.log(from)
				let {
					data: res
				} = await this.$request({
					url: '/bxLogin',
					method: 'post',
					data: from,
					params: {
						autoLogin: true
					}
				})

				console.log(res)
				if (res.code != 200) {
					uni.showToast({
						icon: 'error',
						title: '登录失败',
						duration: 1000
					})
					return;
				}

				// Toast.success("登录成功");
				uni.showToast({
					icon: 'success',
					title: '登录成功',
					duration: 1000
				})

				uni.setStorageSync('token', res.token);

				this.getUersInfo();

				uni.switchTab({
					url: '../zccx/zccx'
				})
			},

			// 登录成功之后，获取个人信息，并保存到缓存中
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
			},

			// 跳转到注册页面
			nReg() {
				uni.navigateTo({
					url: '../register/register'
				})
			},

			// 忘记密码
			wjmmClick() {
				uni.navigateTo({
					url: '../zhPassword/zhPassword'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		height: 100%;
		background-color: #FFFFFF;
	}

	.logo {
		width: 200rpx;
		height: 100rpx;
		background-image: url('/static/b_logo.png');
		background-size: 100% 100%;
		margin: 100rpx auto;
	}

	.hyFont {
		text-align: center;
		font-size: 35rpx;
		color: #256BFF;
		font-weight: 600;
	}

	.loginInput {
		width: 550rpx;
		margin: 100rpx auto 50rpx;

		.login {
			.inputBox {
				margin-top: 20rpx;
				height: 60rpx;
				border-bottom: 2rpx solid #cccccc;
				display: flex;

				.icon {
					width: 60rpx;
					margin-top: 6rpx;

					text-align: center;
					color: #AAAAAA;

					text {
						font-size: 40rpx;
					}
				}

				.input {
					flex: 1;

					input {
						height: 100%;
						padding-left: 15rpx;
						font-size: 26rpx;
					}
				}
			}

			.wjmm {
				text-align: right;
				margin: 40rpx 0;
				color: #666666;
				font-size: 28rpx;
			}
		}
	}

	.register_n {
		margin-top: 50rpx;
		text-align: center;
		color: #999999;

		.regFont {
			color: #256BFF;
		}
	}
</style>
