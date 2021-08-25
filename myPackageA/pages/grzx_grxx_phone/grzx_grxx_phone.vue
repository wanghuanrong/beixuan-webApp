<template>
	<view class="grzx_grxx_phone">
		<!-- 更换手机号 -->
		<view class="oldPhone">
			您要修改的手机号码为：{{username}}
		</view>
		<view class="loginInput">
			<view class="login">
				<!-- 联系方式 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-shouji"></text>
					</view>
					<view class="input">
						<input type="text" v-model="phone" placeholder="请输入新的联系方式" />
					</view>
				</view>
				<!-- 验证码 -->
				<view class="inputBox">
					<view class="icon">
						<text class="iconfont icon-yanzhengma"></text>
					</view>
					<view class="input">
						<input type="text" v-model="code" placeholder="请输入验证码" />
					</view>
		
					<view :class="{ codeBtnTime: !yzmIs, codeBtn: yzmIs }" @click="yzmIs && yzmClick()">
						<span v-if="yzmIs">获取验证码</span>
						<span v-else>{{ yzmCountdown }}后重新获取</span>
					</view>
				</view>
			</view>
		
			<view class="button">
				<van-button round block type="info" @click="submit">保存</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	const regphone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
	export default {
		onLoad() {
			this.username = uni.getStorageSync('userInfo').username;
		},
		data() {
			return {
				username: '',
				code: '',
				phone: '',
				
				// 验证码
				yzmCountdown: 60,
				yzmIs: true,
			};
		},
		methods:{
			async yzmClick() {
				let {
					data: res
				} = await this.$request({
					method: 'get',
					url: '/getPhoneMsg',
					data: {
						codeType: 9,
						username: this.username
					}
				})
			
				console.log(res);
			
				if (res.code != 200) {
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
			async submit(){
				let phoneIs = regphone.test(this.username);
				if(!phoneIs){
					uni.showToast({
						icon:'error',
						title: '手机号有误!'
					})
					return;
				}
				
				let {data:res} = await this.$request({
					url:'/edit/phone?code=' + this.code + '&phone=' + this.phone,
					method:'put',
					// data:{
					// 	code: this.code,
					// 	phone:this.phone,
					// }
				})
				
				console.log(res);
				if (res.code != 200) {
					uni.showToast({
						icon: 'error',
						title: '修改失败'
					})
					return;
				}
				uni.showToast({
					title: '修改成功'
				})
				
				this.getUersInfo();
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
				
				uni.reLaunch({
					url:'../login/login'
				})
			},
		}
	}
</script>

<style lang="less">
	.oldPhone{
		color: #333333;
		text-align: center;
		line-height: 100rpx;
		height: 100rpx;
	}
.loginInput {
		width: 550rpx;
		margin: auto;

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
	
	.button {
		width: 400rpx;
		margin: 40rpx auto;
	}
</style>
