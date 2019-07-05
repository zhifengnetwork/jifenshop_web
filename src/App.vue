<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //判断是否为微信环境
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
			alert("ssss")
		var code = window.location.href.indexOf('code');
		if(code == null || code === ''){
              var local = window.location.href // 获取页面url
				this.$axios({
						method: "post",
						url: "/login/get_code_url?baseUrl=" + local
					}).then(res => {
						console.log(res.data.data);
						var lianjie = res.data.data;
						window.location.href = local;
					});

		}else{
			alert("ssss")
		}


		//   if (1 == 1) {
		//     console.log("无token,有code");
		//   } else {
		//     console.log("无token,无code");
		//   }
		
			
		


		} else {

		alert('不是微信环境');
       
		
		
		// if (this.code == null || this.code === '') { // 如果没有code，则去请求
		// 	// window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
				

		// } else {
		// 	// 你自己的业务逻辑
		// }
     
     
	}
	//  if(!window.localStorage.getItem('token')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
    //         this.getCode()
    //     } else {
    //         // 别的业务逻辑
    //     }









  },
  methods:{
	  getCode () { // 非静默授权，第一次有弹框
                // this.code = ''
                // var local = window.location.href // 获取页面url
                // // var appid = 'wx65adcf075369****' 
				// this.code = this.getUrlCode().code // 截取code
				// console.log("dsssssssss")
				// console.log(this.code)
				// console.log("dsssssssss")
                // if (this.code == null || this.code === '') { // 如果没有code，则去请求
				// 	// window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
				// 	 this.$axios({
				// 			method: "post",
				// 			url: "/login/get_code_url?baseUrl=" + local
				// 		}).then(res => {
				// 			console.log(res.data.data);
				// 			var lianjie = res.data.data;
				// 			window.location.href = url;
				// 		});

                // } else {
                //     // 你自己的业务逻辑
                // }
            },
	//  getUrlCode() { // 截取url中的code方法
	// 				var url = location.search
	// 				this.winUrl = url
	// 				var theRequest = new Object()
	// 				if (url.indexOf("?") != -1) {
	// 					var str = url.substr(1)
	// 					var strs = str.split("&")
	// 					for(var i = 0; i < strs.length; i ++) {
	// 						theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
	// 					}
	// 				}
	// 				return theRequest
	// 			}

  }}
</script>

<style lang="stylus">
body {
  background-color: #f7f7f7;
  color: #151515;

  .height-88 {
    width: 100%;
    height: 88px;
  }
}
</style>
