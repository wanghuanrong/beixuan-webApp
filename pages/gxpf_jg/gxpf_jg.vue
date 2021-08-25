<template>
	<view class="gxpf_jg">
		<!-- 高新评分结果 -->
		<view class="top">
			{{ datalist.evaluate }}
		</view>

		<view class="totalPf">
			{{ datalist.totalScore }}分
		</view>

		<view class="fuerPf">
			<view class="cw">
				<view class="fs">
					{{datalist.growthScore}}分
				</view>
				<view class="title">
					财务成长性（满分30分）
				</view>
			</view>
			<view class="cw">
				<view class="fs">
					{{datalist.cooperationScore}}分
				</view>
				<view class="title">
					管理水平（满分30分）
				</view>
			</view>
			<view class="cw">
				<view class="fs">
					{{datalist.propertyRightScore}}分
				</view>
				<view class="title">
					知识产权（满分20分）
				</view>
			</view>
			<view class="cw">
				<view class="fs">
					{{datalist.abilityScore}}分
				</view>
				<view class="title">
					成果转化（满分20分）
				</view>
			</view>
		</view>

		<!-- 评测报告 -->
		<view class="pgbgTitle">
			评测报告
		</view>

		<view class="pgbgItem">
			<view class="title">
				一、企业成立时间
			</view>
			<view class="content">
				{{ datalist.one }}
			</view>
		</view>
		<view class="pgbgItem">
			<view class="title">
				二、企业技术领域
			</view>
			<view class="content">
				{{ datalist.one }}
			</view>
		</view>
		<view class="pgbgItem">
			<view class="title">
				三、核心自主知识产权
			</view>
			<view class="content">
				{{ datalist.one }}
			</view>
		</view>
		<view class="pgbgItem">
			<view class="title">
				四、科技人员数量
			</view>
			<view class="content">
				{{ datalist.one }}
			</view>
		</view>
		<view class="pgbgItem">
			<view class="title">
				五、财务增长性
			</view>
			<view class="content">
				<p>{{ datalist.five_one }}</p>
				<p>{{ datalist.five_two }}</p>
				<p>{{ datalist.five_three }}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.datalist = uni.getStorageSync('gxpfData');
		},
		data() {
			return {
				datalist: '',
			};
		}
	}
</script>

<style lang="less">
	.gxpf_jg{
		padding: 30rpx;
		font-size: 28rpx;
	}
	
	.top{
		width: 500rpx;
		color: #256BFF;
		font-size: 30rpx;
		text-align: center;
		margin: auto;
	}
	
	.totalPf{
		width: 300rpx;
		height: 300rpx;
		margin: 30rpx auto;
		background-image: url('../../static/index/gxpfY.png');
		background-size: 100% 100%;
		line-height: 300rpx;
		text-align: center;
		font-size: 50rpx;
		color: #256BFF;
	}
	
	.fuerPf{
		width: 680rpx;
		margin: auto;
		display: flex;
		flex-wrap: wrap;
		
		.cw{
			width: 340rpx;
			margin-top: 30rpx;
			.fs{
				padding-left: 80rpx;
				font-size: 35rpx;
				color: #333333;
				font-weight: 600;
			}
			.title{
				margin-top: 6rpx;
				padding-left: 80rpx;
				color: #666666;
				font-size: 22rpx;
				position: relative;
				&::after{
					content: '';
					width: 12rpx;
					height: 12rpx;
					border-radius: 50%;
					background-color: #F6C537;
					position: absolute;
					top: 10rpx;
					left: 50rpx;
				}
			}
		}
		
		.cw:nth-child(2) .title::after{
			background-color: #7484A1;
		}
		
		.cw:nth-child(3) .title::after{
			background-color: #729EF9;
		}
		
		.cw:nth-child(4) .title::after{
			background-color: #71DCB2;
		}
	}
	
	.pgbgTitle{
		font-size: 32rpx;
		padding-left: 30rpx;
		margin-top: 60rpx;
		position: relative;
		&::after{
			content: "";
			width: 6rpx;
			height: 24rpx;
			background-color: #256BFF;
			position: absolute;
			left: 10rpx;
			top: 12rpx;
		}
	}
	
	.pgbgItem{
		margin-top: 30rpx;
		.title{
			color: #333333;
		}
		.content{
			font-size: 24rpx;
			margin-top: 10rpx;
			line-height: 40rpx;
			color: #666666;
		}
	}
</style>
