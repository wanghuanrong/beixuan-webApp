<template>
	<view class="grzx_about">
		<!-- 关于我们 -->
		<view class="img">
			<image src="../../static/index/xmfd.png" mode="widthFix"></image>
		</view>

		<view class="mainBox">
			<view class="title1">
				公司简介
			</view>
			<view class="content1">
				深圳市特兹信息技术有限公司成立于2018年，位于深圳市宝安区西乡街道华丰国际商务大厦4楼，目前已有员工12人，旗下品牌策千里saas系统聚焦政府产业专项资金申报和国家高新技术企业自助申报两大板块，功能涵盖了从政策查询、知识产权查询及管理、企业立项查询、精准匹配政策、产业资金规划、产业资金申报、智能推送、数据图谱等各模块。为企业、各园区管理单位提供专业的一站式数字化解决方案与政策服务，用大数据助力企业提升资金项目申报效率。
			</view>
		</view>

		<view class="mainBox">
			<view class="title1">
				企业理念
			</view>
			<view class="content1">
				公司秉承“坚持拼搏 因拼搏而生存”的理念，积极推动知识产权，高新产业申报行业发展。本着以“信任分享
				因信任而协作，”的经营理念。服务好客户的价值规范，倡导以绩效、市场为导向的专业协作及高效的企业精神，建立社会责任 回馈社会成就自我的准则。
			</view>
		</view>

		<view class="mainBox2">
			<view class="title">
				电话：
			</view>
			<view class="content">
				0755-27905047
			</view>
		</view>

		<view class="mainBox2">
			<view class="title">
				邮箱：
			</view>
			<view class="content">
				tezidata@163.com
			</view>
		</view>

		<view class="mainBox2">
			<view class="title">
				地址：
			</view>
			<view class="content">
				深圳市宝安区宝安大道4018号华丰国际商务大厦3A09-3A10
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
.img{
	width: 750rpx;
	image{
		width: 100%;
	}
}

.mainBox{
	padding: 30rpx;
	border-bottom: 2rpx dashed #EDEDED;
	.title1{
		color: #333333;
		line-height: 60rpx;
		height: 60rpx;
	}
	.content1{
		font-size: 25rpx;
		color: #666666;
		line-height: 50rpx;
	}
}

.mainBox2{
	padding: 30rpx;
	display: flex;
	color: #666666;
	font-size: 28rpx;
	display: flex;
	line-height: 60rpx;
	border-bottom: 2rpx dashed #EDEDED;
	.title{
		width: 100rpx;
	}
	.content{
		flex: 1;
	}
}
</style>
