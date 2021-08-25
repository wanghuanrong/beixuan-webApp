import Vue from 'vue'
import App from './App'
import { dataGL } from './wxcomponents/js/common.js'

// 全局引用request，并全局注册
import {
	request
} from './util/api.js';
Vue.prototype.$request = request;

// base64
let Base64 = require('./wxcomponents/base64/base64.js').Base64;
Vue.prototype.$base64 = Base64;


// Vue.prototype.$http = 'http://192.168.2.13:8080';
// Vue.prototype.$http = 'http://192.168.2.23:8080';
Vue.prototype.$http = 'http://shenzhengtong.cn/stage-api';


// 时间格式转换 
Vue.prototype.$date = dataGL;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
