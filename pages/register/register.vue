<template>
	<view class="register">
		<!-- logo -->
		<view class="logo">

		</view>

		<!-- 欢迎 -->
		<view class="hyFont">您好，欢迎注册</view>

		<!-- 注册信息 -->
		<view class="loginInput">
			<view class="login">
				<!-- 公司全称 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-gongsimingcheng"></text>
					</view>
					<view class="input">
						<input type="text" v-model="form.companyName" placeholder="请输入公司全称" />
					</view>
				</view>
				<!-- 邮箱 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-youxiang"></text>
					</view>
					<view class="input">
						<input type="text" v-model="form.email" placeholder="请输入邮箱" />
					</view>
				</view>

				<!-- 姓名 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-yonghu"></text>
					</view>
					<view class="input">
						<input type="text" v-model="form.nickName" placeholder="请输入姓名" />
					</view>
				</view>

				<!-- 职位 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-zhiwei"></text>
					</view>
					<view class="input">
						<input type="text" v-model="form.post" placeholder="请输入职位" />
					</view>
				</view>
				<!-- 联系方式 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-shouji"></text>
					</view>
					<view class="input">
						<input type="text" v-model="form.userName" placeholder="请输入联系方式" />
					</view>
				</view>
				<!-- 验证码 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-yanzhengma"></text>
					</view>
					<view class="input">
						<input type="text" v-model="form.code" placeholder="请输入验证码" />
					</view>

					<view :class="{ codeBtnTime: !yzmIs, codeBtn: yzmIs }" @click="yzmIs && yzmClick()">
						<span v-if="yzmIs">获取验证码</span>
						<span v-else>{{ yzmCountdown }}后重新获取</span>
					</view>
				</view>

				<view class="wjmm">
					<!-- <text @click="wjmmClick()">忘记密码</text> -->
				</view>

				<van-button round block type="info" @click="submit">立即注册</van-button>
			</view>

			<!-- 登录 -->
			<view class="register_n">
				已有账号？<text class="regFont" @click="nReg()">立即登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	const regphone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
	const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	
	export default {
		data() {
			return {
				form: {
					code: "",
					companyName: "",
					email: "",
					nickName: "",
					post: "",
					userName: "",
				},

				// 验证码
				yzmCountdown: 60,
				yzmIs: true,
			}
		},
		methods: {
			async yzmClick() {
				
				let phoneIs = regphone.test(this.form.userName);
				if(!phoneIs){
					uni.showToast({
						icon:'error',
						title: '手机号有误!'
					})
					
					return;
				}

				let {
					data: res
				} = await this.$request({
					method: 'get',
					url: '/getPhoneMsg',
					data: {
						codeType: 1,
						username: this.form.userName
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
			// 注册提交事件
			async submit() {
				
				if(!regEmail.test(this.form.email)){
					uni.showToast({
						icon:'error',
						title: '邮箱有误!'
					})
					return;
				}
				
				let clForm =
					`code=${this.form.code}&companyName=${this.form.companyName}&email=${this.form.email}&nickName=${this.form.nickName}&post=${this.form.post}&userName=${this.form.userName}`
				let {
					data: res
				} = await this.$request({
					method: 'post',
					url: '/register?' + clForm,
				})

				console.log(res);
				if(res.code != 200){
					uni.showToast({
						icon: 'error',
						title: res.msg
					})
					return;
				}
				
				uni.showToast({
					title: '注册成功！'
				})
				
				uni.navigateTo({
					url: '../login/login'
				})
			},

			// 跳转到注册页面
			nReg() {
				uni.navigateTo({
					url: '../login/login'
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

				.yzm {}
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
