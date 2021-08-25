<template>
	<view class="zhPassword">
		<!-- logo -->
		<view class="logo">

		</view>

		<!-- 注册信息 -->
		<view class="loginInput">
			<view class="login">
				<!-- 手机号 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-shouji"></text>
					</view>
					<view class="input">
						<input type="text" v-model="username" placeholder="请输入手机号" />
					</view>
				</view>

				<!--  -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-yanzhengma"></text>
					</view>
					<view class="input">
						<input type="text" v-model="yzm" placeholder="请输入验证码" />
					</view>

					<view :class="{ codeBtnTime: !yzmIs, codeBtn: yzmIs }" @click="yzmIs && yzmClick()">
						<span v-if="yzmIs">获取验证码</span>
						<span v-else>{{ yzmCountdown }}后重新获取</span>
					</view>
				</view>

				<!--  -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-mima"></text>
					</view>
					<view class="input">
						<input type="password" v-model="password" placeholder="请输入密码" />
					</view>
				</view>
				<!--  -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-querenmima"></text>
					</view>
					<view class="input">
						<input type="password" v-model="zcPassword" placeholder="请再次输入密码" />
					</view>
				</view>

				<view class="wjmm">
					<!-- <text @click="wjmmClick()">忘记密码</text> -->
				</view>

				<van-button round block type="info" @click="submit">确认</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
				zcPassword: "",
				yzm: "",

				// 验证码
				yzmCountdown: 60,
				yzmIs: true,
			}
		},
		methods: {
			async yzmClick() {

				let {
					data: res
				} = await this.$request({
					method: 'get',
					url: '/getPhoneMsg',
					data: {
						codeType: 4,
						username: this.username
					}
				})

				console.log(res);

				if (res.code != 200) {
					// this.$message.error("获取验证码失败！");
					uni.showToast({
						icon: 'error',
						title: '获取验证码失败!'
					})
					return;
				}
				// 发送验证码成功之后，显示倒计时
				this.yzmIs = false;
				let yzm = setInterval(() => {
					this.yzmCountdown--;
					if (this.yzmCountdown <= 0) {
						this.yzmCountdown = 60;
						this.yzmIs = true;
						clearInterval(yzm);
					}
				}, 1000);
			},
			// 登录提交事件
			async submit() {
				
				if(this.password != this.zcPassword){
					uni.showToast({
						icon: 'error',
						title: '两个密码不一致'
					})
				}
				
				let clData = `username=${this.username}&
						code=${this.yzm}&
						checkPassword=${this.$base64.encode(this.password)}&
						newPassword=${this.$base64.encode(this.zcPassword)}`
				let {
					data: res
				} = await this.$request({
					method: 'put',
					url: '/getPwdTwo?' + clData
				})
				
				console.log(res);
				
				if(res.code != 200){
					uni.showToast({
						icon:'error',
						title: res.msg
					})
					
					return;
				}
				
				uni.showToast({
					title:'重置密码成功！'
				})
				
				uni.navigateTo({
					url:'../login/login'
				})
			},
		}
	}
</script>

<style lang="less" scoped>
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

	// 验证码
	.codeBtn {
		line-height: 60rpx;
		color: #256BFF;
		font-size: 26rpx;
	}

	.codeBtnTime {
		line-height: 60rpx;
		color: #cccccc;
		text-align: center;
		font-size: 26rpx;
	}
</style>
