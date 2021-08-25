<template>
	<view class="searchTop">
		<view class="searchBox">
			<view class="item" >
				<slot></slot>
			<!-- <view class="item" @click="selectItemClick()">{{selectItem}}<text class="iconfont icon-xia1"></text> -->
				<!-- <view class="selectItem" v-if="selectItemIs">
					<ul>
						<li v-for="(item,index) in itemList" :key="index" @click.stop="itemListClick(item)">{{item}}
						</li>
					</ul>
				</view> -->
			</view>
			<view class="input">
				<input type="text" v-model="inputVal" placeholder="请输入查询内容">
			</view>
			<view class="btn" @click="search()">
				<icon type="search" size="11" color="#ffffff"> </icon> 搜索
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectItemIs: false,
				// itemList: ['同行查询', '公示名单'],
				// selectItem: '同行查询',
				inputVal: ''
			}
		},
		methods: {
			// selectItemClick() {
			// 	this.selectItemIs = !this.selectItemIs;
			// },
			// itemListClick(val) {
			// 	this.selectItem = val;
			// 	this.selectItemIs = false;
			// },
			search() {
				this.$emit('search', this.inputVal);
			}
		},
		watch:{
		}
	}
</script>

<style lang="less" scoped>
	.searchTop {
		width: 750rpx;
		height: 75rpx;

		.searchBox {
			margin: auto;
			width: 90%;
			height: 100%;
			display: flex;
			border: 3rpx solid #256BFF;
			border-radius: 50rpx;

			.item {
				width: 180rpx;
				text-align: center;
				line-height: 75rpx;
				font-size: 26rpx;
				position: relative;

				&::after {
					content: "";
					height: 50rpx;
					width: 4rpx;
					background-color: #DDDDDD;
					position: absolute;
					top: 10rpx;
					right: 5rpx;
				}

				// 下拉选择框
				.selectItem {
					position: absolute;
					width: 160rpx;
					border: 2rpx solid #256BFF;
					top: 75rpx;
					right: 0;
					background-color: #FFFFFF;
				}
			}

			.input {
				flex: 1;

				input {
					width: 95%;
					height: 100%;
					padding-left: 10rpx;
					font-size: 25rpx;
				}
			}

			.btn {
				width: 160rpx;
				background-color: #256BFF;
				color: #FFFFFF;
				text-align: center;
				line-height: 75rpx;
				border-radius: 50rpx;
				font-size: 26rpx;
			}
		}
	}
</style>
