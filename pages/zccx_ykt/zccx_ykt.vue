<template>
	<view class="zccx_ykt">
		<!-- 云课堂 -->
		<view class="pcTs">
			此功能需要再PC端网站中试用
		</view>

		<!-- 图片 -->
		<view class="img">
			<image src="../../static/index/ykt.png" mode="widthFix"></image>
		</view>

		<!-- 文字 -->
		<view class="pBox">
			<view class="">
				1、服务是北京百家互联科技有限公司出品的在线教育产品，同多名老师合作为用户提供优质的在线学习课程，课程主要形式为在线直播，部分课程为录播，提供方式包括但不限于网页端、移动客户端或其他智能客户端等终端形式。
			</view>
			<view class="">
				2、提供的在线课程包括付费课程和免费课程。用户需注册跟谁学账号并支付费用后方可进行付费课程的学习及接受付款课程的相关服务。
			</view>
			<view class="">
				3、在线直播课程，用户需遵守直播课程的时间安排进行上课，因故错过在线直播时间的，用户需按照规定时间及时观看直播回放；请用户务必在规定时限内完整观看录播课程，因用户个人原因在规定时限内未完整观看录播课程，超过规定时限后无法继续观看的，由此导致的不利后果由用户自行承担；
			</view>
			<view class="">
				4、在线直播课程，已超过授课时间且老师已完成正常授课的课节，无论您是否上课均不可退费；但针对未到授课时间的课节，如果您基于个人原因无法按时上课，您可按照跟谁学的规则申请调课或申请退费。“调班及退费规则”详见跟谁学网站底部“常见问题”中关于退换课说明部分。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.zccx_ykt {
		padding: 30rpx 0;
	}

	.pcTs {
		color: #999999;
		text-align: center;
		font-size: 25rpx;
	}

	.img {
		width: 680rpx;
		margin: 30rpx auto;

		image {
			width: 100%;
		}
	}
	
	.pBox{
		width: 680rpx;
		color: #666666;
		margin: 30rpx auto;
		font-size: 25rpx;
		line-height: 50rpx;
		view{
			margin-top: 20rpx;
		}
	}
</style>
