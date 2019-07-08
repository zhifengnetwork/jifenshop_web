<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  beforeMount() {
    //判断是否为微信环境 --- 两行代码
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
	//  在本地获取token,如果token为空或者为null或者为null的时候,就要请求后台,获取token	
      var huoqutoken = window.localStorage.getItem("token");

              if (huoqutoken == "" || huoqutoken == null || huoqutoken == undefined) {
                  //如果没有token,并且没有code的时候,我们需要请求接口,获取code  data:{https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxda42c05b4523e7f5&redirect_uri=https%3A%2F%2Fji.zhifengwangluo.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect}
                  if ( window.location.href.indexOf("code") == 0 ||window.location.href.indexOf("code") <= 0) 
                      {
                        var local = window.location.href; // 获取当前页面的url
                        this.$axios({
                            method: "get",
                            url: "/login/get_code_url?baseUrl=" + local
                          }).then(res => {
                            console.log(res.data.data);
                            var lianjie = res.data.data;
                            window.location.href = lianjie;
                          });
                      } 
                  else {
                        // 如果有code的话,我们就成功了,接下来要token了
                        // getQueryString用来截取code的值
                        var code = this.getQueryString("code");
                        alert(code)
                        this.$axios({
                          method: "get",
                          url: "/login/login_by_code?code=" + code
                        }).then(res => {
                          // alert(res.data.data.token)
                          //获取token,储存到本地
                          if (res.data.status == 1) {
                            console.log('token:', res.data.data.token)
                            window.localStorage.setItem("token", res.data.data.token);
                            this.$store.state.token = res.data.data.token;
                            this.$store.commit('updateToken', res.data.data.token)
                          }
                        });           
                  }
              }
              else {
                this.$store.commit('updateToken', huoqutoken)
              }

      }
      else {
		  window.localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU1OTYzOTg3MCwiZXhwIjoxNTU5Njc1ODcwLCJ1c2VyX2lkIjo3Nn0.YUQ3hG3TiXzz_5U594tLOyGYUzAwfzgDD8jZFY9n1WA");
      
   
   }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    }
  }
};
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
