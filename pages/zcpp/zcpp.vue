<template>
	<view class="zcpp">
		<!-- 政策匹配 -->

		<!-- 第一板块（基础信息） -->
		<view class="zcppModelOne">
			<view class="modeltitle">
				企业基本信息
			</view>
			<view class="mainBox">
				<uni-forms ref="form1" :modelValue="form1" :rules="rules" label-width="130" label-align="right">
					<uni-forms-item label="注册时间"  required name="registerTime">
						<uni-datetime-picker :disabled="disIs" type="date" timestamp v-model="form1.registerTime">
						</uni-datetime-picker>
					</uni-forms-item>
					<uni-forms-item label="注册地址" required name="registerAddress">
						<uni-easyinput type="text"  :disabled="disIs" v-model="form1.registerAddress" placeholder="请输入地址" />
					</uni-forms-item>
					<uni-forms-item label="注册资本(万元)" required name="registerCapi">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.registerCapi" placeholder="请输入注册资本" />
					</uni-forms-item>
					<uni-forms-item label="主体" required name="subjectId">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.subjectId" placeholder="请选择主体"
							@focus="ztInputClick()" />
					</uni-forms-item>
					<uni-forms-item label="行业" required name="categoryId">
						<uni-easyinput type="text" :disabled="disIs" readonly v-model="form1.categoryId" placeholder="请选择行业"
							@focus="hyInputClick()" />
					</uni-forms-item>
					<uni-forms-item label="分支机构数" required name="branchesNumber">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.branchesNumber" placeholder="输入分支机构数" />
					</uni-forms-item>
					<uni-forms-item label="职工人数" required name="workersNumber">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.workersNumber" placeholder="请输入职工人数" />
					</uni-forms-item>
					<uni-forms-item label="留学归国人数" required name="returneesNumber">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.returneesNumber" placeholder="请输入留学归国人数" />
					</uni-forms-item>
					<uni-forms-item label="硕士及以上人数" required name="masterNumber">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.masterNumber" placeholder="请输入硕士及以上人数" />
					</uni-forms-item>
					<uni-forms-item label="大专及以上人数" required name="collegeNumber">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.collegeNumber" placeholder="请输入大专及以上人数" />
					</uni-forms-item>
					<uni-forms-item label="研发/技术人数" required name="researchNumber">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.researchNumber" placeholder="请输入研发/技术人数" />
					</uni-forms-item>
					<uni-forms-item label="办公面积" required name="officeArea">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.officeArea" placeholder="请输入办公面积" />
					</uni-forms-item>
					<uni-forms-item label="购置办公用房面积" required name="purchasedArea">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.purchasedArea" placeholder="请输入购置办公用房面积" />
					</uni-forms-item>
					<uni-forms-item label="科研用房面积" required name="researchArea">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.researchArea" placeholder="请输入科研用房面积" />
					</uni-forms-item>
					<uni-forms-item label="经营面积" required name="businessArea">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.businessArea" placeholder="请输入经营面积" />
					</uni-forms-item>
					<uni-forms-item label="租赁办公用房面积" required name="rentalArea">
						<uni-easyinput type="text" :disabled="disIs" v-model="form1.rentalArea" placeholder="请输入租赁办公用房面积" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</view>

		<!--  -->
		<view class="selectBox" v-if="selectIs">
			<van-picker title="主体" show-toolbar :columns="subjectNameList" @confirm="onConfirm" @cancel="onCancel"
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




		<!-- 第二板块（荣誉资质） -->
		<view class="zcppModelTwo">
			<view class="modeltitle">
				荣誉资质
			</view>
			<view class="mainBox">
				<uni-forms ref="form2" :modelValue="form1" label-width="375" label-position="top">
					<uni-forms-item label="创新创业大赛获奖企业" name="honorOne">
						<uni-data-checkbox v-model="form1.honorOne" multiple :localdata="honorSelsctOne" />
					</uni-forms-item>
					<uni-forms-item label="承担或参与科技计划(专项）项目" name="honorTwo">
						<uni-data-checkbox v-model="form1.honorTwo" multiple :localdata="honorSelsctTwo" />
					</uni-forms-item>
					<uni-forms-item label="承担或参与科技奖励获奖项目" name="honorThree">
						<uni-data-checkbox v-model="form1.honorThree" multiple :localdata="honorSelsctThree" />
					</uni-forms-item>
					<uni-forms-item label="上市情况" name="honorFour">
						<uni-data-checkbox v-model="form1.honorFour" multiple :localdata="honorSelsctFour" />
					</uni-forms-item>
					<uni-forms-item label="企业异动" name="honorFive">
						<uni-data-checkbox v-model="form1.honorFive" multiple :localdata="honorSelsctFive" />
					</uni-forms-item>
					<uni-forms-item label="融资渠道" name="honorSix">
						<uni-data-checkbox v-model="form1.honorSix" multiple :localdata="honorSelsctSix" />
					</uni-forms-item>
					<uni-forms-item label="首次纳统年度" name="honorSeven">
						<uni-data-checkbox v-model="form1.honorSeven" :localdata="honorSelsctSeven" />
					</uni-forms-item>
					<uni-forms-item label="企业资质" name="honorEight">
						<uni-data-checkbox v-model="form1.honorEight" multiple :localdata="honorSelsctEight" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</view>

		<!-- 第三板块（财务资质） -->
		<view class="zcppModelThree">
			<view class="modeltitle">
				财务情况资质
			</view>
			<view class="mainBox">
				<view class="year2020">
					<view class="yearTitle">
						2020年（万元）
					</view>
					<view class="yearMain">
						<uni-forms ref="form30" :modelValue="form2[0]" :rules="rules" label-width="130"
							label-align="right">
							<uni-forms-item label="销售收入" required name="salesRevenue">
								<uni-easyinput type="text" v-model="form2[0].salesRevenue" placeholder="请输入销售收入" />
							</uni-forms-item>
							<uni-forms-item label="净利润" required name="netProfit">
								<uni-easyinput type="text" v-model="form2[0].netProfit" placeholder="请输入净利润" />
							</uni-forms-item>
							<uni-forms-item label="净资产" required name="netAssets">
								<uni-easyinput type="text" v-model="form2[0].netAssets" placeholder="请输入净资产" />
							</uni-forms-item>
							<uni-forms-item label="纳税额" required name="taxAmount">
								<uni-easyinput type="text" v-model="form2[0].taxAmount" placeholder="请输入纳税额" />
							</uni-forms-item>
							<uni-forms-item label="研发费用" required name="researchExpenses">
								<uni-easyinput type="text" v-model="form2[0].researchExpenses" placeholder="请输入研发费用" />
							</uni-forms-item>
							<uni-forms-item label="设备投入" required name="equipmentInvestment">
								<uni-easyinput type="text" v-model="form2[0].equipmentInvestment"
									placeholder="请输入设备投入" />
							</uni-forms-item>
							<uni-forms-item label="信息化软件投入" required name="softwareInvestment">
								<uni-easyinput type="text" v-model="form2[0].softwareInvestment"
									placeholder="请输入信息化软件投入" />
							</uni-forms-item>
							<uni-forms-item label="品牌推广费用" required name="promotionExpenses">
								<uni-easyinput type="text" v-model="form2[0].promotionExpenses"
									placeholder="请输入品牌推广费用" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</view>

				<view class="year2020">
					<view class="yearTitle">
						2019年（万元）
					</view>
					<view class="yearMain">
						<uni-forms ref="form31" :modelValue="form2[1]" :rules="rules" label-width="130"
							label-align="right">
							<uni-forms-item label="销售收入" required name="salesRevenue">
								<uni-easyinput type="text" v-model="form2[1].salesRevenue" placeholder="请输入销售收入" />
							</uni-forms-item>
							<uni-forms-item label="净利润" required name="netProfit">
								<uni-easyinput type="text" v-model="form2[1].netProfit" placeholder="请输入净利润" />
							</uni-forms-item>
							<uni-forms-item label="净资产" required name="netAssets">
								<uni-easyinput type="text" v-model="form2[1].netAssets" placeholder="请输入净资产" />
							</uni-forms-item>
							<uni-forms-item label="纳税额" required name="taxAmount">
								<uni-easyinput type="text" v-model="form2[1].taxAmount" placeholder="请输入纳税额" />
							</uni-forms-item>
							<uni-forms-item label="研发费用" required name="researchExpenses">
								<uni-easyinput type="text" v-model="form2[1].researchExpenses" placeholder="请输入研发费用" />
							</uni-forms-item>
							<uni-forms-item label="设备投入" required name="equipmentInvestment">
								<uni-easyinput type="text" v-model="form2[1].equipmentInvestment"
									placeholder="请输入设备投入" />
							</uni-forms-item>
							<uni-forms-item label="信息化软件投入" required name="softwareInvestment">
								<uni-easyinput type="text" v-model="form2[1].softwareInvestment"
									placeholder="请输入信息化软件投入" />
							</uni-forms-item>
							<uni-forms-item label="品牌推广费用" required name="promotionExpenses">
								<uni-easyinput type="text" v-model="form2[1].promotionExpenses"
									placeholder="请输入品牌推广费用" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</view>

				<view class="year2020">
					<view class="yearTitle">
						2018年（万元）
					</view>
					<view class="yearMain">
						<uni-forms ref="form32" :modelValue="form2[2]" :rules="rules" label-width="130"
							label-align="right">
							<uni-forms-item label="销售收入" required name="salesRevenue">
								<uni-easyinput type="text" v-model="form2[2].salesRevenue" placeholder="请输入销售收入" />
							</uni-forms-item>
							<uni-forms-item label="净利润" required name="netProfit">
								<uni-easyinput type="text" v-model="form2[2].netProfit" placeholder="请输入净利润" />
							</uni-forms-item>
							<uni-forms-item label="净资产" required name="netAssets">
								<uni-easyinput type="text" v-model="form2[2].netAssets" placeholder="请输入净资产" />
							</uni-forms-item>
							<uni-forms-item label="纳税额" required name="taxAmount">
								<uni-easyinput type="text" v-model="form2[2].taxAmount" placeholder="请输入纳税额" />
							</uni-forms-item>
							<uni-forms-item label="研发费用" required name="researchExpenses">
								<uni-easyinput type="text" v-model="form2[2].researchExpenses" placeholder="请输入研发费用" />
							</uni-forms-item>
							<uni-forms-item label="设备投入" required name="equipmentInvestment">
								<uni-easyinput type="text" v-model="form2[2].equipmentInvestment"
									placeholder="请输入设备投入" />
							</uni-forms-item>
							<uni-forms-item label="信息化软件投入" required name="softwareInvestment">
								<uni-easyinput type="text" v-model="form2[2].softwareInvestment"
									placeholder="请输入信息化软件投入" />
							</uni-forms-item>
							<uni-forms-item label="品牌推广费用" required name="promotionExpenses">
								<uni-easyinput type="text" v-model="form2[2].promotionExpenses"
									placeholder="请输入品牌推广费用" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</view>
			</view>
		</view>

		<!-- 第四板块（版权数量） -->
		<view class="zcppModelFour">
			<view class="modeltitle">
				知识产权情况
			</view>
			<view class="mainBox">
				<view class="mainItem">
					授权量（国内）
				</view>
				<view class="sqlItemgn">
					<uni-forms ref="form4" :modelValue="form3[0]" :rules="rules" label-width="130" label-align="right">
						<uni-forms-item label="发明专利" required name="inventionPatent">
							<uni-easyinput type="text" v-model="form3[0].inventionPatent" placeholder="请输入发明专利" />
						</uni-forms-item>
						<uni-forms-item label="实用新型专利" required name="utilityModel">
							<uni-easyinput type="text" v-model="form3[0].utilityModel" placeholder="请输入实用新型专利" />
						</uni-forms-item>
						<uni-forms-item label="外观设计专利" required name="appearance">
							<uni-easyinput type="text" v-model="form3[0].appearance" placeholder="请输入外观设计专利" />
						</uni-forms-item>
						<uni-forms-item label="集成电路布局专利" required name="circuitDiagram">
							<uni-easyinput type="text" v-model="form3[0].circuitDiagram" placeholder="请输入集成电路布局专利" />
						</uni-forms-item>
						<uni-forms-item label="计算机软件著作权" required name="softwareCopyright">
							<uni-easyinput type="text" v-model="form3[0].softwareCopyright" placeholder="请输入计算机软件著作权" />
						</uni-forms-item>
					</uni-forms>
				</view>
				<view class="mainItem">
					授权量（国外）
				</view>
				<view class="sqlItemgw">
					<uni-forms ref="form41" :modelValue="form3[1]" :rules="rules" label-width="130" label-align="right">
						<uni-forms-item label="发明专利" required name="inventionPatent">
							<uni-easyinput type="text" v-model="form3[1].inventionPatent" placeholder="请输入发明专利" />
						</uni-forms-item>
						<uni-forms-item label="实用新型专利" required name="utilityModel">
							<uni-easyinput type="text" v-model="form3[1].utilityModel" placeholder="请输入实用新型专利" />
						</uni-forms-item>
						<uni-forms-item label="外观设计专利" required name="appearance">
							<uni-easyinput type="text" v-model="form3[1].appearance" placeholder="请输入外观设计专利" />
						</uni-forms-item>
						<uni-forms-item label="集成电路布局专利" required name="circuitDiagram">
							<uni-easyinput type="text" v-model="form3[1].circuitDiagram" placeholder="请输入集成电路布局专利" />
						</uni-forms-item>
						<uni-forms-item label="计算机软件著作权" required name="softwareCopyright">
							<uni-easyinput type="text" v-model="form3[1].softwareCopyright" placeholder="请输入计算机软件著作权" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
		</view>

		<view class="submitBox">
			<van-button round block type="info" @click="zcppClick()">提交</van-button>
		</view>

	</view>
