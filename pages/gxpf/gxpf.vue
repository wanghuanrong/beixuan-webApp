<template>
	<view class="gxpf">
		<!-- 高新评分 -->
		<view class="gxpfMain">
			<view class="modeltitle">
				基本信息
			</view>
			<uni-forms ref="form1" :modelValue="form" :rules="rules" label-width="130" label-align="right">
				<uni-forms-item label="公司名称" required name="companyName">
					<uni-easyinput type="text" v-model="form.companyName" placeholder="请输入公司名称" />
				</uni-forms-item>
				<uni-forms-item label="成立时间" required name="registerTime">
					<uni-datetime-picker timestamp type="date" v-model="form.registerTime">
					</uni-datetime-picker>
				</uni-forms-item>
				<uni-forms-item label="技术领域" required name="technicalField">
					<uni-easyinput type="text" v-model="form.technicalField" placeholder="请选择领域"
						@focus="lyInputClick()" />
				</uni-forms-item>
				<uni-forms-item label="技术行业" required name="industry">
					<uni-easyinput type="text" v-model="form.industry" placeholder="请选择行业" @focus="hyInputClick()" />
				</uni-forms-item>
			</uni-forms>

			<uni-forms ref="form2" :modelValue="form" :rules="rules" label-width="350" labelPosition="top">
				<uni-forms-item label="近两年是否有行政处罚(消防、安监、环保)" required name="punish">
					<uni-data-checkbox v-model="form.punish" :localdata="punishList" />
				</uni-forms-item>
			</uni-forms>

			<view class="selectBox" v-if="selectIs">
				<van-picker title="领域" show-toolbar :columns="subjectNameList" @confirm="onConfirm" @cancel="onCancel"
					@change="onChange" />
			</view>

			<!-- 树形多选 -->
			<view class="treeSelectBox" v-if="ztShow">
				<view class="treeSelect">
					<view class="wcBottom">
						<view class="title">
							行业
						</view>
						<view class="wc" @click="wcZtClick()">
							完成
						</view>
					</view>
					<van-tree-select :items="items" :active-id.sync="activeIds" :main-active-index.sync="activeIndex"
						@click-nav="onNavClick" @click-item='onitemclick' />
				</view>
			</view>



			<view class="modeltitle">
				人力资源情况
			</view>
			<uni-forms ref="form3" :modelValue="form" :rules="rules" label-width="130" label-align="right">
				<uni-forms-item label="职工人数" required name="workersNumber">
					<uni-easyinput type="text" v-model="form.workersNumber" placeholder="请输入职工人数" />
				</uni-forms-item>
				<uni-forms-item label="科技人员数量" required name="researchNumber">
					<uni-easyinput type="text" v-model="form.researchNumber" placeholder="请输入科技人员数量" />
				</uni-forms-item>
				<uni-forms-item label="本科及以上数量" required name="collegeNumber">
					<uni-easyinput type="text" v-model="form.collegeNumber" placeholder="请输入人数" />
				</uni-forms-item>
			</uni-forms>

			<view class="modeltitle">
				知识产权
			</view>
			<uni-forms ref="form4" :modelValue="form" label-width="350" labelPosition="top">
				<uni-forms-item label="技术的先进程度" name="degree">
					<uni-data-checkbox v-model="form.degree" :localdata="degreeList" />
				</uni-forms-item>
				<uni-forms-item label="对主要产品（服务）在技术上发挥核心支持作用" name="effect">
					<uni-data-checkbox v-model="form.effect" :localdata="effectList" />
				</uni-forms-item>
				<uni-forms-item label="知识产权数量" name="rightOne">
					<uni-data-checkbox v-model="form.rightOne" :localdata="rightOneList" />
				</uni-forms-item>
				<uni-forms-item label="产权获得方式" name="getway">
					<uni-data-checkbox v-model="form.getway" :localdata="getwayList" />
				</uni-forms-item>
				<uni-forms-item label="企业参与编制国家标准、行业标准、检测方法、技术规范" name="standard">
					<uni-data-checkbox v-model="form.standard" :localdata="standardList" />
				</uni-forms-item>

				<view class="modeltitle">
					成果转换能力
				</view>

				<uni-forms-item label="科技成果转换能力" name="ability">
					<uni-data-checkbox v-model="form.ability" :localdata="abilityList" />
				</uni-forms-item>

				<view class="modeltitle">
					组织管理水平
				</view>

				<uni-forms-item label="是否开展产学研合作" name="cooperation">
					<uni-data-checkbox v-model="form.cooperation" :localdata="cooperationList" />
				</uni-forms-item>
			</uni-forms>

			<view class="modeltitle">
				近三年财务
			</view>

			<view class="yearTitle">
				净资产（万元）
			</view>
			<uni-forms ref="form5" :modelValue="form2[0]" :rules="rules" label-width="80" label-align="right">
				<uni-forms-item label="2018年" required name="netAssets8">
					<uni-easyinput type="text" v-model="form2[0].netAssets8" placeholder="请输入净资产" />
				</uni-forms-item>
				<uni-forms-item label="2019年" required name="netAssets9">
					<uni-easyinput type="text" v-model="form2[0].netAssets9" placeholder="请输入净资产" />
				</uni-forms-item>
				<uni-forms-item label="2020年" required name="netAssets0">
					<uni-easyinput type="text" v-model="form2[0].netAssets0" placeholder="请输入净资产" />
				</uni-forms-item>
			</uni-forms>
			<view class="yearTitle">
				销售收入（万元）
			</view>
			<uni-forms ref="form6" :modelValue="form2[1]" :rules="rules" label-width="80" label-align="right">
				<uni-forms-item label="2018年" required name="salesRevenue8">
					<uni-easyinput type="text" v-model="form2[1].salesRevenue8" placeholder="请输入销售收入" />
				</uni-forms-item>
				<uni-forms-item label="2019年" required name="salesRevenue9">
					<uni-easyinput type="text" v-model="form2[1].salesRevenue9" placeholder="请输入销售收入" />
				</uni-forms-item>
				<uni-forms-item label="2020年" required name="salesRevenue0">
					<uni-easyinput type="text" v-model="form2[1].salesRevenue0" placeholder="请输入销售收入" />
				</uni-forms-item>
			</uni-forms>

			<view class="yearTitle">
				研发费用（万元）
			</view>
			<uni-forms ref="form7" :modelValue="form2[2]" :rules="rules" label-width="80" label-align="right">
				<uni-forms-item label="2018年" required name="researchExpenses8">
					<uni-easyinput type="text" v-model="form2[2].researchExpenses8" placeholder="请输入研发费用" />
				</uni-forms-item>
				<uni-forms-item label="2019年" required name="researchExpenses9">
					<uni-easyinput type="text" v-model="form2[2].researchExpenses9" placeholder="请输入研发费用" />
				</uni-forms-item>
				<uni-forms-item label="2020年" required name="researchExpenses0">
					<uni-easyinput type="text" v-model="form2[2].researchExpenses0" placeholder="请输入研发费用" />
				</uni-forms-item>
			</uni-forms>
		</view>

		<view class="submitBox">
			<van-button round block type="info" @click="zcppClick()">提交</van-button>
		</view>
	</view>
