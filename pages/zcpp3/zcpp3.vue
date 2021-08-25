<template>
	<view class="zcpp3">
		<!-- 政策匹配第三步 -->
		<view class="zcpp3Main">
			<!-- 模块一：输入框 -->
			<view class="inputTextBox">
				<view class="textItem" v-for="(item, index) in inputGroup[0]" :key="index">
					<view class="title">
						{{ item.head }}{{ item.title }}{{ item.subTitle }}:
					</view>
					<view class="inputText">
						<input v-model="item.fillValue" />
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
						<input v-model="item.fillValue" />
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

					<radio-group @change="radioChange(index, $event)">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item2, index2) in item.options1"
							:key="index2">
							<view>
								<radio :value="item2" />{{item2}}
							</view>
						</label>
					</radio-group>
				</view>
			</view>

			<!-- 模块四:多选框 -->
			<view class="checkBigBox">
				<view class="checkboxItem" v-for="(item, index) in inputGroup[3]" :key="index">
					<text class="ts">{{ item.head }}{{ item.title }}{{ item.subTitle }}(多选):</text>
					<checkbox-group @change='checkboxChange(index, $event)'>
						<view class="gouItem" v-for="(item2, index2) in item.options1" :key="index2">
							<label>
								<checkbox color="#DA5B57" :value="item2" />{{item2}}
							</label>
						</view>
					</checkbox-group>
				</view>
			</view>

			<!-- 模块五：勾选框 -->
			<view class="checkBigBox">
				<view class="checkboxItem" v-for="(item, index) in inputGroup[4]" :key="index">
					<text class="ts">{{ item.head }}{{ item.title }}{{ item.subTitle }}(勾选):</text>
					<checkbox-group @change='gouChange(index, $event)'>
						<label>
							<checkbox color="#DA5B57" value="Y" />是
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>

		<view class="submitBox">
			<van-button round block type="info" @click="zcppClick()">下一步</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.templateList = JSON.parse(uni.getStorageSync('templateList'));
			// uni.removeStorageSync('templateList');

			this.clTempListFun();
		},
		data() {
			return {
				templateList: [],
				inputGroup: [],

			};
		},
		methods: {
			clTempListFun() {
				this.inputGroup = [];
				for (let i = 0; i < 5; i++) {
					this.inputGroup.push([]);
				}
				// 把5种类型分类
				for (let item of this.templateList) {
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
					item.fillValue = [];
				}

				// 处理单选框，把字符串分割为数组
				for (let item of this.inputGroup[2]) {
					item.options1 = item.options.split("/");
					item.fillValue = null;
				}
			},

			// 单选框选择事件
			radioChange(index, $event) {
				this.inputGroup[2][index].fillValue = $event.target.value.toString();
			},

			// 多选框选择事件
			checkboxChange(index, $event) {
				this.inputGroup[3][index].fillValue = $event.target.value.join("|");
			},

			// 勾选选择事件
			gouChange(index, $event) {
				this.inputGroup[4][index].fillValue = $event.target.value == "Y" ? "Y" : "N";
			},

			// 提交
			async zcppClick() {
				let subArr = [];
				for (let item of this.inputGroup) {
					if (item.length != 0) {
						for (let item2 of item) {
							subArr.push(JSON.parse(JSON.stringify(item2)));
						}
					}
				}

				// 处理数据
				for (let item3 of subArr) {
					if (item3.fillValue instanceof Array) {
						item3.fillValue = item3.fillValue.join("|");
					}

					if (item3.type == "4") {
						if (item3.fillValue) {
							item3.fillValue = "Y";
						} else {
							item3.fillValue = "N";
						}
					}

					if (item3.type == "0" || item3.type == "1") {
						if (item3.fillValue == null || item3.fillValue == "") {
							item3.fillValue = 0;
						}
					}
				}

				console.log(subArr);

				// 提交数据
				let {
					data: res
				} = await this.$request({
					method: 'post',
					url: '/match/nextStep',
					data: subArr
				})

				if (res.data.schemeSize == 0) {
					uni.showToast({
						icon: 'error',
						title: '未匹配到项目'
					})
				} else {
					//   通过接口得到批次号，并跳转到展示页面
					let {
						data: pcres
					} = await this.$request({
						method: 'post',
						url: '/match/generate',
					})

					uni.navigateTo({
						url: '../zcpp_zccx/zcpp_zccx?code=' + pcres.data
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.zcpp3{
		padding: 30rpx;
	}
	.submitBox {
		width: 400rpx;
		margin: 30rpx auto;
	}
	
	.zcpp3Main{
		font-size: 26rpx;
		>view{
			margin-top: 30rpx;
		}
	}
	
	.inputTextBox{
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
				width: 100rpx;
				input{
					border-bottom: 2rpx solid #666666;
				}
			}
			.dw{
				width: 80rpx;
			}
		}
	}
	
	.checkBigBox{
		.checkboxItem{
			padding: 10rpx 0;
			border-bottom: 2rpx solid #EDEDED;
			.ts{
				height: 50rpx;
				line-height: 50rpx;
				font-weight: 600;
			}
		}
	}
</style>