</template>

<script>
	export default {
		async onLoad() {
			// 获取 主体 和 行业 选择的数据
			// this.getsubject();
			// this.getcategory();

			// 当主体 和 行业 选择的数据之后,再回写数据
			await Promise.all([this.getsubject(), this.getcategory()]).then((res) => {
				// 回写数据
				this.getBusiness();
			})


		},
		data() {
			return {
				// 填写基本信息
				form1: {
					registerTime: '',
					registerAddress: '',
					registerCapi: '',
					subjectId: '',
					// 由于行业是使用TreeSelect选择工具，所以需要将数据绑定和选择的对象分开
					// 在数据选择和回写数据的时候，需要进行处理(主体也是一样)
					categoryId: '',
					branchesNumber: '0',
					workersNumber: '0',
					returneesNumber: '0',
					masterNumber: '0',
					collegeNumber: '0',
					researchNumber: '0',
					officeArea: '0',
					purchasedArea: '0',
					researchArea: '0',
					businessArea: '0',
					rentalArea: '0',
					// 多选基本信息
					honorOne: [],
					honorTwo: [],
					honorThree: [],
					honorFive: [],
					honorFour: [],
					honorSix: [],
					honorSeven: [],
					honorEight: [],
				},

				// 三年资产
				form2: [{
					// 2020年
					salesRevenue: '0',
					netProfit: '0',
					netAssets: '0',
					taxAmount: '0',
					researchExpenses: '0',
					equipmentInvestment: '0',
					softwareInvestment: '0',
					promotionExpenses: '0',
					year: 2020,
				}, {
					// 2019年
					salesRevenue: '0',
					netProfit: '0',
					netAssets: '0',
					taxAmount: '0',
					researchExpenses: '0',
					equipmentInvestment: '0',
					softwareInvestment: '0',
					promotionExpenses: '0',
					year: 2019,
				}, {
					// 2018年
					salesRevenue: '0',
					netProfit: '0',
					netAssets: '0',
					taxAmount: '0',
					researchExpenses: '0',
					equipmentInvestment: '0',
					softwareInvestment: '0',
					promotionExpenses: '0',
					year: 2018,
				}],

				// 单位知识产权情况(数量)
				form3: [{
					type: 1,
					inventionPatent: '0',
					utilityModel: '0',
					appearance: '0',
					circuitDiagram: '0',
					softwareCopyright: '0',
				}, {
					type: 2,
					inventionPatent: '0',
					utilityModel: '0',
					appearance: '0',
					circuitDiagram: '0',
					softwareCopyright: '0',
				}],


				// 是否禁用基本信息表
				disIs: false,


				// 主体
				subjectList: [],
				// 处理后的数组
				subjectNameList: [],

				subjectSelectId: '',

				selectIs: false,
				// categoryList: [],

				// 行业
				ztShow: false,
				items: [],
				activeIds: [],
				activeIndex: 0,





				// 校验
				rules: {
					registerTime: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					registerAddress: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					registerCapi: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					subjectId: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					categoryId: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					branchesNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					workersNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					returneesNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					masterNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					collegeNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					researchNumber: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					officeArea: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					purchasedArea: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					researchArea: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					businessArea: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					rentalArea: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},

					salesRevenue: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					netProfit: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					netAssets: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					taxAmount: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					researchExpenses: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					equipmentInvestment: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					softwareInvestment: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					promotionExpenses: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},

					inventionPatent: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					utilityModel: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					appearance: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					circuitDiagram: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					},
					softwareCopyright: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					}
				},

				// 多选框
				honorSelsctOne: [{
					text: '区级(县/镇)级',
					value: 1
				}, {
					text: '市级',
					value: 2
				}, {
					text: '省级',
					value: 3
				}, {
					text: '国家级',
					value: 4
				}, {
					text: '国际级',
					value: 5
				}],

				honorSelsctTwo: [{
					text: '区级(县/镇)级',
					value: 1
				}, {
					text: '市级',
					value: 2
				}, {
					text: '省级',
					value: 3
				}, {
					text: '国家级',
					value: 4
				}],

				honorSelsctThree: [{
					text: '区级(县/镇)级',
					value: 1
				}, {
					text: '市级',
					value: 2
				}, {
					text: '省级',
					value: 3
				}, {
					text: '国家级',
					value: 4
				}],

				honorSelsctFour: [{
					text: '暂时无上市计划',
					value: 1
				}, {
					text: '辅导备案',
					value: 2
				}, {
					text: '完成上市辅导',
					value: 3
				}, {
					text: '上市后备企业',
					value: 4
				}, {
					text: '已上市',
					value: 5
				}, ],

				honorSelsctFive: [{
					text: '正常运营',
					value: 1
				}, {
					text: '升级转型',
					value: 2
				}, {
					text: '筹备上市',
					value: 3
				}, {
					text: '准备搬迁',
					value: 4
				}, {
					text: '准备结业',
					value: 5
				}, {
					text: '开设分支机构',
					value: 6
				}, {
					text: '其他',
					value: 7
				}],

				honorSelsctSix: [{
					text: '银行等金融机构信贷',
					value: 1
				}, {
					text: '金融租赁融资',
					value: 2
				}, {
					text: '民间借贷',
					value: 3
				}, {
					text: '股权出让融资',
					value: 4
				}, {
					text: '放行债券',
					value: 5
				}, {
					text: '无外部融资渠道',
					value: 6
				}, {
					text: '非金融机构及其他企业借贷',
					value: 7
				}, {
					text: '定向增发',
					value: 8
				}, {
					text: '引入风险投资',
					value: 9
				}, {
					text: '商业信用融资(应付账款融资、商业票据融资等)',
					value: 10
				}, {
					text: '发行股票',
					value: 11
				}, {
					text: '其他外部融资渠道',
					value: 12
				}, ],

				honorSelsctSeven: [{
					text: '未纳统',
					value: 0
				}, {
					text: '2020年',
					value: 2020
				}, {
					text: '2019年',
					value: 2019
				}, {
					text: '2018年',
					value: 2018
				}, {
					text: '2017年',
					value: 2017
				}, {
					text: '2016年',
					value: 2016
				}, {
					text: '2015年',
					value: 2015
				}, {
					text: '2014年',
					value: 2014
				}, {
					text: '2013年',
					value: 2013
				}, {
					text: '2012年',
					value: 2012
				}, {
					text: '2011年',
					value: 2011
				}],

				honorSelsctEight: [{
					text: '国家高新技术企业',
					value: 1
				}, {
					text: '上市企业',
					value: 2
				}, {
					text: '挂牌未上市',
					value: 3
				}, {
					text: '市级总部企业',
					value: 4
				}, {
					text: '区级总部企业',
					value: 5
				}, {
					text: '科技型中小微业',
					value: 6
				}, {
					text: '纳入统计局备案规模以上企业',
					value: 7
				}, {
					text: '软件企业',
					value: 8
				}, {
					text: '两化融合贯标',
					value: 9
				}],

			}
		},
		methods: {
			// 回显数据
			async getBusiness() {
				let {
					data: res
				} = await this.$request({
					method: 'GET',
					url: '/match/defaultInfo',
				})

				console.log(res);
				
				if(res.code != 200){
					return;
				}
				
				this.disIs = true;


				// 遍历对象，给对应的对象赋值
				for (let item in res.data) {

					this.form1[item] = res.data[item];

					// 由于有特殊情况（多选框、主体、行业），这里需要拿出来处理
					// 多选框
					if (item.indexOf('honor') != -1 && item != 'honorSeven') {
						// console.log(item, res.data[item].split(','))
						let numString = res.data[item].split(',');
						this.form1[item] = [];
						for (let str of numString) {
							this.form1[item].push(Number(str))
						}
					}

					// 主体
					if (item.indexOf("subjectId") != -1) {
						this.subjectSelectId = res.data[item];

						for (let item2 of this.subjectList) {
							if (this.subjectSelectId == item2.subjectId) {
								this.form1.subjectId = item2.subjectName
							}
						}
					}

					if (item.indexOf("categoryId") != -1) {
						let numString = res.data[item].split(',');
						this.activeIds = [];
						for (let str of numString) {
							this.activeIds.push(Number(str))
						}

						// 处理‘行业’选择数据，将对应的数字转换成文字，填写在输入框中
						let text = [];
						for (let item of this.items) {
							for (let item2 of item.children) {
								for (let i = 0; i < this.activeIds.length; i++) {
									if (this.activeIds[i] == item2.id) {
										text.push(item2.text);
										this.form1.categoryId = text.join(",");
									}
								}
							}
						}
					}

				}


				// 遍历财务情况资质（三年）
				for (let item of res.data.financeList) {
					if (item.year == '2020') {
						for (let item2 in item) {
							this.form2[0][item2] = item[item2];
						}
					}
					if (item.year == '2019') {
						for (let item2 in item) {
							this.form2[1][item2] = item[item2];
						}
					}
					if (item.year == '2018') {
						for (let item2 in item) {
							this.form2[2][item2] = item[item2];
						}
					}
				}
				
				// 遍历知识产权（授权量）
				for (let item of res.data.propertyList) {
					if (item.type == 1) {
						for (let item2 in item) {
							this.form3[0][item2] = item[item2];
						}
					}
					if (item.type == 2) {
						for (let item2 in item) {
							this.form3[1][item2] = item[item2];
						}
					}
				}
			},
			async getsubject() {
				let {
					data: res
				} = await this.$request({
					method: 'GET',
					url: '/subject/list'
				});

				console.log(res);

				for (let item of res.rows) {
					this.subjectNameList.push(item.subjectName);
				}

				this.subjectList = res.rows;

			},
			async getcategory() {
				let {
					data: res
				} = await this.$request({
					method: 'GET',
					url: '/category/list'
				});

				console.log(res);

				for (let item of res.rows) {
					// 拼接第一级
					let itemsObj = {
						text: item.categoryName,
						id: item.categoryId,
						children: []
					}

					for (let item2 of item.children) {
						// 拼接第二级
						itemsObj.children.push({
							text: item2.categoryName,
							id: item2.categoryId,
						})
					}

					// 将第一级也加入到第二级中
					itemsObj.children.push({
						text: item.categoryName,
						id: item.categoryId,
					})

					this.items.push(itemsObj)
				}
			},

			// 主体
			ztInputClick() {
				this.selectIs = true;
			},
			onConfirm(value, index) {
				console.log(value.detail.value)

				let pcItem = this.subjectList.find((item) => {
					return item.subjectName == value.detail.value;
				});

				this.subjectSelectId = pcItem.subjectId;
				this.form1.subjectId = pcItem.subjectName;
				this.selectIs = false;
			},
			onChange(picker, value, index) {
				console.log(value, index)
			},
			onCancel() {
				this.selectIs = false;
			},

			// 行业
			hyInputClick() {
				// 隐藏键盘
				uni.hideKeyboard();
				this.ztShow = !this.ztShow;
			},
			wcZtClick() {
				uni.hideKeyboard();
				this.ztShow = !this.ztShow;


				// 处理‘行业’选择数据，将对应的数字转换成文字，填写在输入框中
				let text = [];
				for (let item of this.items) {
					for (let item2 of item.children) {
						for (let i = 0; i < this.activeIds.length; i++) {
							if (this.activeIds[i] == item2.id) {
								text.push(item2.text);
								this.form1.categoryId = text.join(",");
							}
						}
					}
				}
			},
			onNavClick(val) {
				this.activeIndex = val.detail.index;
			},
			onitemclick(val) {
				let youIs = true;
				let num = 0;

				for (let i = 0; i < this.activeIds.length; i++) {
					if (this.activeIds[i] == val.detail.id) {
						youIs = false;
						num = i;
						break;
					}
				}

				if (youIs) {
					this.activeIds.push(val.detail.id)
				} else {
					this.activeIds.splice(num, 1);
				}
			},
			async zcppClick() {

				// 一起验证
				try {
					await Promise.all([
						this.$refs.form1.validate(),
						this.$refs.form30.validate(),
						this.$refs.form31.validate(),
						this.$refs.form32.validate(),
						this.$refs.form4.validate(),
						this.$refs.form41.validate()
					])
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: '填写有问题'
					})
					return;
				}

				// 处理数据  
				const addmatchform = {
					// informationId: this.inmationid,
					branchesNumber: this.form1.branchesNumber, // 分支
					businessArea: this.form1.businessArea, // 经营面积
					categoryId: this.activeIds.join(','), // 行业
					collegeNumber: this.form1.collegeNumber, // 大专及以上人数
					financeList: this.form2, // tab表格数据
					honorEight: this.form1.honorEight.join(','), // 企业资质多选框
					honorFive: this.form1.honorFive.join(','), // 企业异动
					honorFour: this.form1.honorFour.join(','), // 上市情况
					honorOne: this.form1.honorOne.join(','), // 获奖级别
					honorSeven: this.form1.honorSeven, // 纳统年度
					honorSix: this.form1.honorSix.join(','), // 融资渠道
					honorThree: this.form1.honorThree.join(','), // 承担参与科技奖励项目
					honorTwo: this.form1.honorTwo.join(','), // 承担参与科技计划项目
					keyNo: uni.getStorageSync('userInfo').keyNo,
					masterNumber: this.form1.masterNumber, // 硕士人数
					officeArea: this.form1.officeArea, // 办公面积
					propertyList: this.form3, // 国内外
					purchasedArea: this.form1.purchasedArea, //购置办公
					registerAddress: this.form1.registerAddress, // 注册地址
					registerCapi: this.form1.registerCapi, //注册资金
					registerTime: this.form1.registerTime, // 注册时间
					rentalArea: this.form1.rentalArea, //租聘办公面积大小
					researchArea: this.form1.researchArea, //科研用房大小
					researchNumber: this.form1.researchNumber, //研发技术人数
					returneesNumber: this.form1.returneesNumber, // 留学归国人数
					subjectId: this.subjectSelectId, //主体ID
					userId: uni.getStorageSync('userInfo').uid,
					workersNumber: this.form1.workersNumber,
				}

				console.log(addmatchform);

				let {
					data: res
				} = await this.$request({
					method: 'POST',
					url: '/match/firstStep',
					data: addmatchform
				})

				console.log(res);

				if (res.data.schemeSize === 0 || res.data.templateList.length == 0) {
					uni.showToast({
						icon: 'error',
						title: '暂无匹配项'
					})
					return;
				}

				uni.setStorageSync('templateList', JSON.stringify(res.data.templateList));

				uni.navigateTo({
					url: '../zcpp2/zcpp2',
				})
			}
		}
	}
</script>

<style lang="less">
	.zcpp {
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

	.zcppModelTwo {
		.uni-forms-item__label {
			width: 680rpx !important;
		}
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
	}

	.mainItem {
		text-align: center;
		font-size: 30rpx;
		font-weight: 600;
		margin-top: 20rpx;
	}

	.submitBox {
		width: 400rpx;
		margin: 30rpx auto;
	}


	.uni-forms-item__inner {
		padding-bottom: 0 !important;
		padding-top: 10rpx;
	}

	.is-input-border {
		border: none !important;
	}

	.uni-forms-item {
		border-bottom: 2rpx solid #EDEDED;
	}

	.uni-icons {
		display: none;
	}
</style>
