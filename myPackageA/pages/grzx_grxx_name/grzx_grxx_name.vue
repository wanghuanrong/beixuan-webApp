<template>
	<view class="grzx_grxx_name">
		<!-- 修改昵称 -->
		<view class="input">
			<input type="text" v-model="nickName" />
		</view>

		<view class="ts">
			英文字母或汉字、限4-10个字符、一个汉字为2个字符
		</view>

		<view class="button">
			<van-button round block type="info" @click="submit">保存</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.nickName = uni.getStorageSync('userInfo').nickName;
		},
		data() {
			return {
				nickName: '',
			};
		},
		methods: {
			async submit() {
				let {
					data: res
				} = await this.$request({
					url: '/edit/nickname?nickName=' + this.nickName,
					method: 'put',
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
					icon: 'success',
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
			},
		}
	}
</script>

<style lang="less">
	.grzx_grxx_name {
		padding: 30rpx;
	}

	input {
		width: 500rpx;
		border: 5rpx solid #717375;
		border-radius: 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 10rpx 0 10rpx 30rpx;
		margin: auto;
	}

	.ts {
		color: #999999;
		font-size: 24rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}

	.button {
		width: 400rpx;
		margin: 40rpx auto;
	}
</style>
