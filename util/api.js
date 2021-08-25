export const request = (params) => {
	// const baseUrl = 'http://192.168.2.13:8080';
	// const baseUrl = 'http://192.168.2.23:8080';
	const baseUrl = 'http://shenzhengtong.cn/stage-api';
	
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url:baseUrl + params.url,
			header:{Authorization: uni.getStorageSync('token')},
			success:(res)=>{
					
				if(res.data.code == '401'){
					uni.showToast({
						title:'token失效，请重新登录！'
					})
					
					uni.reLaunch({
						url:'/pages/login/login'
					})
				}else{
					resolve(res);
				}
				
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
}