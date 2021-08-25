<template>
	<view class="grzx_wdzl">
		<!-- 我的资料 -->
		<view class="zcpp2Main">
			<!-- 模块一：输入框 -->
			<view class="inputTextBox">
				<view class="textItem" v-for="(item, index) in inputGroup[0]" :key="index">
					<view class="title">
						{{ item.head }}{{ item.title }}{{ item.subTitle }}:
					</view>
					<view class="inputText">
						<input v-model="item.fillValue" disabled />
					</view>
					<view class="dw">
						<text> {{ item.unit }}</text>
					</view>
				</view>
			</view>

			<!-- 模块二:区间输入框 -->
			<view class="inputTextBox">
				<view class="textItem" v-for="(item, index) in inputGroup[1]" :key="index">
					<view class="title">
						{{ item.head }}{{ item.title }}{{ item.subTitle }}:
					</view>
					<view class="inputText">
						<input v-model="item.fillValue" disabled />
					</view>
					<view class="dw">
						<text> {{ item.unit }}</text>
					</view>
				</view>
			</view>

			<!-- 模块三：单选框 -->
			<!-- 单选框没有实例调试，很有可能有问题！ -->
			<view class="checkBigBox">
				<view class="radioItem" v-for="(item, index) in inputGroup[2]" :key="index">
					<text class="ts">{{ item.head }}{{ item.title }}{{ item.subTitle }}(单选):</text>

					<radio-group>
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item2, index2) in item.options1"
							:key="index2">
							<view>
								<radio disabled :value="item2"  :checked="item.fillValue.indexOf(item2) != -1" />{{item2}}
							</view>
						</label>
					</radio-group>
				</view>
			</view>

			<!-- 模块四:多选框 -->
			<view class="checkBigBox">
				<view class="checkboxItem" v-for="(item, index) in inputGroup[3]" :key="index">
					<text class="ts">{{ item.head }}{{ item.title }}{{ item.subTitle }}(多选):</text>
					<checkbox-group>
						<view class="gouItem" v-for="(item2, index2) in item.options1" :key="index2">
							<label>
								<checkbox disabled color="#DA5B57" :checked="item.fillValue.indexOf(item2) != -1" :value="item2" />{{item2}}
							</label>
						</view>
					</checkbox-group>
				</view>
			</view>

			<!-- 模块五：勾选框 -->
			<view class="checkBigBox">
				<view class="checkboxItem" v-for="(item, index) in inputGroup[4]" :key="index">
					<text class="ts">{{ item.head }}{{ item.title }}{{ item.subTitle }}(勾选):</text>
					<checkbox-group>
						<label>
							<checkbox disabled color="#DA5B57" :checked="item.fillValue == 'Y'" value="Y" />是
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.hxInfoFun();
		},
		data() {
			return {
				inputGroup: [],
			};
		},
		methods: {
			async hxInfoFun() {
				let {
					data: res
				} = await this.$request({
					method: 'get',
					url: '/unit/information',
				})

				console.log(res);

				if (res.code != 200 || res.data.length == 0) {
					return;
				}

				// 处理数据
				this.inputGroup = [];
				for (let i = 0; i < 5; i++) {
					this.inputGroup.push([]);
				}
				// 把5种类型分类
				for (let item of res.data) {
					if (item.type == 0) {
						this.inputGroup[0].push(item);
					} else if (item.type == 1) {
						this.inputGroup[1].push(item);
					} else if (item.type == 2) {
						this.inputGroup[2].push(item);
					} else if (item.type == 3) {
						this.inputGroup[3].push(item);
					} else if (item.type == 4) {
						this.inputGroup[4].push(item);
					}
				}

				// 处理多选框，把字符串分割为数组
				for (let item of this.inputGroup[3]) {
					item.options1 = item.options.split("|");
					item.fillValue1 = [];
					if (item.fillValue.indexOf("|") != -1) {
						item.fillValue1 = item.fillValue.split("|");
					} else {
						item.fillValue1.push(item.fillValue);
					}
				}

				// 处理勾选框，把字符串分割为数组
				for (let item of this.inputGroup[3]) {
					item.options1 = item.options.split("|");
					item.fillValue1 = [];
					if (item.fillValue.indexOf("|") != -1) {
						item.fillValue1 = item.fillValue.split("|");
					} else {
						item.fillValue1.push(item.fillValue);
					}
				}

				// 处理单选框，把字符串分割为数组
				for (let item of this.inputGroup[2]) {
					item.options1 = item.options.split("/");
					item.fillValue1 = [];
					if (item.fillValue.indexOf("/") != -1) {
						item.fillValue1 = item.fillValue.split("/");
					} else {
						item.fillValue1 = [];
						item.fillValue1.push(item.fillValue);
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.grzx_wdzl {
		padding: 30rpx;
	}

	.submitBox {
		width: 400rpx;
		margin: 30rpx auto;
	}

	.zcpp2Main {
		font-size: 26rpx;

		>view {
			margin-top: 30rpx;
		}
	}

	.inputTextBox {
		.textItem{
			padding: 10rpx 0;
			border-bottom: 2rpx solid #EDEDED;
			display: flex;
			align-items: center;
			.title{
				// height: 50rpx;
				line-height: 70rpx;
				font-weight: 600;
				flex: 1;
				width: 0;
			}
			.inputText{
				width: 300rpx;
				input{
					// border-bottom: 2rpx solid #666666;
				}
			}
			.dw{
				width: 80rpx;
			}
		}
	}

	.checkBigBox {
		.checkboxItem {
			padding: 10rpx 0;
			border-bottom: 2rpx solid #EDEDED;

			.ts {
				height: 50rpx;
				line-height: 50rpx;
				font-weight: 600;
			}
		}
	}
	
	.checkbox .wx-checkbox-input-disabled {
			border-radius: 30upx;
			/* 圆角 */
			width: 30upx;
			/* 背景的宽 */
			height: 30upx;
			/* 背景的高 */
			background: #f37f0b;
			border: 1px solid rgba(201, 201, 201, 1);
		}
</style>
