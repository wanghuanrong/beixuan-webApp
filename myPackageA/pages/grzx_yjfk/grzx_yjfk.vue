<template>
	<view class="grzx_yjfk">
		<!-- 意见反馈 -->
		<view class="yjfkBox">
			<uni-forms ref="form" :modelValue="form" label-position="top" label-width="300">
				<uni-forms-item label="留言类型：">
					<uni-data-checkbox v-model="form.type" :localdata="types" />
				</uni-forms-item>
				<view class="hr">

				</view>
				<uni-forms-item label="留言内容" required>
					<textarea v-model="form.context"></textarea>
				</uni-forms-item>
			</uni-forms>
		</view>

		<view class="button">
			<van-button round block type="info" color="#6394FD" @click="chongzhiClick()">重置</van-button>
		</view>
		<view class="button">
			<van-button round block type="info" @click="submit">保存</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {

		},
		data() {
			return {
				form: {
					type: 1,
					context: '',
				},
				// 1:留言 2:功能问题 3:意见反馈
				types: [{
					text: '留言',
					value: 1
				}, {
					text: '功能问题',
					value: 2
				}, {
					text: '意见反馈',
					value: 3
				}]
			};
		},
		methods: {
			chongzhiClick() {
				this.form.type = 1;
				this.form.context = '';
			},
			async submit() {
				let {
					data: res
				} = await this.$request({
					url: '/leave/message?type=' + this.form.type + '&context=' + this.form.context,
					method: 'post'
				})

				console.log(res);
				if(res.code != 200){
					uni.showToast({
						icon:'error',
						title: '留言失败'
					})
					
					return;
				}
				
				uni.showToast({
					title: '留言成功'
				})
			}
		}

	}
</script>

<style lang="less">
	.grzx_yjfk {
		padding: 40rpx;
	}

	.hr {
		width: 100%;
		border-top: 2rpx solid #CCCCCC;
	}

	textarea {
		border: 2rpx solid #CCCCCC;
		padding: 10rpx;
	}

	.button {
		width: 400rpx;
		margin: 40rpx auto;
	}
</style>