</template>

<script>
	import {
		datalist
	} from '@/wxcomponents/js/zdJson.js';
	export default {
		onLoad() {
			for (let item of datalist) {
				this.subjectNameList.push(item.label);
			}
			this.getitemsFun();

			// 回显数据
			this.getAdmin();
		},
		data() {
			return {
				form: {
					companyName: '',
					registerTime: '',
					technicalField: '电子信息',

					// 行业 总和
					industry: '',
					industryOne: '',
					industryTwo: '',

					punish: '0',

					// 人力资源情况
					workersNumber: '0',
					researchNumber: '0',
					collegeNumber: '0',

					// 单选框
					degree: '',
					effect: '',
					rightOne: '',
					getway: '',
					standard: '',
					ability: '',
					cooperation: '',

					netAssets: [],
					salesRevenue: [],
					researchExpenses: [],
				},

				form2: [{
					netAssets8: '0',
					netAssets9: '0',
					netAssets0: '0',
				}, {
					salesRevenue8: '0',
					salesRevenue9: '0',
					salesRevenue0: '0',
				}, {
					researchExpenses8: '0',
					researchExpenses9: '0',
					researchExpenses0: '0',
				}],


				// 领域选择
				selectIs: false,
				subjectNameList: [],

				// 行业选择
				ztShow: false,
				items: [],
				activeIds: '',
				activeIndex: 0,


				rules: {
					registerTime: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					companyName: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					registerTime: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					technicalField: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					industry: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					punish: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					workersNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					researchNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					collegeNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					netAssets8: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					netAssets9: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					netAssets0: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					salesRevenue8: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					salesRevenue9: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					salesRevenue0: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					researchExpenses8: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					researchExpenses9: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
					researchExpenses0: {
						rules: [{
							required: true,
							errorMessage: '不能为空',
						}]
					},
				},

				// 选择数据
				punishList: [{
					text: '否',
					value: 0
				}, {
					text: '是',
					value: 1
				}],

				degreeList: [{
					text: '高',
					value: 4,
				}, {
					text: '较高',
					value: 3,
				}, {
					text: '一般',
					value: 2,
				}, {
					text: '较低',
					value: 1,
				}, {
					text: '无',
					value: 0,
				}],


				effectList: [{
					text: '高',
					value: 4,
				}, {
					text: '较高',
					value: 3,
				}, {
					text: '一般',
					value: 2,
				}, {
					text: '较低',
					value: 1,
				}, {
					text: '无',
					value: 0,
				}],


				rightOneList: [{
					text: '1项及以上（I类）',
					value: 4,
				}, {
					text: '5项及以上（II类）',
					value: 3,
				}, {
					text: '3-4项（II类）',
					value: 2,
				}, {
					text: '1-2项（II类）',
					value: 1,
				}, {
					text: '0项',
					value: 0,
				}],

				getwayList: [{
					text: '有自主研发',
					value: 1,
				}, {
					text: '仅有受让、受赠和并购等',
					value: 0,
				}],

				standardList: [{
					text: '是',
					value: 1,
				}, {
					text: '否',
					value: 0,
				}],

				abilityList: [{
					text: '转化能力强，≥5项',
					value: 5,
				}, {
					text: '转化能力较强，≥4项',
					value: 4,
				}, {
					text: '转化能力一般，≥3项',
					value: 3,
				}, {
					text: '转化能力较弱，≥2项',
					value: 2,
				}, {
					text: '转化能力弱，≥1项',
					value: 1,
				}, {
					text: '转化能力无，0项',
					value: 0,
				}],

				cooperationList: [{
					text: '是',
					value: 1,
				}, {
					text: '否',
					value: 0,
				}]
			}
		},
		methods: {
			// 回显数据
			async getAdmin() {
				let {
					data: res
				} = await this.$request({
					url: '/score/get',
					method: 'get'
				})

				console.log(res);
				
				if(res.code != 200){
					return;
				}
				
				res.data.registerTime = this.$date(res.data.registerTime).split(' ')[0];

				for (let item in res.data) {
					for (let item2 in this.form) {
						if (item == item2) {
							this.form[item2] = res.data[item];
						}
					}
				}
				
				// 给技术行业赋值，并赋值给对应的选框
				this.form.industry = this.form.industryOne + '/' + this.form.industryTwo;
				this.activeIds = this.form.industryTwo;
				
				// netAssets: [],
				// salesRevenue: [],
				// researchExpenses: [],
				let netAssetsSpilt = res.data.netAssets.split(',');
				let salesRevenueSpilt = res.data.salesRevenue.split(',');
				let researchExpensesSpilt = res.data.researchExpenses.split(',');
				
				for(let i = 0; i< this.form2.length; i++){
					for(let item2 in this.form2[i]){
						if(item2.indexOf('8') != -1){
							this.form2[i][item2] = netAssetsSpilt[0];
						}else if(item2.indexOf('9') != -1){
							this.form2[i][item2] = netAssetsSpilt[1];
						}else if(item2.indexOf('0') != -1){
							this.form2[i][item2] = netAssetsSpilt[2];
						}
						
					}
				}
				
			},
			// 领域
			lyInputClick() {
				uni.hideKeyboard()
				this.selectIs = true;
			},
			onConfirm(value, index) {
				console.log(value.detail.value)

				this.form.technicalField = value.detail.value;
				this.selectIs = false;

				// 重新获取行业选项
				this.getitemsFun();

				// 以此同时，需要清空行业选择
				this.form.industry = '';
				this.form.industryOne = '';
				this.form.industryTwo = '';
				this.activeIds = '';
			},
			onChange(picker, value, index) {},
			onCancel() {
				this.selectIs = false;
			},

			// 行业
			// 提取行业数据
			getitemsFun() {
				this.items = [];
				for (let item of datalist) {
					if (item.label == this.form.technicalField) {
						for (let item2 of item.children) {
							// 拼接第一级
							let itemsObj = {
								text: item2.value,
								id: item2.value,
								children: []
							}

							// 因为存在没有子选项的情况，如果没有,就将自己存入
							if (item2.children) {
								for (let item3 of item2.children) {
									// 拼接第二级
									itemsObj.children.push({
										text: item3.value,
										id: item3.value,
									})
								}
							} else {
								itemsObj.children.push({
									text: item2.value,
									id: item2.value,
								})
							}


							this.items.push(itemsObj)

						}
					}
				}
			},
			// 输入框聚焦，出现选择框
			hyInputClick() {
				uni.hideKeyboard()
				this.ztShow = true;
			},
			// 完成按钮
			wcZtClick() {
				this.ztShow = !this.ztShow;
			},
			// 左边第一级，点击事件
			onNavClick(val) {
				this.activeIndex = val.detail.index;
			},
			// 右边第二级点击事件
			onitemclick(val) {
				console.log(val);

				this.activeIds = val.detail.id;

				// 拼接第一级和第二级，显示

				// 因为存在没有子选项的情况，如果没有,就将自己存入,
				// 这里需要处理，如果第一级个第二级相同，就只给第一级赋值
				if (this.items[this.activeIndex].text == this.activeIds) {
					this.form.industry = this.items[this.activeIndex].text;
					this.form.industryOne = this.items[this.activeIndex].text;
				} else {
					this.form.industry = this.items[this.activeIndex].text + '/' + this.activeIds;
					this.form.industryOne = this.items[this.activeIndex].text;
					this.form.industryTwo = this.activeIds;
				}

			},

			async zcppClick() {
				// 一起验证
				try {
					await Promise.all([
						this.$refs.form1.validate(),
						this.$refs.form2.validate(),
						this.$refs.form3.validate(),
						this.$refs.form5.validate(),
						this.$refs.form6.validate(),
						this.$refs.form7.validate(),
					])
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: '填写有问题'
					})
					return;
				}

				// 把form中的值拼接起来
				for (let i = 0; i < this.form2.length; i++) {
					if (i == 0) {
						let netAssetsString = [];
						for (let item2 in this.form2[0]) {
							netAssetsString.push(this.form2[i][item2]);
						}
						this.form.netAssets = netAssetsString.toString();
					} else if (i == 1) {
						let salesRevenueString = [];
						for (let item2 in this.form2[1]) {
							salesRevenueString.push(this.form2[i][item2]);
						}
						this.form.salesRevenue = salesRevenueString.toString();
					} else if (i == 2) {
						let researchExpensesString = [];
						for (let item2 in this.form2[2]) {
							researchExpensesString.push(this.form2[i][item2]);
						}
						this.form.researchExpenses = researchExpensesString.toString();
					}
				}

				console.log(this.form)
				let {
					data: res
				} = await this.$request({
					method: 'POST',
					url: '/score/match',
					data: this.form
				})

				console.log(res);
				
				if(res.code != 200){
					uni.showToast({
						icon: 'error',
						title: '提交出错'
					})
					return;
				}
				
				uni.setStorageSync('gxpfData', res.data);
				
				uni.navigateTo({
					url: '../gxpf_jg/gxpf_jg'
				})
			}
		}
	}
</script>

<style lang="less">
	.gxpf {
		padding: 30rpx;
	}

	.modeltitle {
		width: 250rpx;
		height: 60rpx;
		background-image: url('/static/index/titleImg.png');
		background-size: 100% 100%;
		color: #FFFFFF;
		font-size: 26rpx;
		text-align: center;
		line-height: 60rpx;
		margin: 20rpx 0 0 0;
	}

	.selectBox {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		z-index: 999;
	}

	.treeSelectBox {
		height: 100%;
		width: 750rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: rgba(94, 94, 94, 0.2);

		.treeSelect {
			width: 750rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: #FFFFFF;

			.wcBottom {
				text-align: center;
				font-weight: 900;
				position: relative;
				height: 60rpx;
				font-size: 28rpx;
				line-height: 60rpx;

				.wc {
					position: absolute;
					right: 30rpx;
					top: 0;
					font-size: 26rpx;
					color: #36bf42;
				}
			}
		}
	}

	.yearTitle {
		text-align: center;
		font-size: 30rpx;
		font-weight: 600;
		margin-top: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.submitBox {
		width: 400rpx;
		margin: 30rpx auto;
	}

	.uni-icons {
		display: none;
	}
</style>
